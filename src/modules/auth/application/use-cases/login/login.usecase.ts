import { Injectable } from '@nestjs/common';
import { AuthInterface } from 'src/modules/auth/domain/auth.interface';
import { AuthRepository } from 'src/modules/auth/infrastructure/persistence/auth.repository';
import { LoginOutput } from 'src/shared/services/jwt/jwt.interfaces';

@Injectable()
export class LoginUseCase {
  constructor(private readonly authRepository: AuthRepository) {}

  async handler(auth: Partial<AuthInterface>): Promise<LoginOutput> {
    return await this.authRepository.login(auth);
  }
}
