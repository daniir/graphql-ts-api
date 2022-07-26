export type Claims = {
    sub: string,
    role: string,
};

export type Context = {
    user: Claims,
};