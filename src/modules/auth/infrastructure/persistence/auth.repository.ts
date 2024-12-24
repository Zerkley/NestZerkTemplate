import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AuthDocument, AuthSchemaName } from './auth.schema';
import { Model } from 'mongoose';
import { AuthInterface } from '../../domain/auth.interface';
import { HashService } from 'src/shared/hash/hash.service';

@Injectable()
export class AuthRepository {
  constructor(
    @InjectModel(AuthSchemaName)
    private readonly authModel: Model<AuthDocument>,
    private readonly hashService: HashService,
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
}
