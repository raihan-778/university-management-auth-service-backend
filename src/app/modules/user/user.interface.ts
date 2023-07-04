/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';
import { IFaculty } from '../faculty/faculty.interface';
import { IStudent } from '../student/student.interface';

export type IUser = {
  id: string;
  role: string;
  password: string;
  student?: Types.ObjectId | IStudent;
  faculty?: Types.ObjectId | IFaculty;
  needPasswordChange: false | true;
  passwordChangedAt?: Date;
  // admin?: Types.ObjectId | IAdmin;---build in feature
};

export type IUserMethods = {
  isUserExists(id: string): Promise<Partial<IUser> | null>;
  isPasswordMatched(
    givenPassword: string,
    currentPassword: string
  ): Promise<boolean>;
};

export type UserModel = Model<IUser, Record<string, unknown>, IUserMethods>;
