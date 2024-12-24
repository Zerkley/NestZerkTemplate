import { Controller, Get } from '@nestjs/common';
import { Public } from 'src/shared/custom-decorators/Public.decorator';
import { LoginUseCase } from '../../application/use-cases/login/login.usecase';

@Controller('auth')
export class AuthController {
  constructor(private readonly loginUseCase: LoginUseCase) {}

  @Public()
  @Get()
  async login() {
    return await this.loginUseCase.handler('email', 'password');
  }
}
