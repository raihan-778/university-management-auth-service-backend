/* eslint-disable @typescript-eslint/no-this-alias */
import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
import config from '../../../config';
import { IUser, IUserMethods, UserModel } from './user.interface';

const userSchema = new Schema<IUser, Record<string, never>, IUserMethods>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: 0, // by using select:0, we are stoping deliver password option to frontend.
    },
    needPasswordChange: {
      type: Boolean,
      default: true,
    },
    passwordChangedAt: {
      type: Date,
    },
    student: {
      type: Schema.Types.ObjectId,
      ref: 'Student',
    },
    faculty: {
      type: Schema.Types.ObjectId,
      ref: 'Faculty',
    },
    // Admin: {
    //   type: Schema.Types.ObjectId,
    //   required: true,
    //   ref: 'Admin',
    // },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true, // here we use "toJSON:{virtuals:true}" the reason is mongodb always gives us a unique id as _id.by using virtuals:true we can see this _id as id virtualy but it will not saved in database.we just can see this _id as virtual id.
    },
  }
);

//isUserExist instance method
userSchema.methods.isUserExists = async function (
  id: string
): Promise<Partial<IUser> | null> {
  return await User.findOne(
    { id },
    { id: 1, password: 1, needPasswordChange: 1, role: 1 }
  );
};

//isPasswordMatched instance methods
userSchema.methods.isPasswordMatched = async function (
  givenPassword: string,
  currentPassword: string
): Promise<boolean> {
  const isMatched = await bcrypt.compare(givenPassword, currentPassword);

  return isMatched;
};

//user.create /user.save// these are pre-hookporvided by mongoose which will help us to do something before saving data to database.It will work only at the time of save to database.

//User.create // user.save
userSchema.pre('save', async function (next) {
  //hashing user password

  const user = this;

  user.password = await bcrypt.hash(
    user.password,

    Number(config.bcrypt_salt_round)
  );

  if (!user.needPasswordChange) {
    this.passwordChangedAt = new Date();
  }
  next();
});

export const User = model<IUser, UserModel>('User', userSchema);
