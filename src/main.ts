import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // class validator
  app.useGlobalPipes(new ValidationPipe());

  // swagger
  const config = new DocumentBuilder()
    .setTitle('API de Proyecto PW') // Nombre de tu proyecto
    .setDescription('Documentación de la API para Autenticación y Usuarios') // Descripción real
    .setVersion('1.0')
    .addTag('auth') // Etiqueta para agrupar tu login/registro
    .addTag('users') // Etiqueta para agrupar tus usuarios
    .addBearerAuth() // ¡Súper importante para que puedas probar el token desde Swagger!
    .build();
    
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();