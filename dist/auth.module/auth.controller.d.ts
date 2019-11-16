import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './auth.dto';
import { Response } from 'express';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(requestBody: LoginDto, res: Response): Promise<Response>;
    register(requestBody: RegisterDto, res: Response): Promise<Response>;
}
