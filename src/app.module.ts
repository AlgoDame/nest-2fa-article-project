import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AccountModule } from './account/account.module';
import { PrismaModule } from './prisma/prisma.module';
import { LoggerMiddleware } from './common/utils/logger';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [AccountModule, PrismaModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
