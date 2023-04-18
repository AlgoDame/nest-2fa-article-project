import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { SignupModule } from './signup/signup.module';
import { PrismaModule } from './prisma/prisma.module';
import { LoggerMiddleware } from './utils/logger';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [SignupModule, PrismaModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
