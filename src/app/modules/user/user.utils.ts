import { IAcademicSemester } from '../academicSemester/academicSemester.interface';

import { User } from './user.model';
//function for generate student id
export const findLastStudentId = async () => {
  const lastStudent = await User.findOne({ role: 'student' }, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean();
  return lastStudent?.id ? lastStudent.id.substring(4) : undefined;
};

export const generateStudentId = async (
  academicSemester: IAcademicSemester
) => {
  const currentStudentId =
    (await findLastStudentId()) || (0).toString().padStart(5, '0');

  //increment id by 1
  let newIncrementId = (parseInt(currentStudentId) + 1)
    .toString()
    .padStart(5, '0');

  newIncrementId = `${academicSemester.year.substring(2)}${
    academicSemester.code
  }${newIncrementId}`;

  return newIncrementId;
};

//function for generat faculty id
const findLastFacultyId = async () => {
  const lastFaculty = await User.findOne(
    { role: 'Faculty' },
    { id: 1, _id: -1 }
  )
    .sort({ createdAt: -1 })
    .lean();
  return lastFaculty?.id ? lastFaculty.id.substring(2) : undefined;
};

export const generateFacultyId = async () => {
  const currentFacultyId =
    (await findLastFacultyId()) || (0).toString().padStart(5, '0');

  let incrementedFacultyId = (parseInt(currentFacultyId) + 1)
    .toString()
    .padStart(5, '0');

  incrementedFacultyId = `F-${incrementedFacultyId}`;
  return incrementedFacultyId;
  // console.log(incrementedFacultyId);
};
//function for generate faculty id
