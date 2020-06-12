import { JoiValidationPipe } from './../joi-validation.pipe';
import { IUser, UserService } from './user.service';
import { Controller, Get, Post, Body, Put, Delete, Param, ValidationPipe, UsePipes } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { User } from './user';
import { v4 as uuidv4 } from 'uuid';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}
    
    @Get()
    getAllUsers(): Observable<IUser[]> {
        return of(this.userService.users);
    }

    @Get('id')
    getUserById(@Param('id') id : string): Observable<IUser> {
        return of(this.userService.users.find(x => x.id === id)!);
    }

    @Post()
    @UsePipes(new ValidationPipe({transform: true}))
    createUser(@Body() userObj: Omit<User, 'id'>): Observable<{userId: string}> {
        const user = {...userObj, id: uuidv4()};
        console.log(user, userObj);
        this.userService.users.push(user);
        return of({userId: user.id});
    }

    @Put()
    editUser(@Body() userObj: Partial<IUser>): Observable<void> {
        console.log(userObj);
        return of();
    }

    @Delete(':id')
    deleteUser(@Param('id') id : string): Observable<void> {
        console.log(id);
        return of();
    }
}
