import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';

import validateAuth from '../../middleware/validateAuth';
import validateRequest from '../../middleware/validateRequest';
import { ManagementDepartmentController } from './managementDepartment.controller';
import { ManagementDepartmentValidation } from './managementDepartment.validation';

const router = express.Router();

router.post(
  '/create-department',
  validateRequest(
    ManagementDepartmentValidation.createManagementDepartmentZodSchema
  ),
  // validateAuth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  ManagementDepartmentController.createDepartment
);

router.get(
  '/:id',
  validateAuth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.FACULTY,
    ENUM_USER_ROLE.STUDENT
  ),
  ManagementDepartmentController.getSingleDepartment
);

router.patch(
  '/:id',
  validateRequest(
    ManagementDepartmentValidation.updateManagementDepartmentZodSchema
  ),
  validateAuth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  ManagementDepartmentController.updateDepartment
);

router.delete(
  '/:id',
  validateAuth(ENUM_USER_ROLE.SUPER_ADMIN),
  ManagementDepartmentController.deleteDepartment
);

router.get(
  '/',
  validateAuth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.FACULTY,
    ENUM_USER_ROLE.FACULTY,
    ENUM_USER_ROLE.STUDENT
  ),
  ManagementDepartmentController.getAllDepartments
);

export const ManagementDepartmentRoutes = router;
