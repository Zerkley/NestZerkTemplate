import { Injectable } from '@nestjs/common';
import { AuthInterface } from 'src/modules/auth/domain/auth.interface';
import { AuthRepository } from 'src/modules/auth/infrastructure/persistence/auth.repository';

@Injectable()
export class RegisterUseCase {
  constructor(private readonly authRepository: AuthRepository) {}

  async handler(auth: Partial<AuthInterface>): Promise<AuthInterface> {
    return await this.authRepository.register(auth);
  }
}
