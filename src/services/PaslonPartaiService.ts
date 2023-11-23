import { Request, Response } from "express";
import { PaslonPartai } from "../entities/paslon_partai";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { PaslonPartaiSchema } from "../utils/validators/PaslonPartai";

export default new (class PaslonPartaiService {
  private readonly paslonPartaiRepository: Repository<PaslonPartai> =
    AppDataSource.getRepository(PaslonPartai);

  async AddPaslonPartai(req: Request, res: Response): Promise<Response> {
    try {
      const reqBody = req.body;

      const { error, value } = PaslonPartaiSchema.validate(reqBody);
      if (error) return res.status(400).json(error);

      const checkPartaiPengusung = await this.paslonPartaiRepository.count({
        where: {
          partaiId: value.partaiId,
        },
      });
      if (checkPartaiPengusung > 0)
        return res.status(400).json({
          message: "Partai hanya boleh mengusung 1 paslon",
        });

      const paslonPartai = new PaslonPartai();
      paslonPartai.paslonId = value.paslonId;
      paslonPartai.partaiId = value.partaiId;

      const obj = await this.paslonPartaiRepository.save(paslonPartai);
      return res.status(200).json({
        message: "Success Add",
        data: obj,
      });
    } catch (error) {
      return res.status(500).json(error);
    }
  }
})();
