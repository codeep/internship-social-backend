import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { ModelsModule } from '../models/models.module';
import { UserDto } from './user.dto';

@Module({
  imports: [ModelsModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
