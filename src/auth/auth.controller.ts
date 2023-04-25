import {
  Body,
  Controller,
  HttpCode,
  Post,
  Req,
  UsePipes,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { loginSchema } from '../common/joi-schema/login';
import { JoiValidationPipe } from '../common/pipes/joi';
import { tokenSchema } from '../common/joi-schema/token';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UsePipes(new JoiValidationPipe(loginSchema))
  @HttpCode(200)
  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @UsePipes(new JoiValidationPipe(tokenSchema))
  @HttpCode(200)
  @Post('login/verify/token')
  verifyLogin(@Body() _body, @Req() request: Request) {
    return this.authService.verifyLogin(request);
  }
}
