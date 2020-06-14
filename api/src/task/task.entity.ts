import {Column, Entity, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import {IsNotEmpty, IsString, IsUUID} from 'class-validator';
import {UserEntity} from '../user/user.entity';

@Entity({
  name: 'tasks'
})
export class TaskEntity {
  @PrimaryGeneratedColumn('uuid')
  @Column({
    type: 'uuid',
    nullable: false,
    primary: true
  })
  @IsUUID()
  id: string;

  @Column({
    type: 'varchar',
    unique: true,
    name: 'taskname',
    nullable: false
  })
  @IsString()
  @IsNotEmpty()
  name: string

  @Column({
    type: 'text',
    name: 'status',
    nullable: false
  })
  @IsString() @IsNotEmpty()
  status: string

  @Column({
    name: 'taskdetail',
    type: 'varchar'
  })
  @IsString()
  details: string

  @Column({
    name: 'comments',
    type: 'varchar'
  })
  @IsString()
  comments: string

  @Column({
    name: 'user_id',
    nullable: false,
    unique: false
  })
  @OneToOne(type => UserEntity, user => user.id)
  @IsString() @IsNotEmpty()
  userId: string
}
