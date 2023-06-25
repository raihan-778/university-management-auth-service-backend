import { Request, Response } from 'express';

import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { ILoginUserResponse } from './auth.interface';
import { AuthService } from './auth.service';

const loginUser = catchAsync(async (req: Request, res: Response) => {
  console.log(req.body);
  const { ...loginData } = req.body;
  const result = await AuthService.loginUser(loginData);

  sendResponse<ILoginUserResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'user Login successfully!',
    data: result,
  });
});

export const AuthController = {
  loginUser,
};

// first login with default password-->change password-->need passwordChange-->true|false->true-->false
