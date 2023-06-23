import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constantFields/paginationConstants';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { FacultyFilterableFields } from './faculty.constant';
import { FacultyService } from './faculty.service';
import { IFaculty } from './faculty.interface';

const getAllFaculty = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, FacultyFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await FacultyService.getAllFaculty(filters, paginationOptions);
  sendResponse<IFaculty[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty data Retrived Successfully',
    meta: result.meta,
    data: result.data,
  });
  // next(); here we dot not need to use next() function because after getting response we do not need to call any middleware
});
const getSingleFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await FacultyService.getSingleFaculty(id);

  sendResponse<IFaculty | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single Faculty Retrived Successfully',
    data: result,
  });
  // next(); here we dot not need to use next() function because after getting response we do not need to call any middleware
});

const updateFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;
  const result = await FacultyService.updateFaculty(id, updatedData);

  sendResponse<IFaculty | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single Faculty Updated Successfully',
    data: result,
  });
  // next(); here we dot not need to use next() function because after getting response we do not need to call any middleware
});
const deleteFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await FacultyService.deleteFaculty(id);
  sendResponse<IFaculty | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single Faculty deleted Successfully',
    data: result,
  });
  // next(); here we dot not need to use next() function because after getting response we do not need to call any middleware
});
export const FacultyController = {
  getAllFaculty,
  getSingleFaculty,
  updateFaculty,
  deleteFaculty,
};
