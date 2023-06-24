import { IAuth } from './auth.interface';
import { Auth } from './auth.model';

const loginUser = async (payload: IAuth) => {
  const { id, passord } = payload;
  //   const result = await Auth.create(payload);
  //check existence of user

  const isExist = await User.findOne(
    { id },
    { id: 1, password: 1, needsPasseordChange: 1 }
  );
  return result;
};

export const AuthService = {
  loginUser,
};
