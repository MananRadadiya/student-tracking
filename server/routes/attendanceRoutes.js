import { Router } from 'express';
import { getAttendance, getTodayRequests, markAttendance, approveAttendance, rejectAttendance } from '../controllers/attendanceController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = Router();

router.use(protect);

router.get('/', getAttendance);
router.get('/today-requests', authorize('admin', 'faculty'), getTodayRequests);
router.post('/mark', markAttendance);
router.put('/:id/approve', authorize('admin', 'faculty'), approveAttendance);
router.put('/:id/reject', authorize('admin', 'faculty'), rejectAttendance);

export default router;
