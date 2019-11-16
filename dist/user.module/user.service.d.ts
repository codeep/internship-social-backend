import { Model } from 'mongoose';
export declare class UserService {
    private readonly userModel;
    constructor(userModel: Model);
    getNearbyUsers(): Promise<any>;
    searchUsers(search: any): Promise<any>;
    getUser(id: any): Promise<any>;
    saveUser(id: any, body: any): Promise<void>;
    updateUser(id: any, body: any): Promise<any>;
    follow(followerId: any, followingId: any): Promise<[any, any]>;
    getFollowers(userId: any): Promise<any>;
    getFollowings(userId: any): Promise<any>;
}
