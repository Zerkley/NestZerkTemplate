import { Module } from '@nestjs/common';
import { AuthController } from './infrastructure/rest/auth.controller';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { JwtModule } from '@nestjs/jwt';
import { LoginUseCase } from './application/use-cases/login/login.usecase';
import { AuthRepository } from './infrastructure/persistence/auth.repository';
import {
  AuthModel,
  AuthSchema,
  AuthSchemaName,
} from './infrastructure/persistence/auth.schema';
import { HashService } from 'src/shared/hash/hash.service';
import { MongooseModule } from '@nestjs/mongoose';

const USE_CASES = [LoginUseCase];
const REPOSITORIES = [AuthRepository];
const MODELS = [AuthModel];
const SERVICES = [HashService];
@Module({
  controllers: [AuthController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    ...USE_CASES,
    ...REPOSITORIES,
    ...MODELS,
    ...SERVICES,
  ],
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
    MongooseModule.forFeature([{ name: AuthSchemaName, schema: AuthSchema }]),
  ],
})
export class AuthModule {}
