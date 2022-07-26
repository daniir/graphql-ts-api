import { config } from 'dotenv';

config();

export const configEnv = {
    port: process.env.PORT,
    saltsRounds: Number(process.env.SALT_ROUNDS),
    secret: process.env.SECRET || '',
};