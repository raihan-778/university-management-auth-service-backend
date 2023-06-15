import httpStatus from 'http-status';
import { Schema, model } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { academicFacultyTitles } from './academicFaculty.constant';
import {
  AcademicFacultyModel,
  IAcademicFaculty,
} from './academicFaculty.interface';

const academicFacultySchema = new Schema<
  IAcademicFaculty,
  AcademicFacultyModel
>(
  {
    title: {
      type: String,
      required: true,
      enum: academicFacultyTitles,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true, // here we use "toJSON:{virtuals:true}" the reason is mongodb always gives us a unique id as _id.by using virtuals:true we can see this _id as id virtualy but it will not saved in database.we just can see this _id as virtual id.
    },
  }
);

//here we will use mongoose pre-hook for checking any reapet semester within a single year.
academicFacultySchema.pre('save', async function (next) {
  //*** this pre hook must be used before create model.all kind of schema related task should be completed before creating model.Otherwise this pre hook will not work  */
  // here next is a function of mongoose. do not confused to think it a function of express.
  const isExist = await AcademicFaculty.findOne({
    // this code base is used for checking same semester & title
    title: this.title,
  });
  if (isExist) {
    throw new ApiError(
      httpStatus.CONFLICT,
      'Academic Faculty is already exists!'
    );
  }
  next();
});

export const AcademicFaculty = model<IAcademicFaculty, AcademicFacultyModel>(
  'AcademicFaculty',
  academicFacultySchema
);
