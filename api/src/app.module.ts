import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TaskModule } from './task/task.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user';

@Module({
  imports: [
    UserModule, 
    TaskModule,
    // TypeOrmModule.forRoot({
    //   type: 'mysql',
    //   host: 'SG-mysqldb-2521-master.servers.mongodirector.com',
    //   port: 3306,
    //   username: 'sgroot',
    //   password: 'qUAiNIb7s5NHzk_w',
    //   database: 'test',
    //   entities: [User],
    //   synchronize: true,
    // }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
