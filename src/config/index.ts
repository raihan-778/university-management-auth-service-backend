import path from 'path'
import dotenv from 'dotenv'

dotenv.config({ path: path.join(process.cwd(), '.env') }) //hera "{ path: path.join(process.cwd(), ".env") }" is used to defined the default path for env file and join it with current working directory
export default {
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  default_user_pass: process.env.DEFAULT_USER_PASS,
}

/* passof DB: HS2R8kIHtf73ycRg */
