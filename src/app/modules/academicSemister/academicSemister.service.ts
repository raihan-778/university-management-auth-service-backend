import { IAcademicSemister } from './academicSemister.interface';
import { AcademicSemister } from './academicSemister.model';

const createSemister = async (payload: IAcademicSemister) => {
  const result = await AcademicSemister.create(payload);
  return result;
};

export const AcademicSemisterService = {
  createSemister,
};
