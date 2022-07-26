import { Resolver, Query, Mutation, Arg } from 'type-graphql';
import { SignUpInputs, SignInInputs } from '../inputs/authInputs';
import { User } from '../entities/user';
import { AuthServices } from '../services/authServices';

@Resolver()
export class AuthResolvers
{
    constructor(
        private authServices = new AuthServices(),
    ) {
    }
    @Query(() => String)
    async login(
        @Arg('payload') payload: SignInInputs,
    ){
        const userToken = await this.authServices.signInUser(payload);
        return userToken;
    };

    @Mutation(() => User)
    async signUp(
        @Arg('payload') payload: SignUpInputs,
    ){
        const newUser = await this.authServices.signUpUser(payload);
        return newUser;
    };

}