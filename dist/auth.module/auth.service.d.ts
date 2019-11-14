import { Model } from 'mongoose';
export declare class AuthService {
    private readonly userModel;
    constructor(userModel: Model);
    login(email: any, password: any): Promise<any>;
    register(registerData: any): Promise<any>;
    confirm(token: any): Promise<any>;
    recover(email: any): Promise<any>;
    hashPassword(password: any): any;
}
