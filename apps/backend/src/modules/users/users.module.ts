import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './core/services/user.service';
import { User, UserSchema } from './core/common/schemas/user.schema';
import { UserValidator } from './core/common/user.validator';
import { UsersController } from './web/resource/users.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UsersController],

  providers: [UserService, UserValidator],
  exports: [UserService, UserValidator],
})
export class UsersModule {}
