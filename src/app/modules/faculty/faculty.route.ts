import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { FacultyValidation } from './faculty.validation';

const router = express.Router();

router.get('/:id', FacultyController.getAllFaculty);
router.delete('/:id', FacultyController.deleteAllFaculty);
router.get('/', FacultyController.getSingleFaculty);

router.patch(
  '/:id',
  validateRequest(FacultyValidation.updateFacultyZodSchema),
  FacultyController.updateFaculty
);
//create faculty

//create admin

export const StudentRoutes = router;
