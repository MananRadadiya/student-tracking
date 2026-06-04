import pool from '../config/db.js';

const mapAttendance = (a) => ({
  id: a.id,
  studentId: a.student_id,
  streamId: a.stream_id,
  date: a.date,
  status: a.status,
  markedAt: a.marked_at,
  approvedBy: a.approved_by,
  createdAt: a.created_at,
  studentName: a.student_name,
  streamName: a.stream_name,
});

// @desc    Get attendance records
// @route   GET /api/attendance
export const getAttendance = async (req, res, next) => {
  try {
    const { date, studentId } = req.query;

    let query = `
      SELECT a.*, s.name as student_name
      FROM attendance a
      LEFT JOIN students s ON a.student_id = s.id
      WHERE 1=1
    `;
    const params = [];

    if (date) {
      query += ' AND a.date = ?';
      params.push(date);
    }
    if (studentId) {
      query += ' AND a.student_id = ?';
      params.push(studentId);
    }

    // If student role, only show their own
    if (req.user.role === 'student') {
      const [student] = await pool.query('SELECT id FROM students WHERE user_id = ?', [req.user.id]);
      if (student.length > 0) {
        query += ' AND a.student_id = ?';
        params.push(student[0].id);
      }
    }

    query += ' ORDER BY a.date DESC, s.name ASC';

    const [records] = await pool.query(query, params);

    const formattedRecords = records.map(mapAttendance);
    res.json({ success: true, data: formattedRecords });
  } catch (error) {
    next(error);
  }
};

// @desc    Get today's attendance requests (pending)
// @route   GET /api/attendance/today-requests
export const getTodayRequests = async (req, res, next) => {
  try {
    const today = new Date().toISOString().split('T')[0];

    const [requests] = await pool.query(
      `SELECT a.*, s.name as student_name, st.name as stream_name
       FROM attendance a
       LEFT JOIN students s ON a.student_id = s.id
       LEFT JOIN streams st ON s.stream_id = st.id
       WHERE a.date = ?
       ORDER BY a.created_at DESC`,
      [today]
    );

    const formattedRequests = requests.map(mapAttendance);
    res.json({ success: true, data: formattedRequests });
  } catch (error) {
    next(error);
  }
};

// @desc    Mark attendance (student)
// @route   POST /api/attendance/mark
export const markAttendance = async (req, res, next) => {
  try {
    const { studentId } = req.body;
    const date = new Date().toISOString().split('T')[0];
    const markedAt = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

    // Check if already marked
    const [existing] = await pool.query(
      'SELECT * FROM attendance WHERE student_id = ? AND date = ?',
      [studentId, date]
    );

    if (existing.length > 0) {
      return res.status(400).json({ success: false, message: 'Attendance already marked for today' });
    }

    const id = `att-req-${Date.now()}`;

    await pool.query(
      'INSERT INTO attendance (id, student_id, date, status, marked_at) VALUES (?, ?, ?, ?, ?)',
      [id, studentId, date, 'pending', markedAt]
    );

    const [newRecord] = await pool.query(
      `SELECT a.*, s.name as student_name
       FROM attendance a
       LEFT JOIN students s ON a.student_id = s.id
       WHERE a.id = ?`,
      [id]
    );

    res.status(201).json({ success: true, data: mapAttendance(newRecord[0]) });
  } catch (error) {
    next(error);
  }
};

// @desc    Approve attendance (faculty)
// @route   PUT /api/attendance/:id/approve
export const approveAttendance = async (req, res, next) => {
  try {
    const [existing] = await pool.query('SELECT * FROM attendance WHERE id = ?', [req.params.id]);
    if (existing.length === 0) {
      return res.status(404).json({ success: false, message: 'Attendance record not found' });
    }

    await pool.query(
      'UPDATE attendance SET status = ?, approved_by = ? WHERE id = ?',
      ['present', req.user.id, req.params.id]
    );

    const [updated] = await pool.query('SELECT * FROM attendance WHERE id = ?', [req.params.id]);

    res.json({ success: true, data: mapAttendance(updated[0]) });
  } catch (error) {
    next(error);
  }
};

// @desc    Reject attendance (faculty)
// @route   PUT /api/attendance/:id/reject
export const rejectAttendance = async (req, res, next) => {
  try {
    const [existing] = await pool.query('SELECT * FROM attendance WHERE id = ?', [req.params.id]);
    if (existing.length === 0) {
      return res.status(404).json({ success: false, message: 'Attendance record not found' });
    }

    await pool.query('UPDATE attendance SET status = ? WHERE id = ?', ['rejected', req.params.id]);

    const [updated] = await pool.query('SELECT * FROM attendance WHERE id = ?', [req.params.id]);

    res.json({ success: true, data: mapAttendance(updated[0]) });
  } catch (error) {
    next(error);
  }
};
