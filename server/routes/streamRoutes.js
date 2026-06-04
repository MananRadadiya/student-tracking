import { Router } from 'express';
import { getStreams, createStream, deleteStream } from '../controllers/streamController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = Router();

router.get('/', getStreams);
router.post('/', protect, authorize('admin'), createStream);
router.delete('/:id', protect, authorize('admin'), deleteStream);

export default router;
