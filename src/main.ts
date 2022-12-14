import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({whitelist:true}));

  const options = new DocumentBuilder()
  .setTitle('BackEndNestJS')
  .setDescription('Events attendance')
  .setVersion('1.0')
  .build();

  const document = SwaggerModule.createDocument(app,options);
  SwaggerModule.setup('second',app, document);

  await app.listen(3000);
}
bootstrap();
