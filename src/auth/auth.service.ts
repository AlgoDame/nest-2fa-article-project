import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { HttpException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto } from './login.dto';
import { verifyPassword } from '../utils/passwordHasher';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async login(loginDto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: loginDto.email },
    });
    if (!user) {
      throw new HttpException(
        'Invalid email or password',
        HttpStatus.BAD_REQUEST,
      );
    }
    const validPassword = await verifyPassword(
      loginDto.password,
      user.password,
    );

    if (!validPassword) {
      throw new HttpException(
        'Invalid email or password',
        HttpStatus.BAD_REQUEST,
      );
    }

    const payload = {
      email: user.email,
      first_name: user.firstName,
      last_name: user.lastName,
      sub: user.id,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
