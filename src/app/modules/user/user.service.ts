import config from '../../../config';
import { IUser } from './user.interface';
import { User } from './user.model';
import { generateUserId } from './user.utils';

const createUser = async (user: IUser): Promise<IUser | null> => {
  // 1.need incremental auto generated id

  const newGeneratedId = await generateUserId();
  user.id = newGeneratedId;
  // 2.default password
  if (!user.password) {
    user.password = config.default_user_pass as string;
  }

  const newUser = await User.create(user);
  if (!newUser) {
    throw new Error('Failed to create user');
  }
  return newUser;
};

export const UserService = {
  createUser,
};
