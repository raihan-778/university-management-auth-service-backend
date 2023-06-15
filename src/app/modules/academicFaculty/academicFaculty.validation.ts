import { z } from 'zod';
import { academicFacultyTitles } from './academicFaculty.constant';

const createAcademicFacultyZodSchema = z.object({
  body: z.object({
    title: z.enum([...academicFacultyTitles] as [string, ...string[]], {
      required_error: 'title is required',
    }),
  }),
});
export const AcademicFacultyValidation = {
  createAcademicFacultyZodSchema,
};
