import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { FacultyController } from './Faculty.controller';
import { FacultyValidation } from './faculty.validation';

const router = express.Router();

router.get('/:id', FacultyController.getAllFaculty);
router.delete('/:id', FacultyController.deleteFaculty);
router.get('/', FacultyController.getSingleFaculty);

router.patch(
  '/:id',
  validateRequest(FacultyValidation.updateFacultyZodSchema),
  FacultyController.updateFaculty
);
//create faculty

//create admin

export const FacultyRoutes = router;
