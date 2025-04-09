import { ApiProperty } from '@nestjs/swagger';

export default class RefreshTokenResponsePresenter {
  constructor(accessToken: string) {
    this.access_token = accessToken;
  }

  @ApiProperty()
  access_token: string;
}
