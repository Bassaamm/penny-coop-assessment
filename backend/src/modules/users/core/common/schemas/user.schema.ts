import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Exclude } from 'class-transformer';

export type CatDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop()
  gender?: string;

  @Prop()
  phone?: string;

  @Prop({ required: true, unique: true, lowercase: true })
  email: string;

  @Exclude({ toPlainOnly: true })
  @Prop({ required: true, select: false }) 
  password: string;

  @Exclude({ toPlainOnly: true })
  @Prop({ select: false })
  resetToken?: string;

  @Exclude({ toPlainOnly: true })
  @Prop({ select: false })
  resetTokenExpiration?: Date;
}
export const UserSchema = SchemaFactory.createForClass(User);
