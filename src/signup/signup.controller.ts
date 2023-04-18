import { Controller, Post, Body, UsePipes } from '@nestjs/common';
import { SignupService } from './signup.service';
import { CreateUserDto } from './create-user.dto';
import { signupSchema } from '../joi-schema/signup';
import { JoiValidationPipe } from '../pipes/joi';

@Controller('signup')
export class SignupController {
  constructor(private readonly signupService: SignupService) {}

  @Post()
  @UsePipes(new JoiValidationPipe(signupSchema))
  create(@Body() createUserDto: CreateUserDto) {
    return this.signupService.signUp(createUserDto);
  }
}
