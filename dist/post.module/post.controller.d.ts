import { PostService } from './post.service';
import { PostDto } from './post.dto';
import { Response } from 'express';
export declare class PostController {
    private readonly postService;
    constructor(postService: PostService);
    create(req: any, body: PostDto, res: any): Promise<any>;
    feed(queryParams: any, req: any, res: Response): Promise<Response>;
    wall(id: any, offset: any, limit: any, res: Response): Promise<Response>;
    delete(req: any, res: any, id: string): Promise<void>;
    like(req: any, res: any, id: string): Promise<void>;
}
