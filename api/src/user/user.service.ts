import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {UserEntity} from './user.entity';
import {InjectRepository} from '@nestjs/typeorm';
import {FindOneOptions, Repository} from 'typeorm';
import {from, iif, Observable, of, throwError} from 'rxjs';
import {map, mergeMap} from 'rxjs/operators';
import {userNotFound} from './user-error-message.utils';
import {UserDto} from './user.dto';
import {toUserDto} from '../shared/to-user.util';
import {LoginUserDto} from './login-user.dto';
import bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) public readonly user: Repository<UserEntity>
  ) {}

  save(user: UserEntity): Observable<UserDto> {
    console.log(user);
    return from(this.user.save(user))
      .pipe(
        map(user => toUserDto(user))
      );
  }

  findAll(): Observable<UserDto[]> {
    return from(this.user.find())
      .pipe(
        map(user => user.map(u => toUserDto(u)))
      );
  }

  findOne(options?: FindOneOptions): Observable<UserDto> {
   return from(
     this.user.findOne(options)
   ).pipe(
     map(user => toUserDto(user))
   )
  }

  findById(id: string): Observable<UserDto> {
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

  findByLogin({username, password}: LoginUserDto): Observable<UserDto> {
    return from(this.user.findOne({where: username})).pipe(
      mergeMap(
        user => {
          return iif(
            () => !user,
            throwError(new HttpException({
              status: HttpStatus.UNAUTHORIZED,
              error: userNotFound(username, 'name')
            }, HttpStatus.UNAUTHORIZED)),
            from(
              bcrypt.compare(password, user.password)
            ).pipe(
              mergeMap(
                isEqual => iif(
                  () => isEqual,
                  of(toUserDto(user)),
                  throwError(
                    new HttpException({
                      status: HttpStatus.UNAUTHORIZED,
                      error: `Invalid Credentials`
                    }, HttpStatus.UNAUTHORIZED)
                  )
                )
              )
            )
          )
        }
      )
    )
  }

  findByPayload({username}: any): Observable<UserDto> {
    return this.findOne({where: {username}});
  }

  update(id: string, user: Partial<UserEntity>): Observable<void> {
    return from(
      this.user.update(id, user)
    ).pipe(
      mergeMap(res =>
        iif(
          () => res.affected === 0,
          throwError(
            new HttpException({
              status: HttpStatus.NOT_FOUND,
              error: userNotFound(user.id),
            }, HttpStatus.NOT_FOUND)
          ),
          of()
        )
      )
    );
  }

  delete(id: string): Observable<void> {
    return from(
      this.user.delete(id)
    ).pipe(
      mergeMap(res =>
        iif(
          () => res.affected === 0,
          throwError(
            new HttpException({
              status: HttpStatus.NOT_FOUND,
              error: userNotFound(id),
            }, HttpStatus.NOT_FOUND)
          ),
          of()
        )
      )
    )
  }
}
