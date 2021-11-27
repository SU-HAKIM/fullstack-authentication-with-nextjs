import Joi from "@hapi/joi";

export const validateRegisterData = Joi.object({
  username: Joi.string().trim().lowercase().required(),
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().required(),
});

export const validateLoginData = Joi.object({
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().required(),
});
