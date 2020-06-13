import { UserService } from './user.service';
import {Controller, Get, Post, Body, Put, Delete, Param} from '@nestjs/common';
import {Observable, of} from 'rxjs';
import { UserEntity} from './user.entity';
import {mergeMap} from 'rxjs/operators';
import {UserDto} from './user.dto';
import {CreateUserDto} from './create-user.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}
    
    @Get()
    getAllUsers(): Observable<UserDto[]> {
        return this.userService.findAll();
    }

    @Get(':id')
    getUserById(@Param('id') id : string): Observable<UserDto> {
        return this.userService.findById(id);
    }

    @Post()
    createUser(@Body() userDto: CreateUserDto): Observable<UserDto> {
        const { username, password, email, name } = userDto;
        const userEntity: UserEntity = this.userService.user.create({username, password, email, name});
        console.log(userEntity)
        return of(userEntity).pipe(
          mergeMap(
            user => this.userService.save(user)
          )
        )
    }

    @Put(':id')
    editUser(@Param('id') id: string, @Body() userObj: CreateUserDto): Observable<void> {
        return this.userService.update(id, userObj);
    }

    @Delete(':id')
    deleteUser(@Param('id') id : string): Observable<void> {
        return this.userService.delete(id);
    }
}
