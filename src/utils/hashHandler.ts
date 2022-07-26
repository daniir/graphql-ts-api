import bcrypt from 'bcrypt';
import { configEnv } from '../config/index';

const { saltsRounds } = configEnv;

export const hashUserPassword = async (userPasswd: string): Promise<string> => {
    const hashPassword = await bcrypt.hash(userPasswd, saltsRounds);
    return hashPassword;
};

export const checkHashedPassword = async(userPasswd: string, hashedPasswd: string): Promise<Boolean> => {
    const checkPassword = await bcrypt.compare(userPasswd, hashedPasswd);
    return checkPassword;
};