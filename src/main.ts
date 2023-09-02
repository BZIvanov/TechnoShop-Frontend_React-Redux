import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { createClient } from 'redis';
import RedisStore from 'connect-redis';
import * as session from 'express-session';
import * as passport from 'passport';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { Environment } from './constants/environment';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  const redistHost = configService.get<string>('redis.host');
  const redistPort = configService.get<number>('redis.port');
  const redisClient = createClient({
    url: `redis://${redistHost}:${redistPort}`,
  });
  redisClient.connect().catch(console.error);

  const redisStore = new RedisStore({
    client: redisClient,
    prefix: 'myapp:',
  });

  app.use(
    session({
      store: redisStore,
      secret: configService.get<string>('session.secret'),
      resave: false,
      saveUninitialized: false,
      cookie: {
        path: '/',
        httpOnly: true,
        secure:
          configService.get<string>('app.environment') ===
          Environment.production,
        maxAge: 1000 * 60 * 60,
      },
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());

  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );

  const documentConfig = new DocumentBuilder()
    .setTitle('Marvelous Movies App API')
    .setDescription('Movies List')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, documentConfig);
  SwaggerModule.setup('api', app, document);

  const appPort = configService.get<number>('app.port');
  await app.listen(appPort);
}
bootstrap();
