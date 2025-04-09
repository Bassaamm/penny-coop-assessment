import { ApiProperty } from '@nestjs/swagger';

export default class AuthResponsePresenter {
  @ApiProperty()
  access_token: string;

  @ApiProperty()
  refresh_token: string;
}
