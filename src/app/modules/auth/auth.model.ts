/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, model } from 'mongoose';
import { AuthModel, IAuth } from './auth.interface';

const loginSchema = new Schema<IAuth, AuthModel>(
  {
    id: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true, // here we use "toJSON:{virtuals:true}" the reason is mongodb always gives us a unique id as _id.by using virtuals:true we can see this _id as id virtualy but it will not saved in database.we just can see this _id as virtual id.
    },
  }
);

export const Auth = model<IAuth, AuthModel>('Auth', loginSchema);
