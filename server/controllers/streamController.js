import pool from '../config/db.js';

// @desc    Get all streams
// @route   GET /api/streams
export const getStreams = async (req, res, next) => {
  try {
    const [streams] = await pool.query('SELECT * FROM streams ORDER BY name ASC');
    res.json({ success: true, data: streams });
  } catch (error) {
    next(error);
  }
};

// @desc    Create stream
// @route   POST /api/streams
export const createStream = async (req, res, next) => {
  try {
    const { name, color, icon } = req.body;
    const id = 'str' + Date.now();

    await pool.query(
      'INSERT INTO streams (id, name, color, icon) VALUES (?, ?, ?, ?)',
      [id, name, color || '#6366f1', icon || '📚']
    );

    const [newStream] = await pool.query('SELECT * FROM streams WHERE id = ?', [id]);

    res.status(201).json({ success: true, data: newStream[0] });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete stream
// @route   DELETE /api/streams/:id
export const deleteStream = async (req, res, next) => {
  try {
    const [existing] = await pool.query('SELECT * FROM streams WHERE id = ?', [req.params.id]);
    if (existing.length === 0) {
      return res.status(404).json({ success: false, message: 'Stream not found' });
    }

    await pool.query('DELETE FROM streams WHERE id = ?', [req.params.id]);

    res.json({ success: true, message: 'Stream deleted' });
  } catch (error) {
    next(error);
  }
};
