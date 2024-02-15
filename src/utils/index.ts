import bcrypt from 'bcrypt';

export const hashData = (password: string) => {
  return bcrypt.hash(password, 10);
};

export const verifyTokens = (token: string, compareToken: string) => {
  return bcrypt.compare(token, compareToken);
};
