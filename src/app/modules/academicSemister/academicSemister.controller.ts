import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constantFields/paginationConstants';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { IAcademicSemister } from './academicSemister.interface';
import { AcademicSemisterService } from './academicSemister.service';

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
    const paginationOptions = pick(req.query, paginationFields);

    const result = await AcademicSemisterService.getAllSemisters(
      paginationOptions
    );
    sendResponse<IAcademicSemister[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Semister Retrived Successfully',
      meta: result.meta,
      data: result.data,
    });
    next();
  }
);

export const AcademicSemisterController = {
  createAcademicSemister,
  getAllSemisters,
};
