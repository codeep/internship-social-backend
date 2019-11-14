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
const post_service_1 = require("./post.service");
const post_dto_1 = require("./post.dto");
const swagger_1 = require("@nestjs/swagger");
let PostController = class PostController {
    constructor(postService) {
        this.postService = postService;
    }
    async create(req, body, res) {
        const userId = req.user.userId;
        const savedPost = await this.postService.create(userId, body);
        if (savedPost) {
            return res.json({
                status: 201,
                message: '',
                data: savedPost
            });
        }
        else {
            return res.json({
                status: 400,
                message: 'Invalid request',
                data: null
            });
        }
    }
    async feed(queryParams, req, res) {
        const userId = req.user.userId;
        const posts = await this.postService.getFeed(userId, queryParams.offset, queryParams.limit);
        return res.json({
            status: 200,
            message: '',
            data: posts
        });
    }
    async wall(id, offset, limit, res) {
        const posts = await this.postService.getWall(id, offset, limit);
        return res.json({
            status: 200,
            message: '',
            data: posts
        });
    }
    async delete(req, res, id) {
        const userId = req['user'].userId;
        const result = await this.postService.delete(userId, id);
        if (result) {
            res.json({
                status: 200,
                message: '',
                data: { postId: id }
            });
        }
        else {
            res.json({
                status: 400,
                message: '',
                data: null
            });
        }
    }
    async like(req, res, id) {
        const result = await this.postService.like(req.user.userId, id);
        if (result) {
            res.json({
                status: 200,
                message: '',
                data: { postId: id }
            });
        }
        else {
            res.json({
                status: 400,
                message: 'Invalid request',
                data: null
            });
        }
    }
};
__decorate([
    swagger_1.ApiImplicitHeader({ name: 'token' }),
    common_1.Post('/'),
    __param(0, common_1.Req()), __param(1, common_1.Body()), __param(2, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, post_dto_1.PostDto, Object]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "create", null);
__decorate([
    swagger_1.ApiImplicitHeader({ name: 'token' }),
    common_1.Get('feed'),
    __param(0, common_1.Query()), __param(1, common_1.Req()), __param(2, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "feed", null);
__decorate([
    swagger_1.ApiImplicitHeader({ name: 'token' }),
    common_1.Get('wall/:id'),
    __param(0, common_1.Param()), __param(1, common_1.Query()), __param(2, common_1.Query()), __param(3, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "wall", null);
__decorate([
    swagger_1.ApiImplicitHeader({ name: 'token' }),
    common_1.Delete(':id'),
    __param(0, common_1.Req()), __param(1, common_1.Res()), __param(2, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "delete", null);
__decorate([
    swagger_1.ApiImplicitHeader({ name: 'token' }),
    common_1.Post(':id/like'),
    __param(0, common_1.Req()), __param(1, common_1.Res()), __param(2, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "like", null);
PostController = __decorate([
    swagger_1.ApiUseTags('posts'),
    common_1.Controller('posts'),
    __metadata("design:paramtypes", [post_service_1.PostService])
], PostController);
exports.PostController = PostController;
//# sourceMappingURL=post.controller.js.map