import httpStatus from 'http-status';
import { Schema, model } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import {
  academicSemesterCode,
  academicSemesterMonths,
  academicSemesterTitles,
} from './academicSemester.constant';
import {
  AcademicSemesterModel,
  IAcademicSemester,
} from './academicSemester.interface';

const academicSemesterSchema = new Schema<
  IAcademicSemester,
  AcademicSemesterModel
>(
  {
    title: {
      type: String,
      required: true,
      enum: academicSemesterTitles,
    },
    year: { type: String, required: true },
    code: { type: String, required: true, enum: academicSemesterCode },
    startMonth: { type: String, required: true, enum: academicSemesterMonths },
    endMonth: { type: String, required: true, enum: academicSemesterMonths },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true, // here we use "toJSON:{virtuals:true}" the reason is mongodb always gives us a unique id as _id.by using virtuals:true we can see this _id as id virtualy but it will not saved in database.we just can see this _id as virtual id.
    },
  }
);

//here we will use mongoose pre-hook for checking any reapet semester within a single year.
academicSemesterSchema.pre('save', async function (next) {
  //*** this pre hook must be used before create model.all kind of schema related task should be completed before creating model.Otherwise this pre hook will not work  */
  // here next is a function of mongoose. do not confused to think it a function of express.
  const isExist = await AcademicSemester.findOne({
    // this code base is used for checking same semester & title
    title: this.title,
    year: this.year,
  });
  if (isExist) {
    throw new ApiError(
      httpStatus.CONFLICT,
      'Academic semester is already exists!'
    );
  }
  next();
});

export const AcademicSemester = model<IAcademicSemester, AcademicSemesterModel>(
  'AcademicSemester',
  academicSemesterSchema
);
