import { ReplOptions } from "repl";
import { Voters } from "../entities/Voters";
import { Paslon } from "../entities/Paslon";
import { User } from "../entities/User";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Request, Response } from "express";
import auth from "../middleware/auth";
import * as jwt from "jsonwebtoken";
import { VoterSchema } from "../utils/validators/Voters";

export default new (class VoterService {
  private readonly votersRepository: Repository<Voters> =
    AppDataSource.getRepository(Voters);

  private readonly paslonRepository: Repository<Paslon> =
    AppDataSource.getRepository(Paslon);

  async FindAll(req: Request, res: Response): Promise<Response> {
    try {
      const listVoter = await this.votersRepository.find({
        relations: ["user", "paslon"],
      });

      const listVoterPromises = listVoter.map((voter) => {
        return {
          nama: voter.user.full_name,
          alamat: voter.user.alamat,
          jenis_kelamin: voter.user.jenis_kelamin,
          paslon_name: voter.paslon.nama,
          no_urut: voter.paslon.nomor_urut,
        };
      });
      return res.status(200).json({
        status: 200,
        message: `Success Get data`,
        data: listVoterPromises,
      });
    } catch (error) {
      return res.status(500).json({
        message: error,
      });
    }
  }

  async VotePaslon(req: Request, res: Response) {
    try {
      const tokenHeader = req.headers;
      const jwtDecode = tokenHeader.authorization.startsWith("Bearer ")
        ? auth.decodeWithoutBarier(tokenHeader.authorization)
        : jwt.decode(tokenHeader.authorization);

      const dataVote = req.body;

      const { error, value } = VoterSchema.validate(dataVote);
      if (error) return res.status(400).json(error.message);

      const newVoters = new Voters();
      newVoters.userId = jwtDecode.userId;
      newVoters.paslonId = value.paslonId;

      await this.votersRepository.save(newVoters);

      return res.status(200).json({
        message: "Success",
        data: newVoters,
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }

  async CountDataVoters(req: Request, res: Response): Promise<Response> {
    try {
      const allDataVoters = await this.paslonRepository.find();

      const countVoterPromises = allDataVoters.map(async (paslon) => {
        const totPemilih = await this.votersRepository.count();
        const totPilihan = await this.votersRepository.count({
          where: {
            paslonId: paslon.id,
          },
        });

        const presentase = Math.round((totPilihan / totPemilih) * 100);
        return {
          nomer_urut: paslon.nomor_urut,
          paslon_name: paslon.nama,
          jml_pemilih: await this.votersRepository.count({
            where: {
              paslonId: paslon.id,
            },
          }),
          presentase: `${presentase}%`,
        };
      });

      const allDataVotersCount = await Promise.all(countVoterPromises);

      return res.status(200).json({
        status: 200,
        message: `Success Get data`,
        data: allDataVotersCount,
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }
})();
