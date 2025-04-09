import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// used to authenticate the user based on the email and password
@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {}
