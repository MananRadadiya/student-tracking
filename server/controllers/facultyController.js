import pool from '../config/db.js';

// @desc    Get all faculty
// @route   GET /api/faculty
export const getFaculty = async (req, res, next) => {
  try {
    const [faculty] = await pool.query('SELECT * FROM faculty ORDER BY name ASC');

    // Get assigned streams for each faculty
    for (let f of faculty) {
      const [streams] = await pool.query(
        `SELECT s.id, s.name, s.color, s.icon FROM faculty_streams fs
         JOIN streams s ON fs.stream_id = s.id
         WHERE fs.faculty_id = ?`,
        [f.id]
      );
      f.assignedStreams = streams.map((s) => s.id);
      f.assignedStreamDetails = streams;
    }

    res.json({ success: true, data: faculty });
  } catch (error) {
    next(error);
  }
};

// @desc    Create faculty
// @route   POST /api/faculty
export const createFaculty = async (req, res, next) => {
  try {
    const { name, email, department, specialization, phone, joinDate, assignedStreams, status } = req.body;
    const id = 'f' + Date.now();

    await pool.query(
      'INSERT INTO faculty (id, name, email, department, specialization, phone, join_date, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [id, name, email, department, specialization, phone, joinDate || new Date(), status || 'active']
    );

    // Assign streams
    if (assignedStreams && assignedStreams.length > 0) {
      const values = assignedStreams.map((streamId) => [id, streamId]);
      await pool.query('INSERT INTO faculty_streams (faculty_id, stream_id) VALUES ?', [values]);
    }

    const [newFaculty] = await pool.query('SELECT * FROM faculty WHERE id = ?', [id]);

    res.status(201).json({ success: true, data: { ...newFaculty[0], assignedStreams: assignedStreams || [] } });
  } catch (error) {
    next(error);
  }
};

// @desc    Update faculty
// @route   PUT /api/faculty/:id
export const updateFaculty = async (req, res, next) => {
  try {
    const { name, email, department, specialization, phone, joinDate, assignedStreams, status } = req.body;

    const [existing] = await pool.query('SELECT * FROM faculty WHERE id = ?', [req.params.id]);
    if (existing.length === 0) {
      return res.status(404).json({ success: false, message: 'Faculty not found' });
    }

    await pool.query(
      'UPDATE faculty SET name = ?, email = ?, department = ?, specialization = ?, phone = ?, join_date = ?, status = ? WHERE id = ?',
      [
        name || existing[0].name,
        email || existing[0].email,
        department || existing[0].department,
        specialization || existing[0].specialization,
        phone || existing[0].phone,
        joinDate || existing[0].join_date,
        status || existing[0].status,
        req.params.id,
      ]
    );

    // Update assigned streams
    if (assignedStreams) {
      await pool.query('DELETE FROM faculty_streams WHERE faculty_id = ?', [req.params.id]);
      if (assignedStreams.length > 0) {
        const values = assignedStreams.map((streamId) => [req.params.id, streamId]);
        await pool.query('INSERT INTO faculty_streams (faculty_id, stream_id) VALUES ?', [values]);
      }
    }

    const [updated] = await pool.query('SELECT * FROM faculty WHERE id = ?', [req.params.id]);

    res.json({ success: true, data: { ...updated[0], assignedStreams: assignedStreams || [] } });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete faculty
// @route   DELETE /api/faculty/:id
export const deleteFaculty = async (req, res, next) => {
  try {
    const [existing] = await pool.query('SELECT * FROM faculty WHERE id = ?', [req.params.id]);
    if (existing.length === 0) {
      return res.status(404).json({ success: false, message: 'Faculty not found' });
    }

    await pool.query('DELETE FROM faculty WHERE id = ?', [req.params.id]);

    res.json({ success: true, message: 'Faculty deleted' });
  } catch (error) {
    next(error);
  }
};
