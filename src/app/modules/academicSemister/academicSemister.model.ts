import httpStatus from 'http-status';
import { Schema, model } from 'mongoose';
import ApiError from '../../../errors/ApiError';
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

//here we will use mongoose pre-hook for checking any reapet semister within a single year.
academicSemisterSchema.pre('save', async function (next) {
  //*** this pre hook must be used before create model.all kind of schema related task should be completed before creating model.Otherwise this pre hook will not work  */
  // here next is a function of mongoose. do not confused to think it a function of express.
  const isExist = await AcademicSemister.findOne({
    title: this.title,
    year: this.year,
  });
  if (isExist) {
    throw new ApiError(
      httpStatus.CONFLICT,
      'Academic Semister is already exists!'
    );
  }
  next();
});

export const AcademicSemister = model<IAcademicSemister, AcademicSemisterModel>(
  'AcademicSemister',
  academicSemisterSchema
);

//here we will use mongoose pre-hook for checking any reapet semister within a single year.
academicSemisterSchema.pre('save', async function (next) {
  //*** this pre hook must be used before create model.all kind of schema related task should be completed before creating model.Otherwise this pre hook will not work  */
  // here next is a function of mongoose. do not confused to think it a function of express.
  const isExist = await AcademicSemister.findOne({
    title: this.title,
    year: this.year,
  });
  if (isExist) {
    throw new ApiError(
      httpStatus.CONFLICT,
      'Academic Semister is already exists!'
    );
  }
  next();
});
