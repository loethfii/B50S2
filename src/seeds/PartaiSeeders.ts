import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";
import { Partai } from "../entities/Partai";

export class PaslonSeeders implements Seeder {
  async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<void> {
    const newsRepository = dataSource.getRepository(Partai);
    const newsData = [
      {
        nama: "PDI Perjuangan",
        ketua_umum: "Megawati",
        visi_misi: "Mewujudkan demokrasi indonesia",
        alamat: "Menteng Jakarta Pusat",
        image:
          "https://res.cloudinary.com/dp3rsk2xa/image/upload/v1700675276/nxewzarzjqppet9l4yqf.png",
      },
      {
        nama: "Gerindra",
        ketua_umum: "Prabowo Subianto",
        visi_misi: "Menjadikan Manusia demokratis",
        alamat: "Senen Jakarta Pusat",
        image:
          "https://res.cloudinary.com/dp3rsk2xa/image/upload/v1700675829/neny5sigdq79rkttfgcr.png",
      },
    ];

    const newNews = newsRepository.create(newsData);
    await newsRepository.save(newNews);
  }
}
