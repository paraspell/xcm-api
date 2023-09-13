import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { HigherRequestLimitDto } from './dto/HigherRequestLimitDto';
import { AnalyticsService } from '../analytics/analytics.service';
import { EventName } from '../analytics/EventName';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private analyticsService: AnalyticsService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('generate')
  generateApiKey(@Body('recaptchaResponse') recaptcha: string, @Req() req) {
    this.analyticsService.track(EventName.GENERATE_API_KEY, req);
    return this.authService.generateApiKey(recaptcha);
  }

  @HttpCode(HttpStatus.OK)
  @Post('higher-request-limit-form')
  async submitHigherRequestLimitForm(
    @Body() higherRequestLimitDto: HigherRequestLimitDto,
    @Res() res,
  ) {
    await this.authService.submitHigherRequestLimitForm(higherRequestLimitDto);
    return res.redirect('/app/higher-request-limit/submit-success.html');
  }
}
