import { Model } from 'mongoose';

export type IAcademicSemister = {
  title: string;
  year: string;
  code: string;
  startMonth: string;
  endMonth: string;
};

export type UserModel = Model<IAcademicSemister, Record<string, unknown>>;
