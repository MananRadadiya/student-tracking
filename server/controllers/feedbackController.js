import pool from '../config/db.js';

const mapFeedback = (f) => ({
  id: f.id,
  submissionId: f.submission_id,
  facultyId: f.faculty_id,
  comment: f.comment,
  rating: f.rating,
  createdAt: f.created_at,
  facultyName: f.faculty_name,
});

// @desc    Get feedback (optionally by submission)
// @route   GET /api/feedback
export const getFeedback = async (req, res, next) => {
  try {
    const { submissionId } = req.query;

    let query = `
      SELECT f.*, u.name as faculty_name
      FROM feedback f
      LEFT JOIN users u ON f.faculty_id = u.id
    `;
    const params = [];

    if (submissionId) {
      query += ' WHERE f.submission_id = ?';
      params.push(submissionId);
    }

    query += ' ORDER BY f.created_at DESC';

    const [feedback] = await pool.query(query, params);

    const formattedFeedback = feedback.map(mapFeedback);
    res.json({ success: true, data: formattedFeedback });
  } catch (error) {
    next(error);
  }
};

// @desc    Add feedback
// @route   POST /api/feedback
export const addFeedback = async (req, res, next) => {
  try {
    const { submissionId, comment, rating } = req.body;
    const id = 'fb' + Date.now();

    await pool.query(
      'INSERT INTO feedback (id, submission_id, faculty_id, comment, rating) VALUES (?, ?, ?, ?, ?)',
      [id, submissionId, req.user.id, comment, rating || 0]
    );

    const [newFeedback] = await pool.query(
      `SELECT f.*, u.name as faculty_name FROM feedback f
       LEFT JOIN users u ON f.faculty_id = u.id
       WHERE f.id = ?`,
      [id]
    );

    res.status(201).json({ success: true, data: mapFeedback(newFeedback[0]) });
  } catch (error) {
    next(error);
  }
};
