"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const auth_dto_1 = require("./auth.dto");
const swagger_1 = require("@nestjs/swagger");
const jsonwebtoken = require('jsonwebtoken');
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async login(requestBody, res) {
        const user = await this.authService.login(requestBody.email, requestBody.password);
        if (user) {
            const jwt = jsonwebtoken.sign({
                userId: user.id
            }, '3m2b0pu3jdg2c48j6e78', { expiresIn: 600 });
            return res.json({
                status: 200,
                message: '',
                data: {
                    user,
                    token: jwt
                }
            });
        }
        else {
            return res.json({
                status: 404,
                message: 'User is not found',
                data: null
            });
        }
    }
    async register(requestBody, res) {
        try {
            const user = await this.authService.register(requestBody);
            if (user) {
                return res.json({
                    status: 201,
                    message: '',
                    data: user
                });
            }
        }
        catch (e) {
            return res.json({
                status: 409,
                message: 'User already exists',
                data: null
            });
        }
    }
};
__decorate([
    common_1.Post('login'),
    __param(0, common_1.Body()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.LoginDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    common_1.Post('register'),
    __param(0, common_1.Body()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.RegisterDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
AuthController = __decorate([
    swagger_1.ApiUseTags('auth'),
    common_1.Controller('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map