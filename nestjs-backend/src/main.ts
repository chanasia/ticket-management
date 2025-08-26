import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api', {
    exclude: ['/swagger-ui']
  });

  const config = new DocumentBuilder()
    .setVersion('1.0')
    .addTag('tickets')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger-ui', app, documentFactory);

  // if (process.env.NODE_ENV !== 'production') {
  //   const config = new DocumentBuilder()
  //     .setVersion('1.0')
  //     .addTag('tickets')
  //     .build();
  //   const documentFactory = () => SwaggerModule.createDocument(app, config);
  //   SwaggerModule.setup('api', app, documentFactory);
  // }

  app.enableCors({
    origin: process.env.FRONTEND_URL || '',
    credentials: true,
  });

  await app.listen(process.env.BACKEND_PORT ?? 3000);
}
bootstrap();
