/* eslint-disable no-undef */
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') }); //hera "{ path: path.join(process.cwd(), ".env") }" is used to defined the default path for env file and join it with current working directory
export default {
  port: process.env.PORT,

  database_url: process.env.DATABASE_URL,

  default_user_pass: process.env.DEFAULT_USER_PASS,
  default_student_pass: process.env.DEFAULT_STUDENT_PASS,
  default_faculty_pass: process.env.DEFAULT_FACULTY_PASS,
  env: process.env.NODE_ENV,
  bcrypt_salt_round: process.env.BCRYPT_SALT_ROUND,
  jwt: {
    jwt_secret_key: process.env.JWT_SECRET,
    jwt_expires_in: process.env.JWT_EXPIRES_IN,
    jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
    jwt_refresh_expires_in: process.env.JWT_REFRESH_EXPERES_IN,
  },
};

/* passof university-admin-DB: 1UNBXS2q39eXnUcr*/
