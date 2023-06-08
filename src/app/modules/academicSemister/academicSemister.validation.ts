import { z } from 'zod';
import { academicSemisterCode, academicSemisterMonths, academicSemisterTitles } from './academicSemister.constant';

//req-validation
//body--> object
//data--> object
const createAcademicSemisterZodSchema = z.object({
  body: z.object({
    title: z.enum([...academicSemisterTitles] as [string, ...string[]], {
      required_error: 'title is required',
    }),
    year: z.number({
      required_error: 'year is required',
    }),
    code: z.enum([...academicSemisterCode] as [string, ...string[]], {
      required_error: 'code is required',
    }),
    startMonth: z.enum([...academicSemisterMonths] as [string, ...string[]], {
      // by using this code "[...academicSemisterMonths] as [string,...string[] we indicate that in "academicSemisterMonths enum has must be as single string value and other value will be an array of strings.
      required_error: 'startMonth is required',
    }),
    endMonth: z.enum([...academicSemisterMonths] as [string, ...string[]],
      { required_error: 'endMonth is required' }
    ),
  }),
});
export const AcademicSemisterValidation = {
  createAcademicSemisterZodSchema,
};
