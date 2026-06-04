import { Router } from 'express';
import { getSubmissions, createSubmission, updateSubmissionStatus } from '../controllers/submissionController.js';
import { protect, authorize } from '../middleware/auth.js';
import upload from '../middleware/upload.js';

const router = Router();

router.use(protect);

router.get('/', getSubmissions);
router.post('/', upload.array('files', 10), createSubmission);
router.put('/:id/status', authorize('admin', 'faculty'), updateSubmissionStatus);

export default router;
