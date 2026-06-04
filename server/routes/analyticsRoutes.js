import { Router } from 'express';
import { getWeeklySubmissions, getStreamDistribution, getMonthlyTrend, getActivityTimeline, getDashboardSummary } from '../controllers/analyticsController.js';
import { protect } from '../middleware/auth.js';

const router = Router();

router.use(protect);

router.get('/weekly-submissions', getWeeklySubmissions);
router.get('/stream-distribution', getStreamDistribution);
router.get('/monthly-trend', getMonthlyTrend);
router.get('/activity-timeline', getActivityTimeline);
router.get('/summary', getDashboardSummary);

export default router;
