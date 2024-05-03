import { BadRequestException } from '@nestjs/common';

export const assertNotEmpty = (obj: object) => {
  if (Object.keys(obj).length === 0) {
    throw new BadRequestException('Empty Request Body');
  }
};
