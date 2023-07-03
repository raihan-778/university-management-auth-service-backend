import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import { User } from '../user/user.model';
import {
  IAuth,
  ILoginUserResponse,
  IRefreshTokenResponse,
} from './auth.interface';

const loginUser = async (payload: IAuth): Promise<ILoginUserResponse> => {
  const { id, password } = payload;
  //   const result = await Auth.create(payload);

  //check existence of user
  const user = new User();
  // const isUserExist = await User.findOne(
  //   { id },
  //   { id: 1, password: 1, needsPasseordChange: 1 }
  // ).lean();
  // if (!isUserExist) {
  //   throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  // }

  /* This isUserExist method is moved to user model as instance method */

  const isUserExist = await user.isUserExists(id);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  //math password
  // const isPasswordMatched = await bcrypt.compare(
  //   password,
  //   isUserExist?.password
  // );

  /* this ispasswordMathced method is moved to user model as instance method */

  if (
    isUserExist.password &&
    !user.isPasswordMatched(password, isUserExist.password)
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password do not matched');
  }

  //create access token & refresh token
  const { id: userId, role, needPasswordChange } = isUserExist;
  const accessToken = jwtHelpers.createToken(
    { userId, role },
    config.jwt.jwt_secret_key as Secret,
    config.jwt.jwt_expires_in as string
  );
  //refresh token

  const refreshToken = jwtHelpers.createToken(
    { userId, role },
    config.jwt.jwt_refresh_secret as Secret,
    config.jwt.jwt_refresh_expires_in as string
  );
  // console.log(accessToken, refreshToken, needPasswordChange);
  return {
    accessToken,
    refreshToken,
    needPasswordChange,
  };
};

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  //verify token
  let verifiedToken = null;
  try {
    verifiedToken = jwtHelpers.verifiedToken(
      token,
      config.jwt.jwt_refresh_secret as Secret
    );
    console.log(verifiedToken);
  } catch (err) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid refresh token');
  }
  const { userId } = verifiedToken;
  //tumi delete hoye gecho kinto tomar refresh token ache!!

  const user = new User();

  const isUserExist = await user.isUserExists(userId);
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'user does not exist');
  }

  //generate new token

  const newAccessToken = jwtHelpers.createToken(
    { id: isUserExist.id, role: isUserExist.role },
    config.jwt.jwt_secret_key as Secret,
    config.jwt.jwt_expires_in as string
  );

  return {
    accessTokan: newAccessToken,
  };
};
export const AuthService = {
  loginUser,
  refreshToken,
};
