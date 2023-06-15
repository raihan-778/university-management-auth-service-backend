import { IAcademicDepartment } from './academicDepartment.interface';
import { AcademicDepartment } from './academicDepartment.model';

const createDepartment = async (payload: IAcademicDepartment) => {
  const result = await AcademicDepartment.create(payload);

  return result;
};

export const AcademicDepartmentService = {
  createDepartment,
};
