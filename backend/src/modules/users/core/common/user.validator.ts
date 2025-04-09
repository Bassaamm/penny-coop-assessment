import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { User } from './schemas/user.schema';

@Injectable()
export class UserValidator {
  @Inject()
  private readonly userService: UserService;

  async checkUserEmailExists(email: string): Promise<boolean> {
    const user = await this.userService.findOneByEmail(email);
    return !!user;
  }

  async validateCreateUser(email: string) {
    if (await this.checkUserEmailExists(email)) {
      throw new ConflictException('Email already exists');
    }
  }

  validateResetPasswordToken(user: User) {
    if (!user) {
      throw new NotFoundException('Invalid or expired reset token');
    }
  }

}
