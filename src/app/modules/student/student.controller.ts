import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constantFields/paginationConstants';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { StudentFilterableFields } from './student.constant';
import { IStudent } from './student.interface';
import { StudentService } from './student.service';

const getAllStudents = catchAsync(async (req: Request, res: Response) => {
  console.log('student-token', req.headers.authorization);
  const filters = pick(req.query, StudentFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await StudentService.getAllStudents(
    filters,
    paginationOptions
  );
  sendResponse<IStudent[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Students data Retrived Successfully',
    meta: result.meta,
    data: result.data,
  });
  // next(); here we dot not need to use next() function because after getting response we do not need to call any middleware
});
const getSingleStudent = catchAsync(async (req: Request, res: Response) => {
  console.log('student-token', req.headers.authorization);
  const id = req.params.id;
  const result = await StudentService.getSingleStudent(id);

  sendResponse<IStudent | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single Student Retrived Successfully',
    data: result,
  });
  // next(); here we dot not need to use next() function because after getting response we do not need to call any middleware
});

const updateStudent = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;
  const result = await StudentService.updateStudent(id, updatedData);

  sendResponse<IStudent | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single Student Updated Successfully',
    data: result,
  });
  // next(); here we dot not need to use next() function because after getting response we do not need to call any middleware
});
const deleteStudent = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await StudentService.deleteStudent(id);
  sendResponse<IStudent | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single Student deleted Successfully',
    data: result,
  });
  // next(); here we dot not need to use next() function because after getting response we do not need to call any middleware
});
export const StudentController = {
  getAllStudents,
  getSingleStudent,
  updateStudent,
  deleteStudent,
};
