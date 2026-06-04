import pool from '../config/db.js';

// @desc    Get all students
// @route   GET /api/students
export const getStudents = async (req, res, next) => {
  try {
    const [students] = await pool.query(`
      SELECT s.*, st.name as stream_name, st.color as stream_color, st.icon as stream_icon
      FROM students s
      LEFT JOIN streams st ON s.stream_id = st.id
      ORDER BY s.name ASC
    `);

    res.json({ success: true, data: students });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single student
// @route   GET /api/students/:id
export const getStudent = async (req, res, next) => {
  try {
    const [students] = await pool.query(`
      SELECT s.*, st.name as stream_name, st.color as stream_color
      FROM students s
      LEFT JOIN streams st ON s.stream_id = st.id
      WHERE s.id = ?
    `, [req.params.id]);

    if (students.length === 0) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }

    res.json({ success: true, data: students[0] });
  } catch (error) {
    next(error);
  }
};

// @desc    Create student
// @route   POST /api/students
export const createStudent = async (req, res, next) => {
  try {
    const { name, email, streamId, enrollmentDate } = req.body;
    const id = 's' + Date.now();

    await pool.query(
      'INSERT INTO students (id, name, email, stream_id, enrollment_date, streak, total_submissions) VALUES (?, ?, ?, ?, ?, 0, 0)',
      [id, name, email, streamId, enrollmentDate || new Date()]
    );

    const [newStudent] = await pool.query('SELECT * FROM students WHERE id = ?', [id]);

    res.status(201).json({ success: true, data: newStudent[0] });
  } catch (error) {
    next(error);
  }
};

// @desc    Update student
// @route   PUT /api/students/:id
export const updateStudent = async (req, res, next) => {
  try {
    const { name, email, streamId, enrollmentDate, streak, totalSubmissions } = req.body;

    const [existing] = await pool.query('SELECT * FROM students WHERE id = ?', [req.params.id]);
    if (existing.length === 0) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }

    await pool.query(
      'UPDATE students SET name = ?, email = ?, stream_id = ?, enrollment_date = ?, streak = ?, total_submissions = ? WHERE id = ?',
      [
        name || existing[0].name,
        email || existing[0].email,
        streamId || existing[0].stream_id,
        enrollmentDate || existing[0].enrollment_date,
        streak ?? existing[0].streak,
        totalSubmissions ?? existing[0].total_submissions,
        req.params.id,
      ]
    );

    const [updated] = await pool.query('SELECT * FROM students WHERE id = ?', [req.params.id]);

    res.json({ success: true, data: updated[0] });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete student
// @route   DELETE /api/students/:id
export const deleteStudent = async (req, res, next) => {
  try {
    const [existing] = await pool.query('SELECT * FROM students WHERE id = ?', [req.params.id]);
    if (existing.length === 0) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }

    await pool.query('DELETE FROM students WHERE id = ?', [req.params.id]);

    res.json({ success: true, message: 'Student deleted' });
  } catch (error) {
    next(error);
  }
};
