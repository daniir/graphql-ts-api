import { InputType, Field } from 'type-graphql';

@InputType()
export class TaskInputs
{
    @Field()
    name!: string

    @Field()
    description?: string
};