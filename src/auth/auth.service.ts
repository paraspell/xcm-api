import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import axios from 'axios';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async generateApiKey(recaptcha: string) {
    const recaptchaSecretKey = '6LfL0oYnAAAAABX3l2hJrzxhoQZJQGfZKuUcZyTt';

    const data = {
      secret: recaptchaSecretKey,
      response: recaptcha,
    };

    const response = await axios
      .post('https://www.google.com/recaptcha/api/siteverify', null, {
        params: data,
      })
      .catch((error) => {
        throw new InternalServerErrorException(
          'Error verifying reCAPTCHA: ' + error,
        );
      });

    const verificationResult = response.data;
    if (verificationResult.success) {
      const payload = {};
      return {
        api_key: await this.jwtService.signAsync(payload),
      };
    } else {
      throw new ForbiddenException('Recaptcha verification failed');
    }
  }
}
