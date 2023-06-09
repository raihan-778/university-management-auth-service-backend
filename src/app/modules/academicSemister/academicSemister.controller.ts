import { NextFunction, Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { AcademicSemisterService } from './academicSemister.service';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';

const createSemister = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    //we can avoid use next function in controller request handler because this would be the last middleware so we do not need to set next.

    const { ...academicSemisterData } = req.body;
    const result = await AcademicSemisterService.createSemister(
      academicSemisterData
    );
    next();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Semister Created Successfully',
      data: result,
    });
  }
);

export const AcademicSemisterController = { createSemister };
