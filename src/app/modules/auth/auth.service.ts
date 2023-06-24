import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { User } from '../user/user.model';
import { IAuth } from './auth.interface';
import bcrypt from 'bcrypt';

const loginUser = async (payload: IAuth) => {
  const { id, password } = payload;
  //   const result = await Auth.create(payload);
  //check existence of user

  const isUserExist = await User.findOne(
    { id },
    { id: 1, password: 1, needsPasseordChange: 1 }
  ).lean();
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }
  //math password

  const isPasswordMatched = await bcrypt.compare(
    password,
    isUserExist?.password
  );

  if (!isPasswordMatched) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password do not matched');
  }

  //create access token

  return {};
};

export const AuthService = {
  loginUser,
};
