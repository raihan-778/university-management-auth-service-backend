import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../config';
import ApiError from '../../errors/ApiError';
import { jwtHelpers } from '../../helpers/jwtHelpers';

const validateAuth =
  (
    ...requiredRole: string[] // here in "...requiredRole" "..." is used as a rest operator. If it is used in any array it is called spread opertor.
  ) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      //get authorization token

      const token = req.headers.authorization;
      if (!token) {
        throw new ApiError(
          httpStatus.UNAUTHORIZED,
          'You are not authorized to'
        );
      }

      //verify token
      let verifiedUser = null;

      verifiedUser = jwtHelpers.verifiedToken(
        // from this verified token we will get some user info like role, userId, etc.
        token,
        config.jwt.jwt_secret_key as Secret
      );
      req.user = verifiedUser; //role ,userId

      //guard by using role

      if (requiredRole.length && !requiredRole.includes(verifiedUser.role)) {
        throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden access');
      }
      next(); //dont forget to use next function, because if you don't use next function you can not get the access for next middleware.
    } catch (error) {
      next(error);
    }
  };
export default validateAuth;
