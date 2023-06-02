import dotenv from 'dotenv'
import path from 'path'

// eslint-disable-next-line no-undef
dotenv.config({ path: path.join(process.cwd(), '.env') }) //hera "{ path: path.join(process.cwd(), ".env") }" is used to defined the default path for env file and join it with current working directory
export default {
  // eslint-disable-next-line no-undef
  port: process.env.PORT,
  // eslint-disable-next-line no-undef
  database_url: process.env.DATABASE_URL,
  // eslint-disable-next-line no-undef
  default_user_pass: process.env.DEFAULT_USER_PASS,
}

/* passof university-admin-DB: 1UNBXS2q39eXnUcr*/
