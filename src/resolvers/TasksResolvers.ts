import { AuthenticationError } from 'apollo-server-core';
import { Resolver, Query, Mutation, Arg, Ctx } from 'type-graphql';
import { Task } from '../entities/task';
import { Context } from '../graphql/context';
import { TaskInputs } from '../inputs/taskInputs';
import { TaskServices } from '../services/taskServices';

@Resolver()
export class TasksResolvers
{
    constructor(
        private taskServices = new TaskServices()
    ) {}

    @Query(() => [Task])
    async getTasks(
        @Ctx() ctx: Context,
    ) {
        if(!ctx.user) throw new AuthenticationError('Unauthorized Access');
        try {
            const { sub } = ctx.user;
            const tasks = await this.taskServices.getAllTasks(sub);
            if(!tasks) return [];
            return tasks;
        } catch (error) {
            console.error('ErrorTaskResol: ', error);
        }
    };

    @Query(() => Task)
    async getTask(
        @Arg('id') id: string,
        @Ctx() ctx: Context,
    ) {
        if(!ctx.user) throw new AuthenticationError('Unauthorized Access');
        try {
            const { sub } = ctx.user;
            const task = await this.taskServices.getTaskById(id, sub);
            if(!task) return {};
            return task;
        } catch (error) {
            console.error('ErrorTaskResol: ', error);
        }
    };

    @Mutation(() => Task)
    async createTask(
        @Arg('payload') payload: TaskInputs,
        @Ctx() ctx: Context,
    ){
        if(!ctx.user) throw new AuthenticationError('Unauthorized Access');
        try {
            const { sub } = ctx.user;
            const task = await this.taskServices.createTask(payload, sub);
            return task;
        } catch (error) {
            console.error('ErrorTaskResol: ', error);
        }
    };

    @Mutation(() => Task)
    async updateTask(
        @Arg('id') id: string,
        @Arg('payload') payload: TaskInputs,
        @Ctx() ctx: Context
    ){
        if(!ctx.user) throw new AuthenticationError('Unauthorized Access');
        try {
            const { sub } = ctx.user;
            const task = await this.taskServices.updateTask(id, payload, sub);
            return task;
        } catch (error) {
            console.error('ErrorTaskResol: ', error);
        }
    };

    @Mutation(() => String)
    async updateStatusTask(
        @Arg('id') id: string,
        @Arg('status') status: boolean,
        @Ctx() ctx: Context
    ){
        if(!ctx.user) throw new AuthenticationError('Unauthorized Access');
        try {
            const { sub } = ctx.user;
            const task = await this.taskServices.updateStatusTask(id, sub, status);
            return task;
        } catch (error) {
            console.error('ErrorTaskResol: ', error);
        }
    };

    @Mutation(() => String)
    async deleteTask(
        @Arg('id') id: string,
        @Ctx() ctx: Context
    ){
        if(!ctx.user) throw new AuthenticationError('Unauthorized Access');
        try {
            const { sub } = ctx.user;
            const task = await this.taskServices.deleteTask(id, sub);
            return task;
        } catch (error) {
            console.error('ErrorTaskResol: ', error);
        }
    };
}