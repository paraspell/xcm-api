import { Controller, Post, Delete, Query } from '@nestjs/common';
import { ChannelsService } from './channels.service';
import { OpenChannelDto } from './dto/open-channel.dto';
import { CloseChannelDto } from './dto/close-channel.dto';

@Controller('hrmp/channels')
export class ChannelsController {
  constructor(private readonly channelsService: ChannelsService) {}

  @Post()
  openChannel(@Query() openChannelDto: OpenChannelDto) {
    return this.channelsService.openChannel(openChannelDto);
  }

  @Delete()
  closeChannel(@Query() closeChannelDto: CloseChannelDto) {
    return this.channelsService.closeChannel(closeChannelDto);
  }
}
