import { Model, Types } from 'mongoose';

export type IFacultyName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

export type IFaculty = {
  id: string;
  name: IFacultyName; //embaded object
  gender: string;
  email: string;
  dateOfBirth: string;
  presentAddress: string;
  permanentAddress: string;
  contactNo: string;
  designation: string;
  emergencyContactNo: string;
  bloodGroup: string;
  profileImage?: string;
  academicFaculty: Types.ObjectId; //reference field
  academicDepartment: Types.ObjectId; //reference field
};

export type IFacultyFilters = {
  id?: string;
  searchTerm?: string;
  contactNo?: string;
  bloodGroup?: string;
  email?: string;
  emergencyContactNo?: string;
};

export type FacultyModel = Model<IFaculty, Record<string, unknown>>;
