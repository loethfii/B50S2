import { Paslon } from "../entities/Paslon";
import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Repository } from "typeorm";
import cloudinary from "../middleware/cloudinary";
import { PaslonSchema } from "../utils/validators/validators";
import { Partai } from "../entities/Partai";

export default new (class PaslonServices {
  private readonly paslonRepository: Repository<Paslon> =
    AppDataSource.getRepository(Paslon);

  private readonly partaiRepository: Repository<Partai> =
    AppDataSource.getRepository(Partai);

  async FindAll(req: Request, res: Response): Promise<Response> {
    try {
      const paslonViews = await this.paslonRepository.find({
        order: {
          id: "desc",
        },
        relations: ["paslonsRel"],
      });

      const paslonDataPromises = paslonViews.map(async (paslon) => {
        const dataPartai = await Promise.all(
          paslon.paslonsRel.map(async (paslonPartai) => {
            const data = await this.partaiRepository.findOne({
              where: {
                id: paslonPartai.partaiId,
              },
            });
            return {
              partai_data:
                {
                  nama_partai: data?.nama,
                } || null,
            };
          })
        );

        return {
          id: paslon.id,
          nama: paslon.nama,
          nomor_urut: paslon.nomor_urut,
          visi_misi: paslon.visi_misi,
          image: paslon.image,
          partai_pengusung: dataPartai,
        };
      });

      const paslonData = await Promise.all(paslonDataPromises);

      return res.status(200).json({
        status: 200,
        message: `${paslonData.length} data found`,
        data: paslonData,
      });
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async FindOne(req: Request, res: Response): Promise<Response> {
    try {
      const id = parseInt(req.params.id);

      const paslon = await this.paslonRepository.findOne({
        where: {
          id: id,
        },
        relations: ["paslonsRel"],
      });

      const dataPaslonPromise = paslon.paslonsRel.map(async (partai) => {
        const partai_data = await this.partaiRepository.findOne({
          where: {
            id: partai.partaiId,
          },
        });

        return {
          nama_partai: partai_data?.nama,
        };
      });

      const partaiGetRel = await Promise.all(dataPaslonPromise);
      const resPaslonData = {
        id: paslon.id,
        nama: paslon.nama,
        nomor_urut: paslon.nomor_urut,
        visi_misi: paslon.visi_misi,
        image: paslon.image,
        partai_pengusung: partaiGetRel,
      };

      // relations: ["paslonsRel"],

      return res.status(200).json({
        status: 200,
        message: "success get data",
        data: resPaslonData,
      });
    } catch (error) {
      return res.status(500).json(error);
    }
  }
  async AddPaslon(req: Request, res: Response): Promise<Response> {
    try {
      const newData = {
        nama: req.body.nama,
        nomor_urut: req.body.nomor_urut,
        visi_misi: req.body.visi_misi,
        image: res.locals.filename,
      };

      const { error, value } = PaslonSchema.validate(newData);
      if (error) {
        return res.status(400).json({
          message: error.message,
        });
      }

      const cloudinaryResponse = await cloudinary.destination(value.image);

      const paslon = new Paslon();
      paslon.nama = value.nama;
      paslon.nomor_urut = value.nomor_urut;
      paslon.visi_misi = value.visi_misi;
      paslon.image = cloudinaryResponse;

      const obj = await this.paslonRepository.save(paslon);
      return res.status(200).json({
        message: "Success Add",
        data: obj,
      });
    } catch (error) {
      return res.status(500).json({
        message: error,
      });
    }
  }

  async Update(req: Request, res: Response): Promise<Response> {
    try {
      const updateData = {
        nama: req.body.nama,
        nomor_urut: req.body.nomor_urut,
        visi_misi: req.body.visi_misi,
        image: res.locals.filename,
      };
      const id = parseInt(req.params.id);

      const { error, value } = PaslonSchema.validate(updateData);
      if (error) {
        return res.status(400).json({
          message: error.message,
        });
      }

      const cloudinaryResponse = await cloudinary.destination(value.image);

      const paslon = new Paslon();
      paslon.nama = value.nama;
      paslon.nomor_urut = value.nomor_urut;
      paslon.visi_misi = value.visi_misi;
      paslon.image = cloudinaryResponse;

      await this.paslonRepository.update(id, paslon);

      return res.status(200).json({
        message: "Success Update",
        data: paslon,
      });
    } catch (error) {
      return res.status(500).json({
        message: error,
      });
    }
  }

  async Delete(req: Request, res: Response): Promise<Response> {
    try {
      const id = parseInt(req.params.id);
      await this.paslonRepository.delete({
        id,
      });

      res.status(200).json({
        status: 200,
        message: "success delete",
      });
    } catch (error) {
      return res.status(500).json({
        message: error,
      });
    }
  }
})();
