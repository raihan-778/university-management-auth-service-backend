import { Model, Types } from 'mongoose';
import { IStudent } from '../student/student.interface';
import { IFaculty } from '../faculty/faculty.interface';

export type IUser = {
  id: string;
  role: string;
  password: string;
  student?: Types.ObjectId | IStudent;
  faculty?: Types.ObjectId | IFaculty;
  needPasswordChange: false | true;
  // admin?: Types.ObjectId | IAdmin;---build in feature
};

interface IUserMethods {
  isUserExists(id: string): Promise<boolean>;
  isPasswordMatched(
    givenPassword: string,
    currentPassword: string
  ): Promise<boolean>;
}

export type UserModel = Model<IUser, Record<string, unknown>>;
