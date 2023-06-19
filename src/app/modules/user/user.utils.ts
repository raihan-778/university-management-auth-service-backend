import { IAcademicSemester } from '../academicSemester/academicSemester.interface';
import { User } from './user.model';

export const findLastStudentId = async () => {
  const lastUser = await User.findOne({}, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean();
  return lastUser?.id;
};

export const generateStudentId = async (
  academicSemester: IAcademicSemester
): Promise<string> => {
  const currentUserId =
    (await findLastStudentId()) || (0).toString().padStart(5, '0'); //This "padStart" is used to create 5 digint 00000

  //increment id by 1
  let incrementedId = (parseInt(currentUserId) + 1).toString().padStart(5, '0');
  //2025
  incrementedId = `${academicSemester.year.substring(2)}${
    academicSemester.code
  }${incrementedId}`;
  return incrementedId;
};
const findLastFacultyId = async () => {
  const lastFacultyId = await User.findOne({});
};

export const generateFacultyId = async () => {
  const currentId = await findLastFacultyId();
};
