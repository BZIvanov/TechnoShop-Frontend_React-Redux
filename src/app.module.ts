import { APP_GUARD } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import envConfig from './config/env-config/env-config';
import { configurationValidationSchema } from './config/env-config/configuration-validation-schema';
import { CustomThrottlerGuard } from './guards/custom-throttler.guard';
import { MoviesModule } from './modules/movies/movies.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [envConfig],
      validationSchema: configurationValidationSchema,
      envFilePath: [`.env.${process.env.NODE_ENV || 'development'}`],
    }),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 100,
    }),
    MoviesModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: CustomThrottlerGuard,
    },
  ],
})
export class AppModule {}
