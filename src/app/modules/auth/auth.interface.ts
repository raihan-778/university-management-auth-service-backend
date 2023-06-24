import { Model } from 'mongoose';

export type IAuth = {
  id: string;
  password: string;
};
export type AuthModel = Model<IAuth, Record<string, unknown>>;
