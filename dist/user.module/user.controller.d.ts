import { UserService } from './user.service';
import { Response } from 'express';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getNearbyUsers(res: Response): Promise<Response>;
    searchUsers(search: any, res: Response): Promise<Response>;
    getUser(id: string, res: Response): Promise<Response>;
    updateUser(id: string, body: any): Promise<void>;
    saveDetails(req: any, body: any, res: Response): Promise<void>;
    follow(req: any, res: any, id: any): Promise<any>;
}
