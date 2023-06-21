/* eslint-disable no-undef */
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') }); //hera "{ path: path.join(process.cwd(), ".env") }" is used to defined the default path for env file and join it with current working directory
export default {
  port: process.env.PORT,

  database_url: process.env.DATABASE_URL,

  default_user_pass: process.env.DEFAULT_USER_PASS,
  default_student_pass: process.env.DEFAULT_STUDENT_PASS,
  env: process.env.NODE_ENV,
};

/* passof university-admin-DB: 1UNBXS2q39eXnUcr*/
