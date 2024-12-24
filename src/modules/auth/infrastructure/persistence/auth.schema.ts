import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { AuthInterface } from '../../domain/auth.interface';
import { Document, Types } from 'mongoose';
@Schema({ timestamps: true })
export class AuthModel implements AuthInterface {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: Types.ObjectId })
  alerts?: Types.Array<Types.ObjectId & Document>;

  @Prop({ type: Types.ObjectId })
  payments?: Types.Array<Types.ObjectId & Document>;
}
export type AuthDocument = AuthModel & Document;
export const AuthSchema = SchemaFactory.createForClass(AuthModel);
export const AuthSchemaName = 'auth';
