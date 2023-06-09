import {
  IAcademicSemisterMonth,
  IAcademicSemisterTitles,
  IacademicSemisterCode,
} from './academicSemister.interface';

export const academicSemisterMonths: IAcademicSemisterMonth[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const academicSemisterTitles: IAcademicSemisterTitles[] = [
  'Autumn',
  'Summer',
  'Fall',
];
export const academicSemisterCode: IacademicSemisterCode[] = ['01', '02', '03'];

export const academicSemisterTitleCodeMapper: { [key: string]: string } = {
  Autumn: '01',
  Summer: '02',
  Fall: '03',
};
