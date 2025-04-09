import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { UserPayload } from '../../modules/auth/infrastructure/strategy/jwt.strategy';

export const ReqUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): UserPayload => {
    const request = ctx.switchToHttp().getRequest();
    const user: UserPayload = request.user;

    if (!user) throw new Error('User not found in request');

    return user;
  }
);
