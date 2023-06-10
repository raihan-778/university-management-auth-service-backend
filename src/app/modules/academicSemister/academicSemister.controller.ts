import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { AcademicSemisterService } from './academicSemister.service';
import { NextFunction, Request, Response } from 'express';
import { IAcademicSemister } from './academicSemister.interface';

const createAcademicSemister = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    //we can avoid use next function in controller request handler because this would be the last middleware so we do not need to set next.

    const { ...academicSemisterData } = req.body;
    const result = await AcademicSemisterService.createSemister(
      academicSemisterData
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Semister Created Successfully',
      data: result,
    });
    next();
  }
);

const getAllSemisters = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // const paginationOptions = {
    //   page: Number(req.query.page),
    //   limit: Number(req.query.limit),
    //   sortBy: req.query.sortBy,
    //   sortOrder: req.query.sortOrder,
    // };
    // console.log(paginationOptions);
    // const result = await AcademicSemisterService.getAllSemisters(
    //   paginationOptions
    // );
    sendResponse<IAcademicSemister>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Semister Retrived Successfully',
      // data: result,
    });
    next();
  }
);

export const AcademicSemisterController = {
  createAcademicSemister,
  getAllSemisters,
};
