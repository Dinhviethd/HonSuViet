import { Router } from 'express';
import authRoute from './apis/auth.route';
import lessonRoute from './apis/lesson.route';
import gamificationRoute from './apis/gamification.route';

const router = Router();

router.use('/auth', authRoute);
router.use('/lesson', lessonRoute);
router.use('/gamification', gamificationRoute);
export default router;
