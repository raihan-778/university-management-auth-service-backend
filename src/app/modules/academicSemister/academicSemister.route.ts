import express from 'express';
// import validateRequest from '../../middleware/validateRequest';
// import { AcademicSemisterValidation } from './academicSemister.validation';
import { AcademicSemisterController } from './academicSemister.controller';

const router = express.Router();

// router.post(
//   '/create-semister',
//   validateRequest(AcademicSemisterValidation.createAcademicSemisterZodSchema),
//   AcademicSemisterController.createAcademicSemister
// );
router.get('/get-allSemisters', AcademicSemisterController.getAllSemisters);

export const AcademicSemisterRoutes = router;
