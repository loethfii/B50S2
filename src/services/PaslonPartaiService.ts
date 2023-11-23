import { Request, Response } from "express";
import { PaslonPartai } from "../entities/paslon_partai";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";

export default new (class PaslonPartaiService {
  private readonly paslonPartaiRepository: Repository<PaslonPartai> =
    AppDataSource.getRepository(PaslonPartai);

  async AddPaslonPartai(req: Request, res: Response): Promise<Response> {
    try {
      const reqBody = req.body;
      const paslonPartai = new PaslonPartai();
      paslonPartai.paslonId = reqBody.paslonId;
      paslonPartai.partaiId = reqBody.partaiId;

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
