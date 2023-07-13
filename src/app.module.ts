import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { XTransferModule } from './x-transfer/x-transfer.module';
import { AssetsModule } from './assets/assets.module';

@Module({
  imports: [XTransferModule, AssetsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
