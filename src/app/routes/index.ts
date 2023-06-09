import express from 'express';
import { AcademicSemisterRoutes } from '../modules/academicSemister/academicSemister.route';
import { UserRoutes } from '../modules/user/user.router';
const routes = express.Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/academic-semister',
    route: AcademicSemisterRoutes,
  },
];
moduleRoutes.forEach(route => routes.use(route.path, route.route)); // by using these "moduleRoute we can create all users route dynamically."

// routes.use('/users/', UserRoutes);
// routes.use('/academic-semister', AcademicSemisterRoutes);

export default routes;
