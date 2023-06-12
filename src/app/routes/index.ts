import express from 'express';
import { AcademicSemesterRoutes } from '../modules/academicSemester/academicSemester.route';
import { UserRoutes } from '../modules/user/user.router';
const routes = express.Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/academic-semester',
    route: AcademicSemesterRoutes,
  },
];
moduleRoutes.forEach(route => routes.use(route.path, route.route)); // by using these "moduleRoute we can create all users route dynamically."

// routes.use('/users/', UserRoutes);
// routes.use('/academic-semester', AcademicsemesterRoutes);

export default routes;
