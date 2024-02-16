import { User } from '../../users/user.entity';

export interface IValidateUserParams {
  email: string;
  password: string;
}

export interface IAutTokensResponse {
  refreshToken: string;
  accessToken: string;
}
