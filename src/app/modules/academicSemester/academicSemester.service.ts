import httpStatus from 'http-status';
import { SortOrder } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { paginationHelper } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import {
  academicSemesterSearchableFields,
  academicSemesterTitleCodeMapper,
} from './academicSemester.constant';
import {
  IAcademicSemester,
  IAcademicSemesterFilters,
} from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';

const createSemester = async (payload: IAcademicSemester) => {
  if (academicSemesterTitleCodeMapper[payload.title] !== payload.code) {
    // here payload.title will get the title name like "Summer",Autumn etc, which will make an index for academicSemesterTitleCodeMapper.
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Semester Code!!');
  }

  const result = await AcademicSemester.create(payload);

  return result;
};

const getAllSemesters = async (
  filters: IAcademicSemesterFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IAcademicSemester[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOptions);

  /* code for searching by field start */

  const { searchTerm, ...filteredData } = filters;

  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      //dynamic search tearm
      $or: academicSemesterSearchableFields.map(field => ({
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

  /* code for searching by field end */

  // const andConditions = [//static searchTerm
  //   {
  //     $or: [
  //       {
  //         title: {
  //           $regex: searchTerm,
  //           $options: 'i',
  //         },
  //       },
  //       {
  //         code: {
  //           $regex: searchTerm,
  //           $options: 'i',
  //         },
  //       },
  //       {
  //         year: { $regex: searchTerm, $options: 'i' },
  //       },
  //     ],
  //   },
  // ];

  // const sortCondition: { [key: string]: string } = {};

  const sortCondition: { [key: string]: SortOrder } = {}; // here [key:string]:string is a mapped type where we have defined an object property & its value type.here here key is the property.mongoose has a default sort order type so that in sort condition we can difined the value type as sortorder type imported from mongoose insted of type string.

  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder;
  }
  const whereCondition =
    andConditions.length > 0 ? { $and: andConditions } : {}; // this code block is used to create conditions if any searching options is not found then an empty object will be added in query paramas.
  const result = await AcademicSemester.find(whereCondition)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);

  const total = await AcademicSemester.countDocuments(whereCondition);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleSemester = async (
  id: string
): Promise<IAcademicSemester | null> => {
  const result = await AcademicSemester.findById(id);
  return result;
};

const updateSemester = async (
  id: string,
  payload: Partial<IAcademicSemester>
): Promise<IAcademicSemester | null> => {
  if (
    payload.title &&
    payload.code &&
    academicSemesterTitleCodeMapper[payload.title] !== payload.code
  ) {
    // here payload.title will get the title name like "Summer",Autumn etc, which will make an index for academicSemesterTitleCodeMapper.
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Semester Code!!');
  }
  const result = await AcademicSemester.findOneAndUpdate({ _id: id }, payload, {
    new: true, //here {new:true} is used to see the instant update document in response.If we do not use this our data will be updated but we can not see it instantly without refresh
  }); //here we avoid using updateOne may not use modelschema "save" validation middleware and bypass it .So that we have to use findOneAndUpdate.
  return result;
};
const deleteSemester = async (
  id: string
): Promise<IAcademicSemester | null> => {
  const result = await AcademicSemester.findByIdAndDelete(id);
  return result;
};

export const AcademicSemesterService = {
  createSemester,
  getAllSemesters,
  getSingleSemester,
  updateSemester,
  deleteSemester,
};
