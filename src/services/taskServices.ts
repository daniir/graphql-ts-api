import { prisma } from "../lib/prisma";
import { TaskInputs } from "../inputs/taskInputs";

export class TaskServices
{
    async getAllTasks(userId: string){
        try {
            const tasks = await prisma.tasks.findMany({ where: { userId } });
            return tasks;
        } catch (error) {
            console.error('ErrorTaskDB: ', error);
        }
    };

    async getTaskById(id: string, userId: string){
        try {
            const task = await prisma.tasks.findFirst({ where: { id, userId } });
            if(!task) throw new Error(`task with id ${id} not found`);
            return task;
        } catch (error) {
            console.error('ErrorTaskDB: ', error);
        }
    };

    async createTask(payload: TaskInputs, userId: string){
        try {
            const { name, description } = payload;
            const newTask = await prisma.tasks.create({
                data: {
                    name,
                    description,
                    userId
                }
            });
            return newTask;
        } catch (error) {
            console.error('ErrorTaskDB: ', error);
        }
    };

    async updateTask(id: string, payload: TaskInputs, userId: string){
        try {
            const { name, description } = payload;
            const findTask = await this.getTaskById(id, userId);
            if(findTask) {
                const task = await prisma.tasks.update({
                    data: {
                        name,
                        description,
                    },
                    where: {
                        id,
                    },
                });
                return task;
            }
        } catch (error) {
            console.error('ErrorTaskDB: ', error);
        }
    };

    async updateStatusTask(id: string, userId: string, status: boolean){
        try {
            const findTask = await this.getTaskById(id, userId);
            if(findTask){
                await prisma.tasks.update({ data: { status }, where: { id } });
                return `Task with id ${id} status ${status}`;
            }
        } catch (error) {
            console.error('ErrorTaskDB: ', error);
        }
    };

    async deleteTask(id: string, userId: string){
        try {
            const findTask = await this.getTaskById(id, userId);
            if(findTask) {
                await prisma.tasks.delete({ where: { id } });
                return `Task with id ${id} deleted`;
            };
        } catch (error) {
            console.error('ErrorTaskDB: ', error);
        }
    };
}
