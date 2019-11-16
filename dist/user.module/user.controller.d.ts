import { UserService } from './user.service';
import { Response } from 'express';
import { DetailsDto } from './details.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getNearbyUsers(res: Response): Promise<Response>;
    searchUsers(search: any, res: Response): Promise<Response>;
    getUser(id: string, res: Response): Promise<Response>;
    updateUser(id: string, body: any): Promise<void>;
    saveDetails(req: any, body: DetailsDto, res: Response): Promise<Response>;
    follow(req: any, res: any, id: any): Promise<any>;
    followers(req: any, res: any, id: any): Promise<any>;
    followings(req: any, res: any, id: any): Promise<any>;
}
