import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";
import { Paslon } from "../entities/Paslon";

export class PaslonSeeders implements Seeder {
  async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<void> {
    const newsRepository = dataSource.getRepository(Paslon);
    const newsData = [
      {
        nama: "Anis Baswedan & Muhaimin",
        nomor_urut: "1",
        visi_misi: "Mewujudkan demokrasi indonesia",
        image:
          "https://res.cloudinary.com/dp3rsk2xa/image/upload/v1700715395/n8phga362fbwkrpxbxsi.jpg",
      },
      {
        nama: "Prabowo Subianto & Gibran",
        nomor_urut: "2",
        visi_misi: "Membantu rakyat miskin",
        image:
          "https://res.cloudinary.com/dp3rsk2xa/image/upload/v1700715395/n8phga362fbwkrpxbxsi.jpg",
      },
      {
        nama: "Ganjar Pranowo & Mahfud MD",
        nomor_urut: "3",
        visi_misi: "Memajukan UMKM Indonesia",
        image:
          "https://res.cloudinary.com/dp3rsk2xa/image/upload/v1700715395/n8phga362fbwkrpxbxsi.jpg",
      },
    ];

    const newNews = newsRepository.create(newsData);
    await newsRepository.save(newNews);
  }
}
