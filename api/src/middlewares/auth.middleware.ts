import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
const jsonwebtoken = require('jsonwebtoken');

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: Function) {
    if (req.headers['token']) {
      jsonwebtoken.verify((req.headers['token'] as string).replace('Bearer ', ''),
        '3m2b0pu3jdg2c48j6e78',
        (err, data) => {
          err && res.json({ status: 401, message: 'Invalid token', data: null }) ;
          if (data) {
            req['user'] = data;
          }
        });
    }
    next();
  }
}
