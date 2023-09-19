import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { UserController } from './user.controller';
import { UserValidation } from './user.validation';

const router = express.Router();

router.post(
  '/create-student',
  validateRequest(UserValidation.createUserZodSchema),
  UserController.createStudent
);

router.post(
  '/create-faculty',
  validateRequest(UserValidation.createFacultyZodSchema),
  UserController.createFaculty
);
router.post(
  '/create-admin',
  validateRequest(UserValidation.createAdminZodSchema),
  // validateAuth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  UserController.createAdmin
);

export const UserRoutes = router;
