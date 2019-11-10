import { Controller, Post, Body, Param, Delete, Get, Query, Res } from '@nestjs/common';
import { PostService } from './post.service';
import { ObjectId } from 'mongoose';
import { PostDto } from './post.dto';
import { ApiUseTags } from '@nestjs/swagger';
import { Response } from 'express';

@ApiUseTags('posts')
@Controller('posts')
export class PostController {
  constructor(
    private readonly postService: PostService) {}

  @Post('/')
  async create(@Body() body: PostDto) {
    this.postService.create(body);
  }

  @Get('feed')
  async feed(@Query() queryParams, @Res() res: Response) {
    const userId = 1;
    const posts = await this.postService.getFeed(userId, queryParams.offset, queryParams.limit);

    return res.json({
      status: 200,
      message: '',
      data: posts
    });
  }

  @Get('wall/:id')
  async wall(@Param() id, @Query() offset, @Query() limit, @Res() res: Response) {
    const posts = await this.postService.getWall(id, offset, limit);

    return res.json({
      status: 200,
      message: '',
      data: posts
    })
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
