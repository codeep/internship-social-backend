import { ApiModelProperty, ApiModelPropertyOptional } from "@nestjs/swagger";

export class UserDto {
  @ApiModelProperty()
  firstname: string;
  @ApiModelProperty()
  lastname: string;
  @ApiModelProperty()
  email: string;
  @ApiModelProperty()
  birthdate: string;
  @ApiModelPropertyOptional()
  password: string;
  @ApiModelPropertyOptional()
  categories: string[];
  @ApiModelPropertyOptional()
  confirmed: number;
  @ApiModelPropertyOptional()
  token: string;
}
