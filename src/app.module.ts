import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';

import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'bingo',
      database: 'postgres',
      entities: [User],
      synchronize: true,
    }),

    ConfigModule.forRoot(),
    UsersModule,
    AuthModule,
  ],
  providers: [],
  controllers: [],
})
export class AppModule {}
