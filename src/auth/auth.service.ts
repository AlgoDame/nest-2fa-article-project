import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { HttpException } from '@nestjs/common';
import { Request } from 'express';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import { verifyPassword } from '../utils/passwordHasher';
import { generateOTP } from '../utils/codeGenerator';
import { Prisma } from '@prisma/client';
import { getExpiry } from 'src/utils/dateTimeUtility';
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
      success: true,
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async setTwoFA(req: Request) {
    const body = req.body;
    const userDetails = req['user'];

    const user = await this.prisma.user.findUnique({
      where: { id: userDetails.sub },
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    if (user.twoFA === body.set_2fa) {
      return { success: true };
    }

    if (user.twoFA && body.set_2fa == false) {
      // generate otp to disable MFA,create otp record, send sms and return
      const otp = generateOTP(6);
      const otpPayload: Prisma.OtpUncheckedCreateInput = {
        userId: user.id,
        code: otp,
        useCase: 'D2FA',
        expiresAt: getExpiry(),
      };

      await this.prisma.otp.create({
        data: otpPayload,
      });
      return { success: true };
    }

    await this.prisma.user.update({
      where: { id: user.id },
      data: { twoFA: body.set_2fa },
    });

    return { success: true };
  }
}
