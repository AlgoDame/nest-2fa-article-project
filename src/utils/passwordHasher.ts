import * as bcrypt from 'bcrypt';
import { constants } from './constants';

const saltOrRounds = constants.saltRounds;

export const hashPassword = async (
  salt: number,
  password: string,
): Promise<string> => {
  const hash = await bcrypt.hash(password, saltOrRounds);
  return hash;
};

export const verifyPassword = async (password, hash): Promise<boolean> => {
  const isMatch = await bcrypt.compare(password, hash);
  return isMatch;
};
