import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './create-user.dto';
import { hashPassword } from '../utils/passwordHasher';
import _ from 'underscore';

@Injectable()
export class SignupService {
  constructor(private prisma: PrismaService) {}

  async signUp(createUserDto: CreateUserDto) {
    createUserDto.password = await hashPassword(createUserDto.password);
    const user = await this.prisma.user.create({ data: createUserDto });
    return _.omit(user, 'password');
  }
}
