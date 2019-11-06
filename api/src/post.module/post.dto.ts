import { ApiModelProperty, ApiModelPropertyOptional } from "@nestjs/swagger";

export class PostDto {
  @ApiModelProperty()
  title: string;
  @ApiModelProperty()
  content: string;
  @ApiModelPropertyOptional()
  files: string[]  
}
