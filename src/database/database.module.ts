import { Module, Global } from '@nestjs/common';
import { MongoClient } from 'mongodb';

@Global()
@Module({
  providers: [
    {
      provide: 'MONGO',
      useFactory: async () => {
        // 👈 Inject w/ useFactory
        const uri =
          'mongodb://root:root@localhost:27017/?authSource=admin&readPreference=primary';
        const client = new MongoClient(uri);
        await client.connect();
        const database = client.db('platzi-store');
        return database;
      },
    },],
  exports: ['MONGO'],
})
export class DatabaseModule {}
