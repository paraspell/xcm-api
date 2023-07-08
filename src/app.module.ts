import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { XTransferModule } from './x-transfer/x-transfer.module';

@Module({
  imports: [XTransferModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
