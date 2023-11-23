import Joi = require("joi");

export const PaslonSchema = Joi.object({
  nama: Joi.string().required(),
  nomor_urut: Joi.string().required(),
  visi_misi: Joi.string().required(),
  image: Joi.string().required(),
});
