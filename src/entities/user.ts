import { ObjectType, Field, ID, registerEnumType } from 'type-graphql';

export enum UserRole
{
    USER = 'USER',
    ADMIN = 'ADMIN',
};

registerEnumType(UserRole, {name: 'UserRole'})

@ObjectType()
export class User
{
    @Field(type => ID)
    id!: string;

    @Field()
    username!: string;

    @Field()
    email!: string;

    @Field()
    password!: string

    @Field(type => UserRole)
    role!: UserRole
};