import { Controller, Get, Param } from '@nestjs/common';
import { PalletsService } from './pallets.service';

@Controller('pallets')
export class PalletsController {
  constructor(private readonly palletsService: PalletsService) {}

  @Get(':node/default')
  getDefaultPallet(@Param('node') node: string) {
    return this.palletsService.getDefaultPallet(node);
  }

  @Get(':node')
  getPallets(@Param('node') node: string) {
    return this.palletsService.getPallets(node);
  }
}
