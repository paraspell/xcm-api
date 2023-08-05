import { Controller, Get, Redirect } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  @Redirect('https://github.com/paraspell/xcm-api', 301)
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  root() {}
}
