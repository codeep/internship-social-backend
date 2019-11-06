import { ApiModelProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiModelProperty()
  email: string;
  @ApiModelProperty()
  password: string;
}

export class RegisterDto {
  @ApiModelProperty()
  firstname: string;
  @ApiModelProperty()
  lastname: string;
  @ApiModelProperty()
  email: string;
  @ApiModelProperty()
  birthdate: string;
  @ApiModelProperty()
  password: string;
}
