import { Controller, Post, Body, Param, Delete, Get, Query, Res, Req } from '@nestjs/common';
import { PostService } from './post.service';
import { ObjectId } from 'mongoose';
import { PostDto } from './post.dto';
import { ApiUseTags, ApiImplicitHeader, ApiImplicitBody } from '@nestjs/swagger';
import { Response } from 'express';

@ApiUseTags('posts')
@Controller('posts')
export class PostController {
  constructor(
    private readonly postService: PostService) {}
    
  @ApiImplicitHeader({ name: 'token'})
  @Post('/')
  async create(@Req() req, @Body() body: PostDto, @Res() res) {
    const userId = req.user.userId;
    const savedPost = await this.postService.create(userId, body);
    if (savedPost) {
      return res.json({
        status: 201,
        message: '',
        data: savedPost
      });
    } else {
      return res.json({
        status: 400,
        message: 'Invalid request',
        data: null 
      });
    }
  }

  @ApiImplicitHeader({ name: 'token'})
  @Get('feed')
  async feed(@Query() queryParams, @Req() req, @Res() res: Response) {
    const userId = req.user.userId;
    const posts = await this.postService.getFeed(userId, queryParams.offset, queryParams.limit);

    return res.json({
      status: 200,
      message: '',
      data: posts
    });
  }

  @ApiImplicitHeader({ name: 'token'})
  @Get('wall/:id')
  async wall(@Param() id, @Query() offset, @Query() limit, @Res() res: Response) {
    const posts = await this.postService.getWall(id, offset, limit);

    return res.json({
      status: 200,
      message: '',
      data: posts
    })
  }

  @ApiImplicitHeader({ name: 'token'})
  @ApiImplicitBody({ name: 'id', type: 'string' })
  @Delete(':id')
  async delete(@Param() id: string, @Res() res, @Req() req) {
    const userId = req['user'].userId;
    const result = await this.postService.delete(userId, id);
    if (result) {
      res.json({
        status: 200,
        message: '',
        data: { postId: id }
      });
    } else {
      res.json({
        status: 400,
        message: '',
        data: null
      })
    }
  }

  @ApiImplicitHeader({ name: 'token'})
  @Post(':id/like')
  async like(@Req() req, @Res() res, @Param() id: string) {
    const result = await this.postService.like(req.user.userId, id);
    if (result) {
      res.json({
        status: 200,
        message: '',
        data: { postId: id }
      });
    } else {
      res.json({
        status: 400,
        message: 'Invalid request',
        data: null
      });
    }
  }
}
