import { Request, Response } from 'express';

import httpStatus from 'http-status';
import config from '../../../config';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { ILoginUserResponse, IRefreshTokenResponse } from './auth.interface';
import { AuthService } from './auth.service';

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body;
  console.log(req.headers.authorization);
  const result = await AuthService.loginUser(loginData);

  const { refreshToken, ...others } = result; // by the line we have seperated the refreshToken form result and avoid to expose it in frontend.except refreshToken all properties will send to frontend buy using others parameter.

  //set refresh token

  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };
  res.cookie('refreshToken', refreshToken, cookieOptions);

  // delete result.refreshToken;// This is not the best prectise to to remove refresh token to avoid expose it to front end.

  //   if ('refreshToken' in result) {
  //     delete result.refreshToken;
  //   }
  sendResponse<ILoginUserResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'user Logedin successfully!',
    data: others,
  });
});

const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;
  const result = await AuthService.refreshToken(refreshToken);
  // by the line we have seperated the refreshToken form result and avoid to expose it in frontend.except refreshToken all properties will send to frontend buy using others parameter.

  //set refresh token

  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };
  res.cookie('refreshToken', refreshToken, cookieOptions);

  // delete result.refreshToken;// This is not the best prectise to to remove refresh token to avoid expose it to front end.

  //   if ('refreshToken' in result) {
  //     delete result.refreshToken;
  //   }
  sendResponse<IRefreshTokenResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'user Logedin successfully!',
    data: result,
  });
});

const changePassword = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const user = req.user;
    console.log('auth-controller', req.user);
    const { ...passwordData } = req.body;

    await AuthService.changePassword(user, passwordData);

    //   }
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Password Changes successfully!',
    });
  }
);

export const AuthController = {
  loginUser,
  refreshToken,
  changePassword,
};

// first login with default password-->change password-->need passwordChange-->true|false->true-->false
