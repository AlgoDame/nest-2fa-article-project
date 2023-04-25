import { Module } from '@nestjs/common';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  controllers: [AccountController],
  providers: [AccountService],
  exports: [AccountService],
  imports: [PrismaModule],
})
export class AccountModule {}
