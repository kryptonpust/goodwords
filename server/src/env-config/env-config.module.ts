import { Module } from '@nestjs/common';
import { TypedConfigModule, dotenvLoader } from 'nest-typed-config';
import { EnvConfig, configValidator } from './env-config';

@Module({
  imports: [
    TypedConfigModule.forRoot({
      isGlobal: true,
      schema: EnvConfig,
      load: [dotenvLoader({ separator: '.' })],
      normalize(config) {
        return config;
      },
      validate: configValidator,
    }),
  ],
})
export class EnvConfigModule {}
