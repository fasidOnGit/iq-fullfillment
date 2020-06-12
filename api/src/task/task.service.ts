import { Injectable } from '@nestjs/common';

export interface ITask {
    user: string;
    taskId: string; 
    desc: string;
    done: boolean;
}

@Injectable()
export class TaskService {}
