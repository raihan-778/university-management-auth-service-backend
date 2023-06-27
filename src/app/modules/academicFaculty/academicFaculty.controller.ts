import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constantFields/paginationConstants';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { academicFacultyFilterableFields } from './academicFaculty.constant';
import { IAcademicFaculty } from './academicFaculty.interface';

import { AcademicFacultyService } from './academicFaculty.service';

const createFaculty = catchAsync(async (req: Request, res: Response) => {
  //we can avoid use next function in controller request handler because this would be the last middleware so we do not need to set next.

  const { ...academicFacultyData } = req.body;
  const result = await AcademicFacultyService.createFaculty(
    academicFacultyData
  );
  sendResponse<IAcademicFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Faculty Created Successfully',
    data: result,
  });
  // next();
});

const getAllFaculties = catchAsync(async (req: Request, res: Response) => {
  console.log(req.headers.authorization);
  console.log(req.user);
  const filters = pick(req.query, academicFacultyFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await AcademicFacultyService.getAllFaculties(
    filters,
    paginationOptions
  );
  sendResponse<IAcademicFaculty[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Faculties Retrived Successfully',
    meta: result.meta,
    data: result.data,
  });
  // next(); here we dot not need to use next() function because after getting response we do not need to call any middleware
});
const getSingleFaculty = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await AcademicFacultyService.getSingleFaculty(id);

  sendResponse<IAcademicFaculty | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single Facutly Retrived Successfully',
    data: result,
  });
  // next(); here we dot not need to use next() function because after getting response we do not need to call any middleware
});

const updateFaculty = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedData = req.body;
  const result = await AcademicFacultyService.updateFaculty(id, updatedData);

  sendResponse<IAcademicFaculty | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single Faculty Updated Successfully',
    data: result,
  });
});
const deleteFaculty = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await AcademicFacultyService.deleteFaculty(id);

  sendResponse<IAcademicFaculty | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single Faculty deleted Successfully',
    data: result,
  });
});
export const AcademicFacultyController = {
  createFaculty,
  getAllFaculties,
  updateFaculty,
  deleteFaculty,
  getSingleFaculty,
};
