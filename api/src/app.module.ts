import { Module, MiddlewareConsumer } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth.module/auth.module';
import { PostModule } from './post.module/post.module';
import { UserModule } from './user.module/user.module';
import { AuthMiddleware } from './middlewares/auth.middleware';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://webandweb:webandweb@ds045632.mongolab.com:45632/heroku_gl2x2zpj', { useNewUrlParser: true, useUnifiedTopology: true }),
    AuthModule,
    PostModule,
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes('/user', '/posts');
  }
}
