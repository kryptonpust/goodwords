import { BadRequestException } from '@nestjs/common';

export const assertNotEmpty = (obj: object) => {
  if (Object.keys(obj).length === 0) {
    throw new BadRequestException('Empty Request Body');
  }
};

export function convertISOToCustomFormat(isoDate: Date) {
  const date = new Date(isoDate);
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();

  return `${monthNames[monthIndex]} ${day}, ${year}`;
}
