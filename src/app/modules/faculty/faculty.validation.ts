import { z } from 'zod';
import { bloodGroup, gender } from '../student/student.constant';

//req-validation
//body--> object
//data--> object
const updateFacultyZodSchema = z.object({
  body: z.object({
    name: z.object({
      firstName: z.string().optional(),
      middleName: z.string().optional(),
      lastName: z.string().optional(),
    }),
    dateOfBirth: z.string().optional(),
    email: z.string().email().optional(),
    gender: z.enum([...gender] as [string, ...string[]]).optional(),
    bloodGroup: z.enum([...bloodGroup] as [string, ...string[]]).optional(),
    presentAddress: z.string().optional(),
    permanentAddress: z.string().optional(),
    contactNo: z.string().optional(),
    emergencyContactNo: z.string().optional(),
    designation: z.string().optional(),
    profileImage: z.string().optional(),
    academicFaculty: z.string().optional(),
    academicSemester: z.string().optional(),
    academicDepartment: z.string().optional(),
  }),
});

export const FacultyValidation = {
  updateFacultyZodSchema,
};
