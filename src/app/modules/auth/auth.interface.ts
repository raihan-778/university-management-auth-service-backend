import { Model } from 'mongoose';

export type IAuth = {
  id: string;
  password: string;
};

export type ILoginUserResponse = {
  accessToken: string;
  refreshToken?: string;
  needPasswordChange: boolean;
};
export type AuthModel = Model<IAuth, Record<string, unknown>>;
