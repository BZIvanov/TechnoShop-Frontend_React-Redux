import * as Joi from 'joi';

export const configurationValidationSchema = Joi.object({
  NODE_ENV: Joi.string().valid('test', 'development', 'staging', 'production'),
  APP_PORT: Joi.number().required(),
  DATABASE_HOST: Joi.string().required(),
  DATABASE_PORT: Joi.number().required(),
  DATABASE_USERNAME: Joi.string().required(),
  DATABASE_PASSWORD: Joi.string().required(),
  DATABASE_NAME: Joi.string().required(),
  SESSION_SECRET: Joi.string().required(),
});
