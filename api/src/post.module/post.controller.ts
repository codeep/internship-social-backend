import { Controller, Post, Body, Param, Delete, Get } from '@nestjs/common';
import { PostService } from './post.service';
import { ObjectId } from 'mongoose';
import { PostDto } from './post.dto';
import { ApiUseTags } from '@nestjs/swagger';

@ApiUseTags('posts')
@Controller('posts')
export class PostController {
  constructor(
    private readonly postService: PostService) {}

  @Post()
  async create(@Body() body: PostDto) {
    this.postService.create(body);
  }

  @Get('feed')
  async feed(@Body() body: PostDto) {
    this.postService.create(body);
  }

  @Get('wall')
  async wall(@Body() body: PostDto) {
    this.postService.create(body);
  }

  @Delete(':id')
  async delete(@Param() id: ObjectId) {
    this.postService.delete(id);
  }

  @Post(':id/like')
  async like(@Param() id: ObjectId) {
    this.postService.like(id);
  }
}
