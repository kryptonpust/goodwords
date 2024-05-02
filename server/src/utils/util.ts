import { BadRequestException } from '@nestjs/common';
import { MONTH_NAMES } from './constants';

export const assertNotEmpty = (obj: object) => {
  if (Object.keys(obj).length === 0) {
    throw new BadRequestException('Empty Request Body');
  }
};

export function convertISOToCustomFormat(isoDate: Date) {
  const date = new Date(isoDate);
  const monthNames = MONTH_NAMES;
  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();

  return `${monthNames[monthIndex]} ${day}, ${year}`;
}
