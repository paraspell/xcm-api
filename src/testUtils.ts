import { Request } from '@nestjs/common';
import { createMock } from '@golevelup/ts-jest';

export const mockRequestObject = () => {
  return createMock<typeof Request>();
};
