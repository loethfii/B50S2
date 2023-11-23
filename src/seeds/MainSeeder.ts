import { DataSource } from "typeorm";
import { runSeeder, Seeder, SeederFactoryManager } from "typeorm-extension";
import { NewsSeeders } from "./NewsSeeders";
import { PaslonSeeders } from "./PaslonSeeders";

export class MainSeeder implements Seeder {
  async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<void> {
    await runSeeder(dataSource, NewsSeeders);
    await runSeeder(dataSource, PaslonSeeders);
  }
}
