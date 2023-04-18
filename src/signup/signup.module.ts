import { Module } from '@nestjs/common';
import { SignupController } from './signup.controller';
import { SignupService } from './signup.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  controllers: [SignupController],
  providers: [SignupService],
  exports: [SignupService],
  imports: [PrismaModule],
})
export class SignupModule {}
