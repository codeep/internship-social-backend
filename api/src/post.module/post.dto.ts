import { ApiModelProperty } from "@nestjs/swagger";

export class PostDto {
  @ApiModelProperty()
  title: string;
  @ApiModelProperty()
  content: string;
  @ApiModelProperty()
  files: string[]  
}
