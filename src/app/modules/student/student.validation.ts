import { z } from 'zod';
import { bloodGroup, gender } from '../student/student.constant';

//req-validation
//body--> object
//data--> object
const updateStudentZodSchema = z.object({
  body: z.object({
    name: z.object({
      firstName: z
        .string({
          required_error: 'First Name is required',
        })
        .optional(),
      middleName: z.string().optional(),
      lastName: z
        .string({
          required_error: 'Last Name is required',
        })
        .optional(),
    }),
    dateOfBirth: z.string().optional(),
    email: z.string().email().optional(),
    gender: z.enum([...gender] as [string, ...string[]]).optional(),
    bloodGroup: z.enum([...bloodGroup] as [string, ...string[]]).optional(),
    presentAddress: z.string().optional(),
    permanentAddress: z.string().optional(),
    contactNo: z.string().optional(),
    emergencyContactNo: z.string().optional(),
    guardian: z.object({
      fatherName: z.string().optional(),
      fatherOccupation: z.string().optional(),
      fatherContactNo: z.string().optional(),
      motherName: z.string().optional(),
      motherOccupation: z.string().optional(),
      address: z.string().optional(),
    }),
    localGuardian: z.object({
      name: z.string().optional(),
      occupation: z.string().optional(),
      contactNo: z.string().optional(),
      address: z.string().optional(),
    }),
    profileImage: z.string().optional(),
    academicFaculty: z.string().optional(),
    academicSemester: z.string().optional(),
    academicDepartment: z.string().optional(),
  }),
});

export const StudentValidation = {
  updateStudentZodSchema,
};
