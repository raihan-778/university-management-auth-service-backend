import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';

import validateAuth from '../../middleware/validateAuth';
import validateRequest from '../../middleware/validateRequest';
import { AdminController } from './admin.controller';
import { AdminValidation } from './admin.validation';
const router = express.Router();

router.get(
  '/:id',
  validateAuth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  AdminController.getSingleAdmin
);
router.get(
  '/',
  validateAuth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  AdminController.getAllAdmins
);

router.patch(
  '/:id',
  validateRequest(AdminValidation.updateAdmin),
  validateAuth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  AdminController.updateAdmin
);

router.delete(
  '/:id',
  validateAuth(ENUM_USER_ROLE.SUPER_ADMIN),
  AdminController.deleteAdmin
);

export const AdminRoutes = router;
