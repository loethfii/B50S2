import { Repository } from "typeorm";
import { Partai } from "../entities/Partai";
import { AppDataSource } from "../data-source";
import { Request, Response } from "express";
import { PartaiSchema } from "../utils/validators/Partai";
import cloudinary from "../middleware/cloudinary";
// import * as fs from "fs";

export default new (class PartaiService {
  private readonly partaiRepository: Repository<Partai> =
    AppDataSource.getRepository(Partai);
  async FindAll(req: Request, res: Response): Promise<Response> {
    try {
      const partais = await this.partaiRepository.find({
        order: {
          id: "DESC",
        },
      });
      return res.status(200).json({
        status: 200,
        message: `${partais.length} data found`,
        data: partais,
      });
    } catch (error) {
      return;
    }
  }

  async FindOne(req: Request, res: Response): Promise<Response> {
    try {
      const id = parseInt(req.params.id);
      const partai = await this.partaiRepository.findOneBy({
        id: id,
      });
      return res.status(200).json({
        status: 200,
        message: "success get data",
        data: partai,
      });
    } catch (error) {
      return;
    }
  }

  async AddPartai(req: Request, res: Response): Promise<Response> {
    try {
      const newData = {
        nama: req.body.nama,
        ketua_umum: req.body.ketua_umum,
        visi_misi: req.body.visi_misi,
        alamat: req.body.alamat,
        image: res.locals.filename,
      };

      const { error, value } = PartaiSchema.validate(newData);
      if (error) return res.status(400).json({ message: error.message });

      const cloudinaryResponse = await cloudinary.destination(value.image);

      const newPartai = new Partai();
      newPartai.nama = value.nama;
      newPartai.ketua_umum = value.ketua_umum;
      newPartai.visi_misi = value.visi_misi;
      newPartai.alamat = value.alamat;
      newPartai.image = cloudinaryResponse;

      const createPartai = await this.partaiRepository.save(newPartai);

      return res.status(201).json({
        status: 201,
        message: "Success",
        data: createPartai,
      });
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async Update(req: Request, res: Response): Promise<Response> {
    try {
      const id = parseInt(req.params.id);
      const newData = {
        nama: req.body.nama,
        ketua_umum: req.body.ketua_umum,
        visi_misi: req.body.visi_misi,
        alamat: req.body.alamat,
        image: res.locals.filename,
      };

      const { error, value } = PartaiSchema.validate(newData);
      if (error) return res.status(400).json({ message: error.message });

      const cloudinaryResponse = await cloudinary.destination(value.image);

      const updatePartai = new Partai();
      updatePartai.nama = value.nama;
      updatePartai.ketua_umum = value.ketua_umum;
      updatePartai.visi_misi = value.visi_misi;
      updatePartai.alamat = value.alamat;
      updatePartai.image = cloudinaryResponse;

      const updatedData = await this.partaiRepository.update(id, updatePartai);

      return res.status(200).json({
        status: 200,
        message: "Success",
        data: updatedData,
      });
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async Delete(req: Request, res: Response): Promise<Response> {
    try {
      const id = parseInt(req.params.id);
      const deletedData = await this.partaiRepository.delete(id);
      return res.status(200).json({
        status: 200,
        message: "Success",
        data: deletedData,
      });
    } catch (error) {
      return res.status(500).json(error);
    }
  }
})();
