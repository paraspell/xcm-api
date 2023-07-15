import { Controller, Get, Param } from '@nestjs/common';
import { PalletsService } from './pallets.service';

@Controller('pallets')
export class PalletsController {
  constructor(private readonly palletsService: PalletsService) {}

  @Get(':node/default')
  getDefaultPallet(@Param('node') node: string) {
    return this.palletsService.getDefaultPallet(node);
  }

  @Get(':node/supported')
  getSupportedPallets(@Param('node') node: string) {
    return this.palletsService.getSupportedPallets(node);
  }
}
