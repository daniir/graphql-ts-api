import { ObjectType, Field, ID } from 'type-graphql';

@ObjectType()
export class Task
{
    @Field(type => ID)
    id!: string

    @Field()
    name!: string

    @Field()
    description?: string

    @Field()
    status!: boolean
}