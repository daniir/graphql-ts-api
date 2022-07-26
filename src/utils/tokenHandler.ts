import jwt from 'jsonwebtoken';
import { configEnv } from '../config/index';
import { Claims } from '../graphql/context';

const { secret } = configEnv;

export const signToken = (payload: Claims): string => {
    const token = jwt.sign({
        sub: payload.sub,
        role: payload.role,
    }, secret);

    return `Bearer ${token}`;
};

export const verifyToken = (payload?: string) => {
    const token = payload?.split(' ')[1];
    if(token) {
        const user = jwt.verify(
            token,
            secret
        );
        return user;
    };
};