import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { XTransferModule } from './x-transfer/x-transfer.module';
import { AssetsModule } from './assets/assets.module';
import { ChannelsModule } from './channels/channels.module';
import { PalletsModule } from './pallets/pallets.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { AuthGuard } from './auth/auth.guard';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    XTransferModule,
    AssetsModule,
    ChannelsModule,
    PalletsModule,
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
    ThrottlerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        ttl: config.get('RATE_LIMIT_TTL_SEC'),
        limit: (context) => {
          const request = context.switchToHttp().getRequest();
          return request.user
            ? config.get('RATE_LIMIT_REQ_COUNT_AUTH')
            : config.get('RATE_LIMIT_REQ_COUNT_PUBLIC');
        },
      }),
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
      renderPath: '/generate-api-key',
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
  ],
})
export class AppModule {}
