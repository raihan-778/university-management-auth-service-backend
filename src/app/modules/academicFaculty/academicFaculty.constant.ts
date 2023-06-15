import { IAcademicFacultyTitle } from './academicFaculty.interface';

export const academicFacultyTitles: IAcademicFacultyTitle[] = [
  'Faculty Of Science & Engineering',
  'Faculty Of Business Administration',
  'Faculty Of Arts & Social Science',
];

export const academicFacultySearchableFields = ['title'];
export const academicFacultyFilterableFields = ['searchTerm', 'title'];
