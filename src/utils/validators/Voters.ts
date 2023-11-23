import * as Joi from "joi";

export const VoterSchema = Joi.object({
  paslonId: Joi.number().required(),
});
