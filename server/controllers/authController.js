import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '../config/db.js';

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '7d',
  });
};

// @desc    Register user
// @route   POST /api/auth/register
export const register = async (req, res, next) => {
  try {
    const { name, email, password, role, streamId, department } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ success: false, message: 'Please provide name, email, password and role' });
    }

    if (role !== 'student' && role !== 'faculty') {
      return res.status(400).json({ success: false, message: 'Invalid role' });
    }

    // Check if user exists
    const [existing] = await pool.query('SELECT id FROM users WHERE email = ?', [email]);
    if (existing.length > 0) {
      return res.status(400).json({ success: false, message: 'Email already registered' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Start transaction
    const connection = await pool.getConnection();
    await connection.beginTransaction();

    try {
      // Insert user
      const userId = 'u' + Date.now();
      await connection.query(
        'INSERT INTO users (id, email, password, role, name) VALUES (?, ?, ?, ?, ?)',
        [userId, email, hashedPassword, role, name]
      );

      let studentId = null;

      if (role === 'student') {
        studentId = 's' + Date.now();
        await connection.query(
          'INSERT INTO students (id, user_id, name, email, stream_id, enrollment_date) VALUES (?, ?, ?, ?, ?, ?)',
          [studentId, userId, name, email, streamId || null, new Date().toISOString().split('T')[0]]
        );
      } else if (role === 'faculty') {
        const facultyId = 'f' + Date.now();
        await connection.query(
          'INSERT INTO faculty (id, user_id, name, email, department, status, join_date) VALUES (?, ?, ?, ?, ?, ?, ?)',
          [facultyId, userId, name, email, department || 'Web Development', 'active', new Date().toISOString().split('T')[0]]
        );
      }

      await connection.commit();

      const token = generateToken(userId);

      res.status(201).json({
        success: true,
        data: {
          token,
          user: {
            id: userId,
            email,
            role,
            name,
            avatar: null,
            studentId,
          },
        },
      });
    } catch (err) {
      await connection.rollback();
      throw err;
    } finally {
      connection.release();
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Login user
// @route   POST /api/auth/login
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password' });
    }

    // Find user
    const [users] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);

    if (users.length === 0) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    const user = users[0];

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    // Get additional info based on role
    let studentId = null;
    if (user.role === 'student') {
      const [students] = await pool.query('SELECT id FROM students WHERE user_id = ?', [user.id]);
      if (students.length > 0) studentId = students[0].id;
    }

    const token = generateToken(user.id);

    res.json({
      success: true,
      data: {
        token,
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
          name: user.name,
          avatar: user.avatar,
          studentId,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get current user
// @route   GET /api/auth/me
export const getMe = async (req, res, next) => {
  try {
    const user = req.user;

    let studentId = null;
    if (user.role === 'student') {
      const [students] = await pool.query('SELECT id FROM students WHERE user_id = ?', [user.id]);
      if (students.length > 0) studentId = students[0].id;
    }

    res.json({
      success: true,
      data: {
        id: user.id,
        email: user.email,
        role: user.role,
        name: user.name,
        avatar: user.avatar,
        studentId,
      },
    });
  } catch (error) {
    next(error);
  }
};
