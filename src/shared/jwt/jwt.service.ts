import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtOutput, JwtPayload } from './jwt.interfaces';

@Injectable()
export class TokenService {
  constructor(private jwtService: JwtService) {}

  async sign(payload: JwtPayload): Promise<JwtOutput> {
    return {
      accessToken: this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET,
        expiresIn: '1d',
      }),
      refreshToken: this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET,
        expiresIn: '7d',
      }),
    };
  }
}
