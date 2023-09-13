import { Controller, Post, Delete, Query, Req } from '@nestjs/common';
import { ChannelsService } from './channels.service';
import { OpenChannelDto } from './dto/open-channel.dto';
import { CloseChannelDto } from './dto/close-channel.dto';
import { AnalyticsService } from '../analytics/analytics.service';
import { EventName } from '../analytics/EventName';

@Controller('hrmp/channels')
export class ChannelsController {
  constructor(
    private channelsService: ChannelsService,
    private analyticsService: AnalyticsService,
  ) {}

  @Post()
  openChannel(@Query() openChannelDto: OpenChannelDto, @Req() req) {
    const { ...properties } = openChannelDto;
    this.analyticsService.track(EventName.OPEN_CHANNEL, req, properties);
    return this.channelsService.openChannel(openChannelDto);
  }

  @Delete()
  closeChannel(@Query() closeChannelDto: CloseChannelDto, @Req() req) {
    const { ...properties } = closeChannelDto;
    this.analyticsService.track(EventName.CLOSE_CHANNEL, req, properties);
    return this.channelsService.closeChannel(closeChannelDto);
  }
}
