import Joi = require("joi");

export const UserSchema = Joi.object({
  full_name: Joi.string().required(),
  alamat: Joi.string().required(),
  jenis_kelamin: Joi.string().required(),
  username: Joi.string().required(),
  role: Joi.string().required(),
  password: Joi.string()
    .required()
    .regex(/[0-9a-zA-Z]*\d[0-9a-zA-Z]*/),
});
