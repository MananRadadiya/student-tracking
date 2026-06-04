import pool from '../config/db.js';

const mapSubmission = (sub) => ({
  id: sub.id,
  studentId: sub.student_id,
  streamId: sub.stream_id,
  title: sub.title,
  date: sub.date,
  learnedInClass: sub.learned_in_class,
  learnedAtHome: sub.learned_at_home,
  status: sub.status,
  createdAt: sub.created_at,
  studentName: sub.student_name,
  streamName: sub.stream_name,
  streamColor: sub.stream_color,
  streamIcon: sub.stream_icon,
  files: sub.files || [],
});

// @desc    Get submissions (with filters)
// @route   GET /api/submissions
export const getSubmissions = async (req, res, next) => {
  try {
    const { stream, status, date, studentId } = req.query;

    let query = `
      SELECT sub.*, s.name as student_name, st.name as stream_name, st.color as stream_color, st.icon as stream_icon
      FROM submissions sub
      LEFT JOIN students s ON sub.student_id = s.id
      LEFT JOIN streams st ON sub.stream_id = st.id
      WHERE 1=1
    `;
    const params = [];

    if (stream && stream !== 'all') {
      query += ' AND sub.stream_id = ?';
      params.push(stream);
    }
    if (status && status !== 'all') {
      query += ' AND sub.status = ?';
      params.push(status);
    }
    if (date) {
      query += ' AND sub.date = ?';
      params.push(date);
    }
    if (studentId && studentId !== 'all') {
      query += ' AND sub.student_id = ?';
      params.push(studentId);
    }

    // If student role, only show their own
    if (req.user.role === 'student') {
      const [student] = await pool.query('SELECT id FROM students WHERE user_id = ?', [req.user.id]);
      if (student.length > 0) {
        query += ' AND sub.student_id = ?';
        params.push(student[0].id);
      }
    }

    query += ' ORDER BY sub.created_at DESC';

    const [submissions] = await pool.query(query, params);

    // Get files for each submission
    for (let sub of submissions) {
      const [files] = await pool.query(
        'SELECT id, name, size, type, path FROM submission_files WHERE submission_id = ?',
        [sub.id]
      );
      sub.files = files;
    }

    const formattedSubmissions = submissions.map(mapSubmission);
    res.json({ success: true, data: formattedSubmissions });
  } catch (error) {
    next(error);
  }
};

// @desc    Create submission
// @route   POST /api/submissions
export const createSubmission = async (req, res, next) => {
  try {
    const { studentId, streamId, title, learnedInClass, learnedAtHome } = req.body;
    const id = 'sub' + Date.now();
    const date = new Date().toISOString().split('T')[0];

    await pool.query(
      'INSERT INTO submissions (id, student_id, stream_id, title, date, learned_in_class, learned_at_home, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [id, studentId, streamId, title || 'Daily Submission', date, learnedInClass, learnedAtHome, 'submitted']
    );

    // Handle uploaded files
    if (req.files && req.files.length > 0) {
      const fileValues = req.files.map((f) => {
        const ext = f.originalname.split('.').pop().toLowerCase();
        let type = 'default';
        if (['pdf'].includes(ext)) type = 'pdf';
        else if (['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp'].includes(ext)) type = 'image';
        else if (['js', 'jsx', 'ts', 'tsx', 'py', 'html', 'css', 'java', 'cpp', 'c'].includes(ext)) type = 'code';

        return [id, f.originalname, f.size, type, f.filename];
      });

      await pool.query(
        'INSERT INTO submission_files (submission_id, name, size, type, path) VALUES ?',
        [fileValues]
      );
    }

    // Update student's total submissions count
    await pool.query(
      'UPDATE students SET total_submissions = total_submissions + 1 WHERE id = ?',
      [studentId]
    );

    // Fetch the created submission with files
    const [newSub] = await pool.query('SELECT * FROM submissions WHERE id = ?', [id]);
    const [files] = await pool.query('SELECT * FROM submission_files WHERE submission_id = ?', [id]);

    const formattedSub = mapSubmission({ ...newSub[0], files });
    res.status(201).json({
      success: true,
      data: formattedSub,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update submission status
// @route   PUT /api/submissions/:id/status
export const updateSubmissionStatus = async (req, res, next) => {
  try {
    const { status } = req.body;

    const [existing] = await pool.query('SELECT * FROM submissions WHERE id = ?', [req.params.id]);
    if (existing.length === 0) {
      return res.status(404).json({ success: false, message: 'Submission not found' });
    }

    await pool.query('UPDATE submissions SET status = ? WHERE id = ?', [status, req.params.id]);

    const [updated] = await pool.query('SELECT * FROM submissions WHERE id = ?', [req.params.id]);

    res.json({ success: true, data: mapSubmission(updated[0]) });
  } catch (error) {
    next(error);
  }
};
