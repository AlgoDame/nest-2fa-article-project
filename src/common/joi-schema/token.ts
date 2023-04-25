import * as Joi from 'joi';

export const tokenSchema = Joi.object({
  token: Joi.string().required(),
});
