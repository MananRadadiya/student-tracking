import { Router } from 'express';
import { getFaculty, createFaculty, updateFaculty, deleteFaculty } from '../controllers/facultyController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = Router();

router.use(protect);

router.get('/', getFaculty);
router.post('/', authorize('admin'), createFaculty);
router.put('/:id', authorize('admin'), updateFaculty);
router.delete('/:id', authorize('admin'), deleteFaculty);

export default router;
