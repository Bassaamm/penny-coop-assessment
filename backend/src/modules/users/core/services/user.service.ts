import { Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UserValidator } from '../common/user.validator';
import { LogMessage } from 'src/common/decorators/logger.decorator';
import { User } from '../common/schemas/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @Inject() private readonly userValidator: UserValidator,
  ) {}

  async findOneByEmail(email: string, selectPassword = false): Promise<User> {
    const query = this.userModel.findOne({ email });
    if (!selectPassword) {
      query.select('-password');
    }
    return query.exec();
  }

  async findOneUserOrFail(id: string): Promise<User> {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new Error(`User with id ${id} not found`);
    }
    return user;
  }

  async generateHash(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(password, salt);
  }

  @LogMessage('Create User with email {0.email}')
  async createUser(user: Partial<User>): Promise<User> {
    user.email = user.email.toLowerCase();
    await this.userValidator.validateCreateUser(user.email);
    user.password = await this.generateHash(user.password);

    const newUser = new this.userModel(user);
    return await newUser.save();
  }

  @LogMessage("Update user's info with id {0}")
  async updateUserInfo(
    id: string,
    updateInfoDto: Partial<User>,
  ): Promise<User> {
    const user = await this.findOneUserOrFail(id);

    // Update user properties
    Object.assign(user, updateInfoDto);
    return await user.save();
  }

  async saveResetTokenAndReturnUser(
    email: string,
    resetPayload: { resetToken: string; resetTokenExpiration: Date },
  ): Promise<User> {
    const user = await this.findOneByEmail(email);
    if (!user) {
      throw new Error(`User with email ${email} not found`);
    }

    Object.assign(user, resetPayload);
    return await user.save();
  }

  @LogMessage('Reseting password for user with resetToken {0}')
  async resetPassword(resetToken: string, newPassword: string): Promise<void> {
    const user = await this.userModel.findOne({ resetToken }).exec();

    this.userValidator.validateResetPasswordToken(user);

    user.password = await this.generateHash(newPassword);
    user.resetToken = null;
    user.resetTokenExpiration = null;

    await user.save();
  }

  async getProfile(
    userId: string,
    { expanded = false },
  ): Promise<any> {
    const query = this.userModel.findById(userId);

    if (expanded) {
      // Add any populate calls here if needed
      // query.populate('relatedField');
    }

    const user = await query.exec();
    if (!user) {
      throw new Error(`User with id ${userId} not found`);
    }

    // Transform user to profile format if needed
    return user;
  }
}
