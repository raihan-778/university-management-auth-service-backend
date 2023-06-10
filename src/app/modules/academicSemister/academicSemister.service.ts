import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { academicSemisterTitleCodeMapper } from './academicSemister.constant';
import { IAcademicSemister } from './academicSemister.interface';
import { AcademicSemister } from './academicSemister.model';
// import { IPaginationOptions } from '../../../interfaces/pagination';

const createSemister = async (payload: IAcademicSemister) => {
  if (academicSemisterTitleCodeMapper[payload.title] !== payload.code) {
    // here payload.title will get the title name like "Summer",Autumn etc, which will make an index for academicSemisterTitleCodeMapper.
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Semister Code!!');
  }

  const result = await AcademicSemister.create(payload);

  return result;
};

// const getAllSemisters = (paginationOptions): IPaginationOptions => {};

export const AcademicSemisterService = {
  createSemister,
  //   getAllSemisters,
};
