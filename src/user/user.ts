import { IUser } from './user.service';
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { IsString, IsEmail, IsInt, IsOptional } from 'class-validator';

// @Entity()
export class User implements IUser {
    // @PrimaryGeneratedColumn()
    @IsString() @IsOptional()
    id: string;

    @IsString()
    // @Column()
    name: string;

    @IsInt()
    // @Column()
    age: number;

    @IsInt()
    // @Column()
    phone: number;

    @IsEmail()
    // @Column()
    email: string;

    @IsString()
    // @Column()
    address: string;
}