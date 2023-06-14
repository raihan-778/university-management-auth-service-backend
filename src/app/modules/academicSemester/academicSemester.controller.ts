import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constantFields/paginationConstants';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { academicSemesterFilterableFields } from './academicSemester.constant';
import { IAcademicSemester } from './academicSemester.interface';
import { AcademicSemesterService } from './academicSemester.service';

const createAcademicSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    //we can avoid use next function in controller request handler because this would be the last middleware so we do not need to set next.

    const { ...academicSemesterData } = req.body;
    const result = await AcademicSemesterService.createSemester(
      academicSemesterData
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic semester Created Successfully',
      data: result,
    });
    next();
  }
);

const getAllSemesters = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, academicSemesterFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await AcademicSemesterService.getAllSemesters(
    filters,
    paginationOptions
  );
  sendResponse<IAcademicSemester[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic semester Retrived Successfully',
    meta: result.meta,
    data: result.data,
  });
  // next(); here we dot not need to use next() function because after getting response we do not need to call any middleware
});
const getSingleSemester = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await AcademicSemesterService.getSingleSemester(id);

  sendResponse<IAcademicSemester | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single semester Retrived Successfully',
    data: result,
  });
  // next(); here we dot not need to use next() function because after getting response we do not need to call any middleware
});

const updateSemester = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;
  const result = await AcademicSemesterService.updateSemester(id, updatedData);

  sendResponse<IAcademicSemester | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single semester Updated Successfully',
    data: result,
  });
  // next(); here we dot not need to use next() function because after getting response we do not need to call any middleware
});
const deleteSemester = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await AcademicSemesterService.deleteSemester(id);
  sendResponse<IAcademicSemester | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single semester deleted Successfully',
    data: result,
  });
  // next(); here we dot not need to use next() function because after getting response we do not need to call any middleware
});
export const AcademicSemesterController = {
  createAcademicSemester,
  getAllSemesters,
  getSingleSemester,
  updateSemester,
  deleteSemester,
};
