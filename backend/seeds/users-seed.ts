// src/db/seeds/user.seeder.ts
import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { UserORMEntity } from '../entities';

export default class UserSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const repository = await dataSource.getRepository(UserORMEntity);
    await repository.insert([
      {
        name: 'Filipe Tests',
        apiId: 90090,
        username: 'fkertcher',
        email: 'some@email.com',
      },
    ]);
  }
}
