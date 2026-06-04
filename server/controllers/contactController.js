import pool from '../config/db.js';

// @desc    Submit contact form
// @route   POST /api/contact
export const submitContact = async (req, res, next) => {
  try {
    const { name, email, phone, course, message } = req.body;

    if (!name || !email) {
      return res.status(400).json({ success: false, message: 'Name and email are required' });
    }

    await pool.query(
      'INSERT INTO contact_messages (name, email, phone, course, message) VALUES (?, ?, ?, ?, ?)',
      [name, email, phone, course, message]
    );

    res.status(201).json({ success: true, message: 'Message sent successfully' });
  } catch (error) {
    next(error);
  }
};

// @desc    Get contact messages (admin)
// @route   GET /api/contact
export const getContactMessages = async (req, res, next) => {
  try {
    const [messages] = await pool.query('SELECT * FROM contact_messages ORDER BY created_at DESC');
    res.json({ success: true, data: messages });
  } catch (error) {
    next(error);
  }
};
