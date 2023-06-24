import { z } from 'zod';

//req-validation
//body--> object
//data--> object
const loginZodSchema = z.object({
  body: z.object({
    id: z.string({
      required_error: 'ID is required',
    }),
    password: z.string({
      required_error: 'password is required',
    }),
  }),
});

export const AuthValidation = {
  loginZodSchema,
};
