import { z } from 'zod';
import { bloodGroup, gender } from '../faculty/faculty.constant';

//req-validation
//body--> object
//data--> object

//zod schema for student
const createUserZodSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    student: z.object({
      name: z.object({
        firstName: z.string({
          required_error: 'First Name is required',
        }),
        middleName: z
          .string({
            required_error: 'First Name is required',
          })
          .optional(),
        lastName: z.string({
          required_error: 'First Name is required',
        }),
      }),
      dateOfBirth: z.string({
        required_error: 'Date of Birth is required',
      }),
      email: z
        .string({
          required_error: 'Email is required',
        })
        .email(),

      gender: z.enum([...gender] as [string, ...string[]], {
        required_error: 'gender is required',
      }),
      bloodGroup: z.enum([...bloodGroup] as [string, ...string[]], {
        required_error: 'Blood Group is required',
      }),
      presentAddress: z.string({
        required_error: 'presentAddress is required',
      }),
      permanentAddress: z.string({
        required_error: 'Parmanent Address is Required',
      }),
      contactNo: z.string({ required_error: 'Contact No is Required' }),
      emergencyContactNo: z.string({
        required_error: 'Emergency Contact No is Required',
      }),
      guardian: z.object({
        fatherName: z.string({
          required_error: 'fatherName is required',
        }),
        fatherOccupation: z.string({
          required_error: 'fatherOccupation is required',
        }),
        fatherContactNo: z.string({
          required_error: 'fatherContactNo is required',
        }),
        motherName: z.string({
          required_error: 'motherName is required',
        }),
        motherOccupation: z.string({
          required_error: 'motherOccupation is required',
        }),
        address: z.string({
          required_error: 'address is required',
        }),
      }),
      localGuardian: z.object({
        name: z.string({
          required_error: 'name is required',
        }),
        occupation: z.string({
          required_error: 'occupation is required',
        }),
        contactNo: z.string({
          required_error: 'contactNo is required',
        }),
        address: z.string({
          required_error: 'address is required',
        }),
      }),
      profileImage: z
        .string({
          required_error: 'profileImage is required',
        })
        .optional(),
      academicFaculty: z.string({
        required_error: 'academicFaculty is required',
      }),
      academicSemester: z.string({
        required_error: 'academicSemester is required',
      }),
      academicDepartment: z.string({
        required_error: 'academicDepartment is required',
      }),
    }),
  }),
});

//zod schema for faculty
const createFacultyZodSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    faculty: z.object({
      name: z.object({
        firstName: z.string({
          required_error: 'First Name is required',
        }),
        middleName: z.string().optional(),
        lastName: z.string({
          required_error: 'Last Name is required',
        }),
      }),
      dateOfBirth: z.string({
        required_error: 'Date of Birth is required',
      }),
      email: z
        .string({
          required_error: 'Email is required',
        })
        .email(),
      gender: z.enum([...gender] as [string, ...string[]], {
        required_error: 'gender is required',
      }),
      bloodGroup: z.enum([...bloodGroup] as [string, ...string[]], {
        required_error: 'Blood Group is required',
      }),
      presentAddress: z.string({
        required_error: 'presentAddress is required',
      }),
      permanentAddress: z.string({
        required_error: 'Parmanent Address is Required',
      }),
      contactNo: z.string({ required_error: 'Contact No is Required' }),
      emergencyContactNo: z.string({
        required_error: 'Emergency Contact No is Required',
      }),
      designation: z.string({
        required_error: 'Designation is required',
      }),
      profileImage: z
        .string({
          required_error: 'profileImage is required',
        })
        .optional(),
      academicFaculty: z.string({
        required_error: 'academicFaculty is required',
      }),
      academicDepartment: z.string({
        required_error: 'academicDepartment is required',
      }),
    }),
  }),
});
const createAdminZodSchema = z.object({
  body: z.object({
    password: z.string().optional(),

    admin: z.object({
      name: z.object({
        firstName: z.string({
          required_error: 'First name is required',
        }),
        lastName: z.string({
          required_error: 'Last name is required',
        }),
        middleName: z.string().optional(),
      }),

      dateOfBirth: z.string({
        required_error: 'Date of birth is required',
      }),

      gender: z.string({
        required_error: 'Gender is required',
      }),

      bloodGroup: z.string({
        required_error: 'Blood group is required',
      }),

      email: z
        .string({
          required_error: 'Email is required',
        })
        .email(),

      contactNo: z.string({
        required_error: 'Contact number is required',
      }),

      emergencyContactNo: z.string({
        required_error: 'Emergency contact number is required',
      }),

      presentAddress: z.string({
        required_error: 'Present address is required',
      }),

      permanentAddress: z.string({
        required_error: 'Permanent address is required',
      }),

      managementDepartment: z.string({
        required_error: 'Management department is required',
      }),

      designation: z.string({
        required_error: 'Designation is required',
      }),
      profileImage: z.string().optional(),
    }),
  }),
});
export const UserValidation = {
  createUserZodSchema,
  createFacultyZodSchema,
  createAdminZodSchema,
};
