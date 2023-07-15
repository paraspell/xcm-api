import { Module } from '@nestjs/common';
import { PalletsService } from './pallets.service';
import { PalletsController } from './pallets.controller';

@Module({
  controllers: [PalletsController],
  providers: [PalletsService],
})
export class PalletsModule {}
