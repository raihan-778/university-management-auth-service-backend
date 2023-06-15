import { z } from 'zod';
import { academicFacultyTitles } from './academicFaculty.constant';

const createAcademicFacultyZodSchema = z.object({
  body: z.object({
    title: z.enum([...academicFacultyTitles] as [string, ...string[]], {
      required_error: 'Title is required',
    }),
  }),
});

const updateAcademicFacultyZodSchema = z
  .object({
    body: z.object({
      title: z
        .enum([...academicFacultyTitles] as [string, ...string[]], {
          required_error: 'Title is required',
        })
        .optional(), //here optional functon used to mention that we may update this field or not.that means this field update is not required
    }),
  })
export const AcademicFacultyValidation = {
  createAcademicFacultyZodSchema,
  updateAcademicFacultyZodSchema
};
