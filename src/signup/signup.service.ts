import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './create-user.dto';

@Injectable()
export class SignupService {
  constructor(private prisma: PrismaService) {}

  signUp(createUserDto: CreateUserDto) {
    return this.prisma.user.create({ data: createUserDto });
  }
}
