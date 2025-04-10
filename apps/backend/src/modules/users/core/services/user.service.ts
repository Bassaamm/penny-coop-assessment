import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UserValidator } from '../common/user.validator';
import { User, UserDocument } from '../common/schemas/user.schema';
import { AbstractService } from '../../../../common/abstract.service';

@Injectable()
export class UserService extends AbstractService<User> {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly userValidator: UserValidator
  ) {
    super(userModel as Model<User>);
  }

  async getAllUsers(): Promise<User[]> {
    return await this.findAll();
  }

  async generateHash(password: string): Promise<string> {
    const pepper = process.env.PASSWORD_PEPPER || '';
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(password + pepper, salt);
  }

  async createUser(user: Partial<User>): Promise<User> {
    user.email = user.email.toLowerCase();
    await this.userValidator.validateCreateUser(user.email);
    user.password = await this.generateHash(user.password);

    const newUser = new this.userModel(user);
    return await newUser.save();
  }

  async updateUserInfo(
    id: string,
    updateInfoDto: Partial<User>
  ): Promise<User> {
    const user = await this.findOneOrFail(id);

    Object.assign(user, updateInfoDto);
    return await user.save();
  }

  async saveResetTokenAndReturnUser(
    email: string,
    resetPayload: { resetToken: string; resetTokenExpiration: Date }
  ): Promise<User> {
    const user = await this.findOneByEmail(email);
    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }

    Object.assign(user, resetPayload);
    return await user.save();
  }

  async resetPassword(resetToken: string, newPassword: string): Promise<void> {
    const user = await this.userModel.findOne({ resetToken }).exec();

    this.userValidator.validateResetPasswordToken(user);

    user.password = await this.generateHash(newPassword);
    user.resetToken = null;
    user.resetTokenExpiration = null;

    await user.save();
  }

  async getProfile(userId: string): Promise<User> {
    const query = this.findOne(userId);
    if (!query) {
      throw new Error(`User with id ${userId} not found`);
    }

    return query;
  }
}
