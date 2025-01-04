import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AuthDocument, AuthSchemaName } from './auth.schema';
import { Model } from 'mongoose';
import { AuthInterface } from '../../domain/auth.interface';
import { HashService } from 'src/shared/hash/hash.service';
import { TokenService } from 'src/shared/jwt/jwt.service';
import { JwtOutput, LoginOutput } from 'src/shared/jwt/jwt.interfaces';

@Injectable()
export class AuthRepository {
  constructor(
    @InjectModel(AuthSchemaName)
    private readonly authModel: Model<AuthDocument>,
    private readonly hashService: HashService,
    private readonly tokenService: TokenService,
  ) {}

  async register(auth: Partial<AuthInterface>): Promise<AuthInterface> {
    const session = await this.authModel.db.startSession();
    let newUser: AuthInterface;
    try {
      if (!auth.email || !auth.password)
        throw new HttpException('Invalid request', 400);
      const userExists = await this.authModel.findOne({ email: auth.email });
      if (userExists) throw new HttpException('User already exists', 400);

      const hashedPassword = await this.hashService.hash(auth.password);
      await session.withTransaction(async () => {
        const newUser = new this.authModel({
          email: auth.email,
          password: hashedPassword,
        });
        await newUser.save({ session });
      });
      return newUser;
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException('Internal server error', 500);
    }
  }

  async login(auth: Partial<AuthInterface>): Promise<LoginOutput> {
    const userExists = await this.authModel.findOne({ email: auth.email });
    if (!userExists) throw new HttpException('User not found', 400);
    const isPasswordValid = await this.hashService.compare(
      auth.password,
      userExists.password,
    );
    if (!isPasswordValid) throw new HttpException('Invalid password', 400);
    const tokens = await this.tokenService.sign({
      sub: userExists.email,
      password: userExists.password,
    });
    return {
      _id: userExists._id.toString(),
      tokens,
    };
  }

  async refreshToken(token: string): Promise<JwtOutput> {
    const payload = await this.tokenService.verify(token);
    return this.tokenService.sign({
      sub: payload.sub,
      password: payload.password,
    });
  }
}
