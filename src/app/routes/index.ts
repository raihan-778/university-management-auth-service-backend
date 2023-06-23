import express from 'express';
import { AcademicSemesterRoutes } from '../modules/academicSemester/academicSemester.route';

import { AcademicDepartmentRoutes } from '../modules/academicDepartment/academicDepartment.route';
import { AcademicFacultyRoutes } from '../modules/academicFaculty/academicFaculty.route';
import { StudentRoutes } from '../modules/student/student.route';
import { UserRoutes } from '../modules/user/user.router';
const routes = express.Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/students',
    route: StudentRoutes,
  },
  {
    path: '/faculty',
    route: FacultyRoutes,
  },
  {
    path: '/academic-semester',
    route: AcademicSemesterRoutes,
  },
  {
    path: '/academic-faculty',
    route: AcademicFacultyRoutes,
  },
  {
    path: '/academic-departments',
    route: AcademicDepartmentRoutes,
  },
];
moduleRoutes.forEach(route => routes.use(route.path, route.route)); // by using these "moduleRoute we can create all users route dynamically."

// routes.use('/users/', UserRoutes);
// routes.use('/academic-semester', AcademicsemesterRoutes);

export default routes;
