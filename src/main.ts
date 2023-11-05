import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //use body parser to add
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  //change default url to '/api'
  app.setGlobalPrefix('/api');
  const config = new DocumentBuilder()
    .setTitle('Nest JS API')
    .setDescription('Simple test API with NestJS')
    .setVersion('1.0')
    .addBasicAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'Authorization',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);
  await app.listen(4000);

  // const server = app.getHttpServer();
  // const router = server._events.request._router;

  // const availableRoutes: [] = router.stack
  //   .map((layer) => {
  //     if (layer.route) {
  //       return {
  //         route: {
  //           path: layer.route?.path,
  //           method: layer.route?.stack[0].method,
  //         },
  //       };
  //     }
  //   })
  //   .filter((item) => item !== undefined);
  // console.log(availableRoutes);
}
bootstrap();
