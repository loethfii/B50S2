import * as Joi from "joi";

export const PartaiSchema = Joi.object({
  nama: Joi.string().required(),
  ketua_umum: Joi.string().required(),
  visi_misi: Joi.string().required(),
  alamat: Joi.string().required(),
  image: Joi.string().required(),
});
