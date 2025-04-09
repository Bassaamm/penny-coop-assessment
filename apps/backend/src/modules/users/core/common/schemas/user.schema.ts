import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Document } from 'mongoose';
import { Exclude } from 'class-transformer';
import * as bcrypt from 'bcrypt';
import { ApiProperty } from '@nestjs/swagger';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User extends Document {
  @ApiProperty()
  @Prop({ required: true })
  firstName: string;

  @ApiProperty()
  @Prop({ required: true })
  lastName: string;

  @ApiProperty()
  @Prop({ required: true, unique: true, lowercase: true })
  email: string;

  @ApiProperty()
  @Exclude({ toPlainOnly: true })
  @Prop({ required: true, select: false })
  password: string;

  @ApiProperty()
  @Exclude({ toPlainOnly: true })
  @Prop({ select: false })
  resetToken?: string;

  @ApiProperty()
  @Exclude({ toPlainOnly: true })
  @Prop({ select: false })
  resetTokenExpiration?: Date;

  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}
export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.methods.validatePassword = async function (
  password: string
): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};
