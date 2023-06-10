import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from './../../../interfaces/pagination';
import { academicSemisterTitleCodeMapper } from './academicSemister.constant';
import { IAcademicSemister } from './academicSemister.interface';
import { AcademicSemister } from './academicSemister.model';

const createSemister = async (payload: IAcademicSemister) => {
  if (academicSemisterTitleCodeMapper[payload.title] !== payload.code) {
    // here payload.title will get the title name like "Summer",Autumn etc, which will make an index for academicSemisterTitleCodeMapper.
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Semister Code!!');
  }

  const result = await AcademicSemister.create(payload);

  return result;
};

const getAllSemisters = async (
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IAcademicSemister[]>> => {
  const { page = 1, limit = 10 } = paginationOptions;
  const skip = (page - 1) * limit;
  const result = await AcademicSemister.find().sort().skip(skip).limit(limit);

  const total = await AcademicSemister.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

export const AcademicSemisterService = {
  createSemister,
  getAllSemisters,
};
