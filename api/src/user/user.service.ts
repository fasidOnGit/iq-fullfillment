import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
    users: IUser[];

    constructor() {
        this.users = [{
            address: 'MPM',
            age: 77,
            name: 'Someone',
            email: 'some@one.com',
            id: 'user_id_' + Math.random(),
            phone: 7895410236
        }]
    }
}

/**
 * A User schema Object.
 */
export interface IUser {
    id: string,
    name: string,
    age: number,
    phone: number,
    email: string,
    address: string
}
