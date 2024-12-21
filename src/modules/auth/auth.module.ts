import { Module } from '@nestjs/common';
import { AuthController } from './infrastructure/rest/auth.controller';

@Module({
  controllers: [AuthController],
})
export class AuthModule {}
