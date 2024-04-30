import { plainToClass } from 'class-transformer';
import * as Joi from 'joi';
import { JoiSchema, JoiSchemaOptions, getTypeSchema } from 'nestjs-joi';

@JoiSchemaOptions({
  allowUnknown: true, //otherwise os env creates error
  abortEarly: false, //to show all errors
  stripUnknown: true, //to remove unknown fields
})
export class EnvConfig {
  @JoiSchema(Joi.string().required())
  JWT_SECRET!: string;
  @JoiSchema(Joi.string().required())
  JWT_EXPIRES_IN!: string;
  @JoiSchema(Joi.number().required())
  SALT_ROUNDS!: number;

  @JoiSchema(Joi.string().required())
  public readonly DATABASE_URL!: string;
}

export const configValidator = (rawConfig: unknown) => {
  const config = plainToClass(EnvConfig, rawConfig);
  const { error, value } = getTypeSchema(EnvConfig).validate(config);
  if (error) {
    const reasons = error.details
      .map((detail: { message: string }) => detail.message)
      .join(', ');
    throw new Error(reasons);
  }
  return value as EnvConfig;
};
