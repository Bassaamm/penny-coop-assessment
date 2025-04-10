import { UserPayload } from './../../../auth/infrastructure/strategy/jwt.strategy';
import { ReqUser } from './../../../../common/decorators/request-user.decorator';
import { Body, Controller, Get, Patch } from '@nestjs/common';
import { UserService } from '../../core/services/user.service';
import { ApiTags } from '@nestjs/swagger';
import { UpdateUserDto } from '../views/update-user.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Get('all')
  async getAllUsers() {
    return this.userService.getAllUsers();
  }
  @Patch('profile')
  async updateProfile(
    @ReqUser() { user }: UserPayload,
    @Body() updateProfileDto: UpdateUserDto
  ) {
    return this.userService.updateUserInfo(user.id, updateProfileDto);
  }
}
