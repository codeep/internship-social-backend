import { ApiModelPropertyOptional } from "@nestjs/swagger";

export class DetailsDto {
  @ApiModelPropertyOptional()
  firstname: string;
  @ApiModelPropertyOptional()
  lastname: string;
  @ApiModelPropertyOptional()
  occupation: string;
  @ApiModelPropertyOptional()
  location: string;
  @ApiModelPropertyOptional()
  bio: string;
}
