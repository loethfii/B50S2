import Joi = require("joi");

export const PemiluNewsSchema = Joi.object({
  title: Joi.string().required(),
  author: Joi.string().required(),
  image: Joi.string().required(),
  description: Joi.string().required(),
  posted_at: Joi.date().required(),
});
