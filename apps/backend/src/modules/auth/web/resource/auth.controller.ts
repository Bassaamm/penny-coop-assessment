import { ReqUser } from './../../../../common/decorators/request-user.decorator';
import { ApiConfigService } from './../../../../shared/services/api-config.service';
import {
  Body,
  Controller,
  Get,
  Inject,
  OnApplicationBootstrap,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from '../../core/services/auth.service';
import { UserService } from '../../../users/core/services/user.service';
import { JwtRefreshTokenGuard } from '../../infrastructure/guards/refresh-jwt-auth.guard';
import { RefreshTokenDto } from '../views/refresh-token.dto';
import { RegisterUserDto } from '../views/register-user.dto';
import { SignInDto } from '../views/signin-user.dto';
import { Public } from '../../infrastructure/decorators/public.decorator';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import AuthResponsePresenter from '../views/auth-response.presenter';
import RefreshTokenResponsePresenter from '../views/refresh-token-response.presenter';
import { UserPayload } from '../../infrastructure/strategy/jwt.strategy';
import {
  ResetPasswordDTO,
  ResetPasswordParamsDTO,
  ResetPasswordRequestDTO,
} from '../views/reset-password.dto';
import { User } from '../../../users/core/common/schemas/user.schema';

@ApiTags('auth')
@Controller('auth')
export class AuthController implements OnApplicationBootstrap {
  @Inject()
  private authService: AuthService;

  @Inject()
  private userService: UserService;

  @Inject()
  private readonly apiConfigService: ApiConfigService;

  private appUrl: string;
  private httpSecure: boolean;
  private httpPart: string;

  onApplicationBootstrap() {
    const config = this.apiConfigService.appConfig;
    this.appUrl = config.appUrl;
    this.httpSecure = config.appHttpSecure;
    this.httpPart = `${this.httpSecure ? 'https' : 'http'}://`;
  }

  @Public()
  @ApiOkResponse({ type: User })
  @Post('signup')
  async signUp(@Body() registerUserDto: RegisterUserDto) {
    const createdUser = await this.userService.createUser(registerUserDto);
    console.log('asdas', createdUser);
    return createdUser;
  }

  @Public()
  @ApiOkResponse({ type: AuthResponsePresenter })
  @Post('login')
  async signIn(@Body() signInDto: SignInDto) {
    const session = await this.authService.signIn(signInDto);
    return session;
  }

  @Public()
  @ApiOkResponse({ type: RefreshTokenResponsePresenter })
  @UseGuards(JwtRefreshTokenGuard)
  @Post('refresh-token')
  async refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refreshAccessToken(refreshTokenDto.refresh_token);
  }

  @ApiOkResponse({ type: UserPayload })
  @Get('profile')
  getProfile(@ReqUser() { user }: UserPayload) {
    return this.userService.getProfile(user.id);
  }

  @Public()
  @Post('reset-password')
  async requestResetPassword(@Body() { email }: ResetPasswordRequestDTO) {
    return this.authService.generateResetToken(email);
  }

  @Public()
  @Post('reset-password/:token')
  async resetPassword(
    @Param() { token }: ResetPasswordParamsDTO,
    @Body() { password }: ResetPasswordDTO
  ) {
    return this.authService.resetPassword(token, password);
  }
}
