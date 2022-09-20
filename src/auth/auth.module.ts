import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { PersonModule } from 'src/person/person.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [PersonModule, PassportModule,
  JwtModule.register({
    secret: process.env.JWT_SECRET,
    signOptions: {expiresIn: '30d'}
  })],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, /*JwtStrategy */]
})
export class AuthModule /* implements NestModule */ {
  /* configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoginValidationMiddleware).forRoutes('login');
  } */
}
