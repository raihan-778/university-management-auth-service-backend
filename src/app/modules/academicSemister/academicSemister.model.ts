import { Schema, model } from 'mongoose';
import {
  academicSemisterCode,
  academicSemisterMonths,
  academicSemisterTitles,
} from './academicSemister.constant';
import {
  AcademicSemisterModel,
  IAcademicSemister,
} from './academicSemister.interface';

const academicSemisterSchema = new Schema<
  IAcademicSemister,
  AcademicSemisterModel
>(
  {
    title: {
      type: String,
      required: true,
      enum: academicSemisterTitles,
    },
    year: { type: Number, required: true },
    code: { type: String, required: true, enum: academicSemisterCode },
    startMonth: { type: String, required: true, enum: academicSemisterMonths },
    endMonth: { type: String, required: true, enum: academicSemisterMonths },
  },
  {
    timestamps: true,
  }
);

export const AcademicSemister = model<IAcademicSemister, AcademicSemisterModel>(
  'AcademicSemister',
  academicSemisterSchema
);
