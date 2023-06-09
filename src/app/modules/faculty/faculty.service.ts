/* eslint-disable @typescript-eslint/no-explicit-any */
import { SortOrder } from 'mongoose';

import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { paginationHelper } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IFaculty, IFacultyFilters } from './faculty.interface';
import { FacultyFilterableFields } from './faculty.constant';
import { Faculty } from './faculty.model';

const getAllFaculty = async (
  filters: IFacultyFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IFaculty[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOptions);

  /* code for searching by field start */

  const { searchTerm, ...filteredData } = filters;

  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      //dynamic search tearm
      $or: FacultyFilterableFields.map(field => ({
        [field]: { $regex: searchTerm, $options: 'i' },
      })),
    });
  }
  // console.log(Object.entries(filteredData));
  //here object.entries will get all properties with values as key value pairs.on the other hand object.keys will get only properties

  if (Object.keys(filteredData).length) {
    andConditions.push({
      $and: Object.entries(filteredData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const sortCondition: { [key: string]: SortOrder } = {}; // here [key:string]:string is a mapped type where we have defined an object property & its value type.here here key is the property.mongoose has a default sort order type so that in sort condition we can difined the value type as sortorder type imported from mongoose insted of type string.

  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder;
  }
  const whereCondition =
    andConditions.length > 0 ? { $and: andConditions } : {}; // this code block is used to create conditions if any searching options is not found then an empty object will be added in query paramas.
  const result = await Faculty.find(whereCondition)
    // .populate('AcademicSemester')
    // .populate('AcademicDepartment')
    // .populate('AcademicFaculty')
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);

  const total = await Faculty.countDocuments(whereCondition);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};
const deleteFaculty = async (id: string): Promise<IFaculty | null> => {
  const result = await Faculty.findByIdAndDelete(id)

    .populate('AcademicDepartment')
    .populate('AcademicFaculty');
  return result;
};
const getSingleFaculty = async (id: string): Promise<IFaculty | null> => {
  const result = await Faculty.findById(id)

    .populate('AcademicDepartment')
    .populate('AcademicFaculty');
  return result;
};

const updateFaculty = async (
  id: string,
  payload: Partial<IFaculty>
): Promise<IFaculty | null> => {
  const isExist = await Faculty.findOne({ id });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Faculty data not found');
  }
  const { name, ...facultyData } = payload; //here using {name, guardian, localGuardian, ...studentData} we have seperated the name ,guardian & localGuardian from payload. and other data will be saved in studentData.

  const updatedFacultyData: Partial<IFaculty> = { ...facultyData };
  /* const name={
    firstName:"Raihan"<---for update this field
    middleName:"Uddin"
    lastName:"Arif"
} 

*/

  //dynamically handeling

  // handle name object
  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}`; // name.firstName

      (updatedFacultyData as any)[nameKey] = name[key as keyof typeof name];
    });
  }

  // here using Object.keys(name) we have converted all name values in a array from which we can apply any array methods such as here we have applyed for forEach method.
  /* const name={firstName:"Raihan"} */

  const result = await Faculty.findOneAndUpdate({ id }, updatedFacultyData, {
    new: true, //here {new:true} is used to see the instant update document in response.If we do not use this our data will be updated but we can not see it instantly without refresh
  }); //here we avoid using updateOne may not use modelschema "save" validation middleware and bypass it .So that we have to use findOneAndUpdate.
  return result;
};

export const FacultyService = {
  getAllFaculty,
  getSingleFaculty,
  updateFaculty,
  deleteFaculty,
};
