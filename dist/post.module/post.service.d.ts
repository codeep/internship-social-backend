import { Model, ObjectId } from 'mongoose';
export declare class PostService {
    private readonly postModel;
    private readonly userModel;
    constructor(postModel: Model, userModel: Model);
    create(userId: any, body: any): Promise<any>;
    delete(userId: any, id: any): Promise<any>;
    like(userId: any, postId: any): Promise<any>;
    getFeed(userId: any, offset: any, limit: any): Promise<any>;
    getFollowingPosts(userId: ObjectId, offset?: number, limit?: number): Promise<any>;
    getUserPosts(userId: ObjectId, offset?: number, limit?: number): Promise<void>;
    getWall(userId: any, offset: any, limit: any): Promise<any>;
    getPost(postId: any): Promise<void>;
}
