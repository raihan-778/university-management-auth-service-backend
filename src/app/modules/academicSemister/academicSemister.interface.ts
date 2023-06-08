import { Model } from 'mongoose';

export type IAcademicSemisterMonth =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December';
export type IAcademicSemisterTitles = 'Autumn' | 'Summer' | 'Fall';

export type IacademicSemisterCode = '01' | '02' | '03';

export type IAcademicSemister = {
  title: IAcademicSemisterTitles;
  year: number;
  code: IacademicSemisterCode;
  startMonth: IAcademicSemisterMonth;
  endMonth: IAcademicSemisterMonth;
};

export type AcademicSemisterModel = Model<
  IAcademicSemister,
  Record<string, unknown>
>;
