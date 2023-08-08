import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const apiKey = request.headers['x-api-key'];

    if (!apiKey) {
      return true;
    }

    try {
      const decoded = this.jwtService.verify(apiKey);
      request.user = decoded;
      return true;
    } catch (error) {
      throw new ForbiddenException(
        `The provided API key is not valid. Please generate a new one. Alternatively, if you want to use the API with free rate limiting, remove the key from the headers.`,
      );
    }
  }
}
