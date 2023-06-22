import { Model, Types } from 'mongoose';

export type IStudentName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};
export type IGuardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
  address: string;
};

export type ILocalGuardian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};

export type IStudent = {
  id: string;
  name: IStudentName;
  gender: string;
  email: string;
  dateOfBirth: string;
  presentAddress: string;
  permanentAddress: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup: string;
  guardian: IGuardian;
  localGuardian: ILocalGuardian;
  profileImage?: string;
  academicFaculty: Types.ObjectId;
  academicDepartment: Types.ObjectId;
  academicSemester: Types.ObjectId;
};

export type IStudentFilters = {
  id?: string;
  searchTerm?: string;
  contactNo?: string;
  bloodGroup?: string;
  email?: string;
  emergencyContactNo?: string;
};

export type StudentModel = Model<IStudent, Record<string, unknown>>;
