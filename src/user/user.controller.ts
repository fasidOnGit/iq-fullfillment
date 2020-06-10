import { IUser, UserService } from './user.service';
import { Controller, Get, Post, Body, Put, Delete, Param } from '@nestjs/common';
import { Observable, of } from 'rxjs';

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
    createUser(@Body() userObj: Omit<IUser, 'id'>): Observable<{userId: string}> {
        console.log(userObj)
        return of({userId: 'Someone'});
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
