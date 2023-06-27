import { Model } from 'mongoose';

export type IAuth = {
  id: string;
  password: string;
};

export type ILoginUserResponse = {
  accessToken: string;
  refreshToken?: string;
  needPasswordChange: boolean | undefined;
};

export type IRefreshTokenResponse = {
  accessTokan: string;
};
export type AuthModel = Model<IAuth, Record<string, unknown>>;
