import config from '../../../config'
import { IUser } from './users.interface'
import { User } from './users.model'

const createdUser = async (user: IUser): Promise<IUser | null> => {
  /*
1.need incremental auto generated id
2.default password
*/

  if (!user.password) {
    user.password = config.default_user_pass as string
  }

  const newUser = await User.create(user)
  if (!newUser) {
    throw new Error('Failed to create user')
  }
  return newUser
}

export default {
  createdUser,
}
