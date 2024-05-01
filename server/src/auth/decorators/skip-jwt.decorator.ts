import { SetMetadata } from '@nestjs/common/decorators';

export const SKIP_JWT_KEY = 'SkipJWT';
export const SkipJWT = () => SetMetadata(SKIP_JWT_KEY, true);
