import { z } from 'zod';
import {
  academicSemesterCode,
  academicSemesterMonths,
  academicSemesterTitles,
} from './academicSemester.constant';

//req-validation
//body--> object
//data--> object
const createAcademicSemesterZodSchema = z.object({
  body: z.object({
    title: z.enum([...academicSemesterTitles] as [string, ...string[]], {
      required_error: 'title is required',
    }),
    year: z.number({
      required_error: 'year is required',
    }),
    code: z.enum([...academicSemesterCode] as [string, ...string[]], {
      required_error: 'code is required',
    }),
    startMonth: z.enum([...academicSemesterMonths] as [string, ...string[]], {
      // by using this code "[...academicSemesterMonths] as [string,...string[] we indicate that in "academicSemesterMonths enum has must be as single string value and other value will be an array of strings.
      required_error: 'startMonth is required',
    }),
    endMonth: z.enum([...academicSemesterMonths] as [string, ...string[]], {
      required_error: 'endMonth is required',
    }),
  }),
});
export const AcademicSemesterValidation = {
  createAcademicSemesterZodSchema,
};
