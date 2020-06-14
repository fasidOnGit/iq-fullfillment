import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {TaskEntity} from './task.entity';
import {FindOneOptions, Repository} from 'typeorm';
import {from, iif, Observable, of, throwError} from 'rxjs';
import {mergeMap} from 'rxjs/operators';
import {userNotFound} from '../user/user-error-message.utils';

@Injectable()
export class TaskService {
    constructor(
      @InjectRepository(TaskEntity) private readonly task: Repository<TaskEntity>
    ) {}

    findAll(): Observable<TaskEntity[]> {
      return from(this.task.find());
    }

    findOne(options?: FindOneOptions): Observable<TaskEntity> {
      return from(
        this.task.findOne(options)
      );
    }

    findById(id: string): Observable<TaskEntity> {
      return this.findOne({where: {id}}).pipe(
        mergeMap(res => {
          return iif(
            () => res !== undefined,
            of(res),
            throwError(new HttpException({
              status: HttpStatus.NOT_FOUND,
              error: userNotFound(id)
            }, HttpStatus.NOT_FOUND))
          )
        })
      );
    }

    create(taskDto: Partial<TaskEntity>): Observable<TaskEntity> {
      const user: TaskEntity = this.task.create(taskDto);
      return from(
        this.task.save(user)
      );
    }
}
