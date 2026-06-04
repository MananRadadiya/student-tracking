import { Router } from 'express';
import { submitContact, getContactMessages } from '../controllers/contactController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = Router();

router.post('/', submitContact); // Public — no auth needed
router.get('/', protect, authorize('admin'), getContactMessages);

export default router;
