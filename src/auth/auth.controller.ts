import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('generate')
  generateApiKey(@Body('recaptchaResponse') recaptcha: string) {
    return this.authService.generateApiKey(recaptcha);
  }
}
