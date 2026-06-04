import { Router } from 'express';
import { getFeedback, addFeedback } from '../controllers/feedbackController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = Router();

router.use(protect);

router.get('/', getFeedback);
router.post('/', authorize('admin', 'faculty'), addFeedback);

export default router;
