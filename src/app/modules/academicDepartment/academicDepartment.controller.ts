import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constantFields/paginationConstants';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { academicDepartmentFilterableFields } from './academicDepartment.constant';
import { IAcademicDepartment } from './academicDepartment.interface';
import { AcademicDepartmentService } from './academicDepartment.service';

export const createDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const { ...academicDepartmentData } = req.body;
    const result = await AcademicDepartmentService.createDepartment(
      academicDepartmentData
    );
    sendResponse<IAcademicDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Department Created Successfully',
      data: result,
    });
    // next();
  }
);
export const getAllDepartments = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, academicDepartmentFilterableFields);
    const paginationOptions = pick(req.query, paginationFields);

    const result = await AcademicDepartmentService.getAllDepartments(
      filters,
      paginationOptions
    );
    sendResponse<IAcademicDepartment[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic department Retrived Successfully',
      meta: result.meta,
      data: result.data,
    });
    // next();
  }
);
const getSingleDepartment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await AcademicDepartmentService.getSingleDepartment(id);

  sendResponse<IAcademicDepartment | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single Facutly Retrived Successfully',
    data: result,
  });
});
const updateDepartment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedData = req.body;

  const result = await AcademicDepartmentService.updateDepartment(
    id,
    updatedData
  );

  sendResponse<IAcademicDepartment | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single Facutly Retrived Successfully',
    data: result,
  });
});
const deleteDepartment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await AcademicDepartmentService.deleteDepartment(id);
  sendResponse<IAcademicDepartment | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single Facutly Retrived Successfully',
    data: result,
  });
});

export const AcademicDepartmentController = {
  createDepartment,
  getAllDepartments,
  getSingleDepartment,
  updateDepartment,
  deleteDepartment,
};
