import { Model } from 'mongoose';
import { Types } from 'mongoose';

export type IStudent = {
  id: string;
  name: {
    firstName: string;
    middleName?: string;
    lastName: string;
  };
  gender: string;
  dateOfBirth: string;
  presentAddress: string;
  permanentAddress: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup: string;
  guardian: {
    fatherName: string;
    fatherOccupation: string;
    fatherContactNo: string;
    motherName: string;
    motherOccupation: string;
    motherContactNo: string;
    address: string;
  };
  localGuardian: {
    name: string;
    occupation: string;
    contactNo: string;
    address: string;
  };
  profileImage?: string;
  academicFaculty: Types.ObjectId;
  academicDepartment: Types.ObjectId;
  academicSemester: Types.ObjectId;
};

export type StudentModel = Model<IStudent, Record<string, unknown>>;
