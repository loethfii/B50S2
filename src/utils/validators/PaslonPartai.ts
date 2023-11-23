import * as Joi from "joi";

export const PaslonPartaiSchema = Joi.object({
  paslonId: Joi.number().required(),
  partaiId: Joi.number().required(),
});
