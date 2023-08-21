import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const apiKey = request.headers['x-api-key'];

    if (!apiKey) {
      return true;
    }

    try {
      const { userId } = this.jwtService.verify(apiKey);
      if (!userId) throw new ForbiddenException('Invalid API key.');
      const dbUser = await this.usersService.findOne(userId);
      request.user = dbUser;
      return true;
    } catch (error) {
      throw new ForbiddenException(
        `The provided API key is not valid. Please generate a new one. Alternatively, if you want to use the API with free rate limiting, remove the key from the headers.`,
      );
    }
  }
}