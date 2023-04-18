import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { SignupModule } from './signup/signup.module';
import { PrismaModule } from './prisma/prisma.module';
import { LoggerMiddleware } from './utils/logger';

@Module({
  imports: [SignupModule, PrismaModule],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
