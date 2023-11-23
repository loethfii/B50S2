import { ReplOptions } from "repl";
import { Voters } from "../entities/Voters";
import { Paslon } from "../entities/Paslon";
import { User } from "../entities/User";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Request, Response } from "express";
import auth from "../middleware/auth";
import * as jwt from "jsonwebtoken";

export default new (class VoterService {
  private readonly votersRepository: Repository<Voters> =
    AppDataSource.getRepository(Voters);

  async FindAll(req: Request, res: Response): Promise<Response> {
    try {
      const listVoter = await this.votersRepository.find({
        relations: ["user", "paslon"],
      });

      const listVoterRefactor = listVoter.map((voter) => {
        return {
          nama: voter.user.full_name,
          alamat: voter.user.alamat,
          jenis_kelamin: voter.user.jenis_kelamin,
          paslon_name: voter.paslon.nama,
        };
      });
      return res.status(200).json({
        status: 200,
        message: `Success Get data`,
        data: listVoterRefactor,
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

      const newVoters = new Voters();
      newVoters.userId = jwtDecode.userId;
      newVoters.paslonId = dataVote.paslonId;

      await this.votersRepository.save(newVoters);

      return res.status(200).json({
        message: "Success",
        data: newVoters,
      });
    } catch (error) {
      return res.status(500).json({
        message: error,
      });
    }
  }
})();
