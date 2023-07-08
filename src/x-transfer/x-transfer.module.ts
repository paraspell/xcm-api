import { Module } from '@nestjs/common';
import { XTransferService } from './x-transfer.service';
import { XTransferController } from './x-transfer.controller';

@Module({
  controllers: [XTransferController],
  providers: [XTransferService],
})
export class XTransferModule {}
