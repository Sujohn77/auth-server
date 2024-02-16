import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

export interface IApiUser {
  id: number;
  email: string;
  username: string;
  refreshToken?: string;
}

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll(): Promise<IApiUser[]> {
    const users = await this.usersRepository.find();
    return users.map((user) => ({
      id: user.id,
      email: user.email,
      username: user.username,
    }));
  }

  async findOne(id: number): Promise<IApiUser> {
    const user = await this.usersRepository.findOne({ where: { id } });
    return {
      id: user.id,
      email: user.email,
      username: user.username,
      refreshToken: user.refreshToken,
    };
  }

  async create(user: Partial<User>): Promise<User> {
    return this.usersRepository.save(user);
  }

  async update(id: number, updateUserDto: Partial<User>): Promise<User> {
    await this.usersRepository.update(id, updateUserDto);
    return this.usersRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
