import { User } from "../entities/User";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Request, Response } from "express";
import { UserSchema } from "../utils/validators/UserValidators";
// import { BcryptMe } from "../utils/encryption/bcrypt";
// import * as bcrypt from "bcrypt";
import BcryptMe from "../utils/encryption/bcrypt";
import Auth from "../middleware/auth";

export default new (class UserService {
  private readonly userRepository: Repository<User> =
    AppDataSource.getRepository(User);

  async ListUser(req: Request, res: Response): Promise<Response> {
    try {
      const listUser = await this.userRepository.find();
      return res.status(200).json({
        status: 200,
        message: "Success",
        data: listUser,
      });
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async RegisterUser(req: Request, res: Response): Promise<Response> {
    try {
      const userReg = req.body;

      const { error, value } = UserSchema.validate(userReg);
      if (error) return res.status(400).json({ message: error.message });

      const checkUsername = await this.userRepository.count({
        where: {
          username: value.username,
        },
      });

      if (checkUsername > 0)
        return res.status(400).json({ message: "Username already exist" });

      const hasedPassword = BcryptMe.hashPassword(value.password);

      const newUser = this.userRepository.create({
        ...value,
        password: hasedPassword,
      });

      const createUser = await this.userRepository.save(newUser);

      res.status(201).json({
        status: 201,
        message: "Success",
        data: createUser,
      });
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async LoginUser(req: Request, res: Response): Promise<Response> {
    try {
      const { username, password } = req.body;

      const user = await this.userRepository.findOne({
        where: {
          username,
        },
      });
      if (!user) return res.status(404).json({ message: "User not found" });

      const resBcrypt = BcryptMe.comparePassword(password, user.password);
      if (!resBcrypt)
        return res.status(400).json({ message: "wrong password" });

      const token = Auth.generateToken(user.id, user.username);

      return res.status(200).json({
        status: 200,
        message: "Success",
        token: token,
      });
    } catch (error) {
      return res.status(500).json(error);
    }
  }
})();
