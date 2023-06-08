import express from 'express';
import { AcademicSemisterRoutes } from '../modules/academicSemister/academicSemister.route';
import { UserRoutes } from '../modules/user/user.router';
const router = express.Router();

router.use('/users/', UserRoutes);
router.use('/academic-semister', AcademicSemisterRoutes);

export default router;
