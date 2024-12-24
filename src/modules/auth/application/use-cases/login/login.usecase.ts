import { Injectable } from '@nestjs/common';
import { AuthInterface } from 'src/modules/auth/domain/auth.interface';
import { AuthRepository } from 'src/modules/auth/infrastructure/persistence/auth.repository';

@Injectable()
export class LoginUseCase {
  constructor(private readonly authRepository: AuthRepository) {}

  async handler(email: string, password: string): Promise<string> {
    return 'whatever';
  }
}
