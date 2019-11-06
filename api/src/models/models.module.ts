import { Module } from '@nestjs/common';
import { UserSchema } from '../models/users.schema';
import { PostSchema } from '../models/posts.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'UserModel', schema: UserSchema },
      { name: 'PostModel', schema: PostSchema }
    ])
  ],
  exports: [
    MongooseModule.forFeature([
      { name: 'UserModel', schema: UserSchema },
      { name: 'PostModel', schema: PostSchema }
    ])
  ]
})
export class ModelsModule {}
