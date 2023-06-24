import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IAuth } from './auth.interface';

const loginUser = async (payload: IAuth) => {
  const { id, passord } = payload;
  //   const result = await Auth.create(payload);
  //check existence of user

  const isUserExist = await User.findOne(
    { id },
    { id: 1, password: 1, needsPasseordChange: 1 }
  );
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  return {};
};

export const AuthService = {
  loginUser,
};
