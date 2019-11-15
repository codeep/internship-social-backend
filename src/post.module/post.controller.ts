import { Controller, Post, Body, Param, Delete, Get, Query, Res, Req } from '@nestjs/common';
import { PostService } from './post.service';
import { ObjectId } from 'mongoose';
import { PostDto } from './post.dto';
import { ApiUseTags, ApiImplicitHeader, ApiImplicitBody, ApiImplicitParam, ApiImplicitQuery } from '@nestjs/swagger';
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
  @ApiImplicitParam({ name: 'id' })
  @ApiImplicitQuery({ name: 'offset' })
  @ApiImplicitQuery({ name: 'limit' })
  @Get('wall/:id')
  async wall(@Param() id, @Query() query, @Res() res: Response) {
    const posts = await this.postService.getWall(id, query.offset || 0, query.limit || 10);

    return res.json({
      status: 200,
      message: '',
      data: posts
    })
  }

  @ApiImplicitHeader({ name: 'token'})
  @ApiImplicitParam({ name: 'id' })
  @Delete(':id')
  async delete(@Req() req, @Res() res, @Param() id: string) {
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
  @ApiImplicitParam({ name: 'id' })
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
