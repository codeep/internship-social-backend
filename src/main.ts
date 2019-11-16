import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,  { cors: true });

  const options = new DocumentBuilder()
    .setTitle('Internship backend example')
    .setVersion('1.0')
    .addTag('auth')
    .addTag('users')
    .addTag('posts')
    .setSchemes('https', 'http')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
