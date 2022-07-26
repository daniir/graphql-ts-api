import { UserRole } from "../entities/user";
import { SignUpInputs, SignInInputs } from "../inputs/authInputs";
import { prisma } from "../lib/prisma";
import { hashUserPassword, checkHashedPassword } from "../utils/hashHandler";
import { signToken } from "../utils/tokenHandler";


export class AuthServices
{
    async signUpUser(payload: SignUpInputs){
        const { username, email, password } = payload;
        const user = await prisma.user.findFirst({where: {email}});
        if(user) throw new Error('Email most be unique');

        const passwordHash = await hashUserPassword(password);

        const newUser = await prisma.user.create({
            data: {
                username,
                email,
                password: passwordHash,
                role: UserRole.USER,
            },
        });

        return newUser;
    };

    async signInUser(payload: SignInInputs){
        const { username, password } = payload;
        const user = await prisma.user.findFirst({where: {username}});
        if(!user) throw new Error('Invalid username, please try to SignUp');
        
        const passwordIsValid = await checkHashedPassword(password, user.password);
        if(!passwordIsValid) throw new Error('Username/Password incorrect, please try again');

        const claims = {
            sub: user.id,
            role: user.role,
        };

        const token = signToken(claims);

        return token;
    };
}