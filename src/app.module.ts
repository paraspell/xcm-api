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
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { UsersService } from './users/users.service';

@Module({
  imports: [
    XTransferModule,
    AssetsModule,
    ChannelsModule,
    PalletsModule,
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('DB_HOST'),
        port: config.get('DB_PORT'),
        username: config.get('DB_USER'),
        password: config.get('DB_PASS'),
        database: config.get('DB_NAME'),
        entities: [User],
        synchronize: true,
      }),
    }),
    ThrottlerModule.forRootAsync({
      inject: [ConfigService, UsersService],
      useFactory: (config: ConfigService) => ({
        ttl:
          process.env.NODE_ENV === 'test'
            ? 0
            : config.get('RATE_LIMIT_TTL_SEC'),
        limit: (context) => {
          const request = context.switchToHttp().getRequest();
          if (request.user && request.user.requestLimit) {
            return request.user.requestLimit;
          }
          return request.user
            ? config.get('RATE_LIMIT_REQ_COUNT_AUTH')
            : config.get('RATE_LIMIT_REQ_COUNT_PUBLIC');
        },
      }),
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
      serveRoot: '/app',
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
