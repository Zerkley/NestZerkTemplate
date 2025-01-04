import { Injectable } from '@nestjs/common';
import { AuthInterface } from 'src/modules/auth/domain/auth.interface';
import { AuthRepository } from 'src/modules/auth/infrastructure/persistence/auth.repository';
import { JwtOutput } from 'src/shared/jwt/jwt.interfaces';

@Injectable()
export class RefreshTokenUseCase {
  constructor(private readonly authRepository: AuthRepository) {}

  async handler(token: string): Promise<JwtOutput> {
    return await this.authRepository.refreshToken(token);
  }
}
