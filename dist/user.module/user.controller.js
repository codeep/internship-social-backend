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
const user_service_1 = require("./user.service");
const swagger_1 = require("@nestjs/swagger");
const details_dto_1 = require("./details.dto");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async getNearbyUsers(res) {
        const users = await this.userService.getNearbyUsers();
        return res.json({
            status: 200,
            message: '',
            data: users
        });
    }
    async searchUsers(search, res) {
        const users = await this.userService.searchUsers(search);
        return res.json({
            status: 200,
            message: '',
            data: users
        });
    }
    async getUser(id, res) {
        const user = await this.userService.getUser(id);
        return res.json({
            status: 200,
            message: '',
            data: user
        });
    }
    async updateUser(id, body) {
        await this.userService.saveUser(id, body);
    }
    async saveDetails(req, body, res) {
        const userId = req['user'].userId;
        const updateObject = Object.assign({}, body);
        const result = await this.userService.updateUser(userId, updateObject);
        if (result) {
            return res.json({
                status: 200,
                message: '',
                data: result
            });
        }
        else {
            return res.json({
                status: 400,
                message: 'Wrong request',
                data: null
            });
        }
    }
    async follow(req, res, id) {
        const userId = req['user'].userId;
        const result = await this.userService.follow(userId, id);
        if (result) {
            return res.json({ status: 200, message: null, data: null });
        }
        else {
            return res.json({ status: 400, message: null, data: null });
        }
    }
    async followers(req, res, id) {
        const result = await this.userService.getFollowers(id);
        if (result) {
            return res.json({ status: 200, message: null, data: result });
        }
        else {
            return res.json({ status: 400, message: 'Wrong request', data: null });
        }
    }
    async followings(req, res, id) {
        const result = await this.userService.getFollowings(id);
        if (result) {
            return res.json({ status: 200, message: null, data: null });
        }
        else {
            return res.json({ status: 400, message: 'Wrong request', data: null });
        }
    }
};
__decorate([
    swagger_1.ApiImplicitHeader({ name: 'token' }),
    common_1.Post('nearby'),
    __param(0, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getNearbyUsers", null);
__decorate([
    swagger_1.ApiImplicitHeader({ name: 'token' }),
    swagger_1.ApiImplicitQuery({
        name: 'search',
        required: false,
        type: String
    }),
    common_1.Get(),
    __param(0, common_1.Query('search')), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "searchUsers", null);
__decorate([
    swagger_1.ApiImplicitHeader({ name: 'token' }),
    common_1.Get(':id'),
    __param(0, common_1.Param('id')), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUser", null);
__decorate([
    swagger_1.ApiImplicitHeader({ name: 'token' }),
    common_1.Put(':id'),
    __param(0, common_1.Param('id')), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUser", null);
__decorate([
    swagger_1.ApiImplicitHeader({ name: 'token' }),
    common_1.Post('details'),
    __param(0, common_1.Req()), __param(1, common_1.Body()), __param(2, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, details_dto_1.DetailsDto, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "saveDetails", null);
__decorate([
    swagger_1.ApiImplicitHeader({ name: 'token' }),
    swagger_1.ApiImplicitParam({ name: 'id', type: 'string', required: true }),
    common_1.Post('follow/:id'),
    __param(0, common_1.Req()), __param(1, common_1.Res()), __param(2, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "follow", null);
__decorate([
    swagger_1.ApiImplicitHeader({ name: 'token' }),
    swagger_1.ApiImplicitParam({ name: 'id', type: 'string', required: true }),
    common_1.Post('followers/:id'),
    __param(0, common_1.Req()), __param(1, common_1.Res()), __param(2, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "followers", null);
__decorate([
    swagger_1.ApiImplicitHeader({ name: 'token' }),
    swagger_1.ApiImplicitParam({ name: 'id', type: 'string', required: true }),
    common_1.Post('following/:id'),
    __param(0, common_1.Req()), __param(1, common_1.Res()), __param(2, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "followings", null);
UserController = __decorate([
    swagger_1.ApiUseTags('users'),
    common_1.Controller('users'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map