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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const common_1 = require("@nestjs/common");
const sha1 = require('sha1');
const mongoose_2 = require("@nestjs/mongoose");
let AuthService = class AuthService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async login(email, password) {
        return this.userModel.findOne({ email, password: this.hashPassword(password) }, '-password');
    }
    async register(registerData) {
        return this.userModel
            .findOne({ email: registerData.email }, '-password')
            .then(user => {
            if (user) {
                return Promise.reject();
            }
            registerData.password = this.hashPassword(registerData.password);
            return this.userModel.create(registerData);
        });
    }
    async confirm(token) {
        return this.userModel
            .findOneAndUpdate({ confirmToken: token }, { confirmed: 1 })
            .then(user => {
            if (!user) {
                return Promise.reject();
            }
            return Promise.resolve(user);
        });
    }
    async recover(email) {
    }
    hashPassword(password) {
        return sha1(`6f9b9af3cd6e8b8a73c2cdced37fe9f59226e27d${password}d72e62295f9ef73decdc2c37a8b8e6dc3fa9b9f6`);
    }
};
AuthService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_2.InjectModel('UserModel')),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_1.Model !== "undefined" && mongoose_1.Model) === "function" ? _a : Object])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map