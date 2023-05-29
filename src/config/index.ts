import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.join(process.cwd(), '.env') }) //hera "{ path: path.join(process.cwd(), ".env") }" is used to defined the default path for env file and join it with current working directory
export default {
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
}
