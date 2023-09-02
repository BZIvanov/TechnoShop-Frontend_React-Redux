import * as Joi from 'joi';
import { Environment } from '../../constants/environment';

export const configurationValidationSchema = Joi.object({
  NODE_ENV: Joi.string().valid(...Object.values(Environment)),
  APP_PORT: Joi.number().required(),
  DATABASE_HOST: Joi.string().required(),
  DATABASE_PORT: Joi.number().required(),
  DATABASE_USERNAME: Joi.string().required(),
  DATABASE_PASSWORD: Joi.string().required(),
  DATABASE_NAME: Joi.string().required(),
  REDIS_HOST: Joi.string().required(),
  REDIS_PORT: Joi.number().required(),
  SESSION_SECRET: Joi.string().required(),
});
