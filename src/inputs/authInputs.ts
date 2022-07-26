import { InputType, Field } from 'type-graphql';

@InputType()
export class SignUpInputs
{
    @Field()
    username!: string;

    @Field()
    email!: string;

    @Field()
    password!: string;
};

@InputType()
export class SignInInputs
{
    @Field()
    username!: string;

    @Field()
    password!: string;
}