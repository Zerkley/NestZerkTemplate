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
        expiresIn: '2d',
      }),
      refreshToken: this.jwtService.sign(payload, {
        secret: process.env.JWT_REFRESH_SECRET,
        expiresIn: '14d',
      }),
    };
  }

  async verify(token: string): Promise<JwtPayload> {
    return this.jwtService.verify(token, {
      secret: process.env.JWT_SECRET,
    });
  }
}
