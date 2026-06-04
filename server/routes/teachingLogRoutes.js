import { Router } from 'express';
import { getTeachingLogs, createTeachingLog } from '../controllers/teachingLogController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = Router();

router.use(protect);

router.get('/', getTeachingLogs);
router.post('/', authorize('admin', 'faculty'), createTeachingLog);

export default router;
