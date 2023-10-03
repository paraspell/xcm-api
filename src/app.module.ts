import { HttpException, HttpStatus, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { XTransferModule } from './x-transfer/x-transfer.module';
import { AssetsModule } from './assets/assets.module';
import { ChannelsModule } from './channels/channels.module';
import { PalletsModule } from './pallets/pallets.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { AuthGuard } from './auth/auth.guard';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users/users.service';
import { AnalyticsModule } from './analytics/analytics.module';
import { SentryInterceptor, SentryModule } from '@ntegral/nestjs-sentry';
import { sentryConfig } from './config/sentry.config';
import { typeOrmConfig } from './config/typeorm.config';
import { throttlerConfig } from './config/throttler.config';

@Module({
  imports: [
    AnalyticsModule,
    XTransferModule,
    AssetsModule,
    ChannelsModule,
    PalletsModule,
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: typeOrmConfig,
    }),
    ThrottlerModule.forRootAsync({
      inject: [ConfigService, UsersService],
      useFactory: throttlerConfig,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
      serveRoot: '/app',
    }),
    SentryModule.forRootAsync({
      inject: [ConfigService],
      useFactory: sentryConfig,
    }),
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useFactory: () =>
        new SentryInterceptor({
          filters: [
            {
              type: HttpException,
              filter: (exception: HttpException) =>
                HttpStatus.INTERNAL_SERVER_ERROR > exception.getStatus(),
            },
          ],
        }),
    },
  ],
})
export class AppModule {}
