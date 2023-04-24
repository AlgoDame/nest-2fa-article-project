import * as Joi from 'joi';

export const set2faSchema = Joi.object({
  set_2fa: Joi.boolean().required(),
});
