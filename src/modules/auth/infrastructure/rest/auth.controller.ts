import { Body, Controller, Get, Post } from '@nestjs/common';
import { Public } from 'src/shared/custom-decorators/Public.decorator';
import { LoginUseCase } from '../../application/use-cases/login/login.usecase';
import { AuthInterface } from '../../domain/auth.interface';
import { RegisterUseCase } from '../../application/use-cases/register/register.usecase';
import { RefreshTokenUseCase } from '../../application/use-cases/refresh-token/refreshToken.usecase';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly loginUseCase: LoginUseCase,
    private readonly registerUseCase: RegisterUseCase,
    private readonly refreshTokenUseCase: RefreshTokenUseCase,
  ) {}

  @Public()
  @Post('register')
  async register(@Body() body: Partial<AuthInterface>) {
    return await this.registerUseCase.handler(body);
  }

  @Public()
  @Post('login')
  async login(@Body() body: Partial<AuthInterface>) {
    return await this.loginUseCase.handler(body);
  }

  @Post('refresh')
  async refresh(@Body() body: string) {
    return await this.refreshTokenUseCase.handler(body);
  }
}
