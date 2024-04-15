import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configSchema } from './libs/config/schema.config';
import { UserModule } from './modules/user/user.module';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { getRedisConfig } from './libs/config/redis.config';
import { join } from 'path';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { AuthModule } from './modules/auth/auth.module';
import { AuthMiddleware } from './libs/middlewares/auth.middleware';
import { InternalJwtModule } from './modules/jwt/jwt.module';
import { ScheduleModule } from '@nestjs/schedule';
import { AutoCleanerModule } from './modules/auto-cleaner/auto-cleaner.module';
import { AdsModule } from './modules/ads/ads.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { SubCategoriesModule } from './modules/sub-categories/sub-categories.module';
import { RegionsModule } from './modules/regions/regions.module';
import { CitiesModule } from './modules/cities/cities.module';
import { FilesModule } from './modules/files/files.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, validationSchema: configSchema }),
    RedisModule.forRootAsync(getRedisConfig()),
    MailerModule.forRoot({
      transports: {},
      template: {
        dir: join(__dirname, './libs/templates'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
    ScheduleModule.forRoot(),
    InternalJwtModule,
    AuthModule,
    AutoCleanerModule,
    AdsModule,
    CategoriesModule,
    CitiesModule,
    FilesModule,
    RegionsModule,
    SubCategoriesModule,
    UserModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
