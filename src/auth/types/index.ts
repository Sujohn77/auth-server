import { User } from '../../users/user.entity';

export interface IValidateUserParams {
  email: string;
  password: string;
}

export interface ICommonException {
  message: string;
  code: string;
}

export interface IAuthUserResponse {
  user: User;
  token: string;
}

export type AuthResponseType = Promise<IAuthUserResponse | ICommonException>;
