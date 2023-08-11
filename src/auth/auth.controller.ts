import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { HigherRequestLimitDto } from './dto/HigherRequestLimitDto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('generate')
  generateApiKey(@Body('recaptchaResponse') recaptcha: string) {
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
