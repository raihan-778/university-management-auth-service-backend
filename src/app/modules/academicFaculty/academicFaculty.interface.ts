import { Model } from 'mongoose';

export type IAcademicFacultyTitle =
  | 'Faculty Of Science & Engineering.'
  | 'Faculty Of Business Adminstration'
  | 'Faculty Of Arts & Social Science';

export type IAcademicFaculty = {
  title: IAcademicFacultyTitle;
};

export type AcademicFacultyModel = Model<
  IAcademicFaculty,
  Record<string, unknown>
>;
