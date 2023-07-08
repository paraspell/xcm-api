import { Controller, Get, Query } from '@nestjs/common';
import { XTransferService } from './x-transfer.service';
import { XTransferDto } from './dto/XTransferDto';

@Controller('x-transfer')
export class XTransferController {
  constructor(private readonly xTransferService: XTransferService) {}

  @Get()
  generateXcmCall(@Query() queryParams: XTransferDto) {
    return this.xTransferService.generateXcmCall(queryParams);
  }
}
