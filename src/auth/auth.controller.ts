import {
  Body,
  Controller,
  HttpCode,
  Post,
  Req,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { loginSchema } from 'src/joi-schema/login';
import { JoiValidationPipe } from 'src/pipes/joi';
import { AuthGuard } from './auth.guard';
import { Request } from 'express';
import { set2faSchema } from 'src/joi-schema/set2fa';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UsePipes(new JoiValidationPipe(loginSchema))
  @HttpCode(200)
  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @UsePipes(new JoiValidationPipe(set2faSchema))
  @UseGuards(AuthGuard)
  @HttpCode(200)
  @Post('set/twofa')
  enableTwoFA(@Req() request: Request) {
    return this.authService.setTwoFA(request);
  }
}
