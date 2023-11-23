import { AppDataSource } from "../data-source";
import { PemiluNews } from "../entities/PemiluNews";
import { Repository } from "typeorm";
import {
  PemiluNewsInterface,
  PemiluNewsInterfaceResponses,
  PemiluNewsInterfaceResponse,
  PemiluNewsInterfaceForResponse,
} from "../interface/PemiluNewsInterface";
import { Request, Response } from "express";

export default new (class PemiluNewsServices {
  private readonly pemiluNewsRepository: Repository<PemiluNews> =
    AppDataSource.getRepository(PemiluNews);

  async FindAll(req: Request, res: Response): Promise<Response> {
    try {
      const dbResponse: PemiluNewsInterface[] =
        await this.pemiluNewsRepository.find({
          order: {
            id: "DESC",
          },
        });

      const formattedResult: PemiluNewsInterfaceForResponse[] = dbResponse.map(
        (item) => {
          return {
            id: item.id,
            title: item.title,
            author: item.author,
            image: item.image,
            description: item.description,
            posted_at: item.posted_at,
          };
        }
      );

      const resPemiluResponses: PemiluNewsInterfaceResponses = {
        status: 200,
        message: "Success",
        data: formattedResult,
      };
      return res.status(200).json(resPemiluResponses);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async FindOne(req: Request, res: Response): Promise<Response> {
    try {
      const dbResponse: PemiluNewsInterface =
        await this.pemiluNewsRepository.findOneBy({
          id: parseInt(req.params.id),
        });

      if (!dbResponse) {
        return res.status(404).json({
          status: 404,
          message: "Not Found",
        });
      }

      const formattedResult: PemiluNewsInterfaceForResponse = {
        id: dbResponse.id,
        title: dbResponse.title,
        author: dbResponse.author,
        image: dbResponse.image,
        description: dbResponse.description,
        posted_at: dbResponse.posted_at,
      };

      const resPemiluResponse: PemiluNewsInterfaceResponse = {
        status: 200,
        message: "Success",
        data: formattedResult,
      };
      return res.status(200).json(resPemiluResponse);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async Create(req: Request, res: Response): Promise<Response> {
    try {
      const newData = req.body;

      const newPemiluNews = new PemiluNews();
      newPemiluNews.title = newData.title;
      newPemiluNews.author = newData.author;
      newPemiluNews.image = newData.image;
      newPemiluNews.description = newData.description;
      newPemiluNews.posted_at = new Date();

      await this.pemiluNewsRepository.save(newPemiluNews);

      return res.status(201).json({
        status: 201,
        message: "data created",
        data: newPemiluNews,
      });
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async Update(req: Request, res: Response): Promise<Response> {
    try {
      const newData = req.body;
      const id = parseInt(req.params.id);

      const newPemiluNews = new PemiluNews();
      newPemiluNews.title = newData.title;
      newPemiluNews.author = newData.author;
      newPemiluNews.image = newData.image;
      newPemiluNews.description = newData.description;

      await this.pemiluNewsRepository.update(id, newPemiluNews);

      return res.status(200).json({
        status: 200,
        message: "data updated",
        data: newPemiluNews,
      });
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async Delete(req: Request, res: Response): Promise<Response> {
    try {
      const id = parseInt(req.params.id);

      await this.pemiluNewsRepository.delete({
        id,
      });

      return res.status(200).json({
        status: 200,
        message: "data deleted",
      });
    } catch (error) {
      return res.status(500).json(error);
    }
  }
})();
