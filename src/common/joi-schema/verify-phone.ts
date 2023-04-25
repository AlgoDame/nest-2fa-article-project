import * as Joi from 'joi';

export const verifyPhoneSchema = Joi.object({
  verify: Joi.boolean().valid(true).required(),
});
