import pool from '../config/db.js';

// @desc    Get weekly submission stats
// @route   GET /api/analytics/weekly-submissions
export const getWeeklySubmissions = async (req, res, next) => {
  try {
    const [rows] = await pool.query(`
      SELECT
        DAYNAME(date) as day,
        COUNT(*) as submissions,
        SUM(CASE WHEN status = 'approved' THEN 1 ELSE 0 END) as approved
      FROM submissions
      WHERE date >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)
      GROUP BY DAYNAME(date), DAYOFWEEK(date)
      ORDER BY DAYOFWEEK(date)
    `);

    // Fill missing days
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const dayMap = {};
    rows.forEach((r) => {
      const shortDay = r.day.substring(0, 3);
      dayMap[shortDay] = { day: shortDay, submissions: Number(r.submissions), approved: Number(r.approved) };
    });

    const data = days.map((d) => dayMap[d] || { day: d, submissions: 0, approved: 0 });

    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

// @desc    Get stream distribution
// @route   GET /api/analytics/stream-distribution
export const getStreamDistribution = async (req, res, next) => {
  try {
    const [rows] = await pool.query(`
      SELECT st.name, COUNT(s.id) as value, st.color
      FROM streams st
      LEFT JOIN students s ON s.stream_id = st.id
      GROUP BY st.id, st.name, st.color
      ORDER BY value DESC
    `);

    res.json({ success: true, data: rows.map((r) => ({ ...r, value: Number(r.value) })) });
  } catch (error) {
    next(error);
  }
};

// @desc    Get monthly trend
// @route   GET /api/analytics/monthly-trend
export const getMonthlyTrend = async (req, res, next) => {
  try {
    const [rows] = await pool.query(`
      SELECT
        DATE_FORMAT(date, '%b') as month,
        COUNT(*) as total
      FROM submissions
      WHERE date >= DATE_SUB(CURDATE(), INTERVAL 6 MONTH)
      GROUP BY YEAR(date), MONTH(date), DATE_FORMAT(date, '%b')
      ORDER BY YEAR(date), MONTH(date)
    `);

    res.json({ success: true, data: rows.map((r) => ({ ...r, total: Number(r.total) })) });
  } catch (error) {
    next(error);
  }
};

// @desc    Get activity timeline
// @route   GET /api/analytics/activity-timeline
export const getActivityTimeline = async (req, res, next) => {
  try {
    // Get recent submissions
    const [submissions] = await pool.query(`
      SELECT sub.id, sub.created_at, s.name as student_name, sub.status
      FROM submissions sub
      LEFT JOIN students s ON sub.student_id = s.id
      ORDER BY sub.created_at DESC
      LIMIT 10
    `);

    // Get recent feedback
    const [feedbackItems] = await pool.query(`
      SELECT f.id, f.created_at, u.name as faculty_name, sub.title as submission_title
      FROM feedback f
      LEFT JOIN users u ON f.faculty_id = u.id
      LEFT JOIN submissions sub ON f.submission_id = sub.id
      ORDER BY f.created_at DESC
      LIMIT 5
    `);

    // Build timeline
    const timeline = [];

    submissions.forEach((sub) => {
      const timeAgo = getTimeAgo(sub.created_at);
      if (sub.status === 'approved') {
        timeline.push({ id: `a-${sub.id}`, type: 'approval', message: `${sub.student_name}'s submission was approved`, time: timeAgo, icon: '✅' });
      } else {
        timeline.push({ id: `s-${sub.id}`, type: 'submission', message: `${sub.student_name} submitted daily work`, time: timeAgo, icon: '📝' });
      }
    });

    feedbackItems.forEach((fb) => {
      timeline.push({
        id: `f-${fb.id}`,
        type: 'feedback',
        message: `${fb.faculty_name} gave feedback on ${fb.submission_title}`,
        time: getTimeAgo(fb.created_at),
        icon: '💬',
      });
    });

    // Sort by recency
    timeline.sort((a, b) => {
      const aVal = parseTimeAgo(a.time);
      const bVal = parseTimeAgo(b.time);
      return aVal - bVal;
    });

    res.json({ success: true, data: timeline.slice(0, 10) });
  } catch (error) {
    next(error);
  }
};

// @desc    Get dashboard summary stats
// @route   GET /api/analytics/summary
export const getDashboardSummary = async (req, res, next) => {
  try {
    const [[{ totalStudents }]] = await pool.query('SELECT COUNT(*) as totalStudents FROM students');
    const [[{ totalFaculty }]] = await pool.query('SELECT COUNT(*) as totalFaculty FROM faculty');
    const [[{ totalSubmissions }]] = await pool.query('SELECT COUNT(*) as totalSubmissions FROM submissions');
    const [[{ totalStreams }]] = await pool.query('SELECT COUNT(*) as totalStreams FROM streams');

    const today = new Date().toISOString().split('T')[0];
    const [[{ todaySubmissions }]] = await pool.query('SELECT COUNT(*) as todaySubmissions FROM submissions WHERE date = ?', [today]);
    const [[{ pendingApprovals }]] = await pool.query("SELECT COUNT(*) as pendingApprovals FROM submissions WHERE status = 'submitted'");

    res.json({
      success: true,
      data: {
        totalStudents: Number(totalStudents),
        totalFaculty: Number(totalFaculty),
        totalSubmissions: Number(totalSubmissions),
        totalStreams: Number(totalStreams),
        todaySubmissions: Number(todaySubmissions),
        pendingApprovals: Number(pendingApprovals),
      },
    });
  } catch (error) {
    next(error);
  }
};

// ── Helpers ──
function getTimeAgo(dateStr) {
  const now = new Date();
  const date = new Date(dateStr);
  const diffMs = now - date;
  const diffMin = Math.floor(diffMs / 60000);
  const diffHr = Math.floor(diffMs / 3600000);
  const diffDay = Math.floor(diffMs / 86400000);

  if (diffMin < 1) return 'just now';
  if (diffMin < 60) return `${diffMin} min ago`;
  if (diffHr < 24) return `${diffHr} hr${diffHr > 1 ? 's' : ''} ago`;
  return `${diffDay} day${diffDay > 1 ? 's' : ''} ago`;
}

function parseTimeAgo(str) {
  if (str === 'just now') return 0;
  const match = str.match(/(\d+)\s*(min|hr|day)/);
  if (!match) return 999;
  const val = parseInt(match[1]);
  if (match[2] === 'min') return val;
  if (match[2] === 'hr') return val * 60;
  return val * 1440;
}
