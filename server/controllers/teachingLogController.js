import pool from '../config/db.js';

const mapTeachingLog = (log) => ({
  id: log.id,
  facultyId: log.faculty_id,
  streamId: log.stream_id,
  topic: log.topic,
  notes: log.notes,
  date: log.date,
  createdAt: log.created_at,
  facultyName: log.faculty_name,
  streamName: log.stream_name,
  streamColor: log.stream_color,
});

// @desc    Get teaching logs
// @route   GET /api/teaching-logs
export const getTeachingLogs = async (req, res, next) => {
  try {
    const { facultyId, streamId } = req.query;

    let query = `
      SELECT tl.*, u.name as faculty_name, s.name as stream_name, s.color as stream_color
      FROM teaching_logs tl
      LEFT JOIN users u ON tl.faculty_id = u.id
      LEFT JOIN streams s ON tl.stream_id = s.id
      WHERE 1=1
    `;
    const params = [];

    if (facultyId) {
      query += ' AND tl.faculty_id = ?';
      params.push(facultyId);
    }
    if (streamId) {
      query += ' AND tl.stream_id = ?';
      params.push(streamId);
    }

    // If faculty role, only show their own
    if (req.user.role === 'faculty') {
      query += ' AND tl.faculty_id = ?';
      params.push(req.user.id);
    }

    query += ' ORDER BY tl.date DESC';

    const [logs] = await pool.query(query, params);

    const formattedLogs = logs.map(mapTeachingLog);
    res.json({ success: true, data: formattedLogs });
  } catch (error) {
    next(error);
  }
};

// @desc    Create teaching log
// @route   POST /api/teaching-logs
export const createTeachingLog = async (req, res, next) => {
  try {
    const { topic, streamId, notes, date } = req.body;
    const id = 'tl' + Date.now();

    await pool.query(
      'INSERT INTO teaching_logs (id, faculty_id, date, topic, stream_id, notes) VALUES (?, ?, ?, ?, ?, ?)',
      [id, req.user.id, date || new Date().toISOString().split('T')[0], topic, streamId, notes]
    );

    const [newLog] = await pool.query(
      `SELECT tl.*, u.name as faculty_name, s.name as stream_name
       FROM teaching_logs tl
       LEFT JOIN users u ON tl.faculty_id = u.id
       LEFT JOIN streams s ON tl.stream_id = s.id
       WHERE tl.id = ?`,
      [id]
    );

    res.status(201).json({ success: true, data: mapTeachingLog(newLog[0]) });
  } catch (error) {
    next(error);
  }
};
