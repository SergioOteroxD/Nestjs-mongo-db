import { Module, Global } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoClient } from 'mongodb';
import config from '../config';

@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
      inject: [config.KEY],
      useFactory: (congigService: ConfigType<typeof config>) => {
        const {
          connection,
          dbname,
          host,
          password,
          port,
          user,
        } = congigService.mongo;
        return {
          uri: `${connection}://${user}:${password}@${host}:${port}/?authSource=admin&readPreference=primary`,
          connectionName: 'testxd',
          //dbName: `${dbname}`,
        };
      },
    }),
    MongooseModule.forRootAsync({
      inject: [config.KEY],
      useFactory: (congigService: ConfigType<typeof config>) => {
        const {
          connection,
          dbname,
          host,
          password,
          port,
          user,
        } = congigService.mongo;
        return {
          uri: `${connection}://${user}:${password}@${host}:${port}/?authSource=admin&readPreference=primary`,
          connectionName: 'sergio',
          dbName: 'sergio',
          //dbName: `${dbname}`,
        };
      },
    }),
  ],
  providers: [
    // {
    //   provide: 'MONGO',
    //   useFactory: async (configService: ConfigType<typeof config>) => {
    //     // 👈 Inject w/ useFactory
    //     const {
    //       connection,
    //       dbname,
    //       host,
    //       password,
    //       port,
    //       user,
    //     } = configService.mongo;
    //     const uri = `mongodb://root:root@localhost:27017/?authSource=admin&readPreference=primary`;
    //     const client = new MongoClient(uri);
    //     await client.connect();
    //     const database = client.db(`sergio`);
    //     return database;
    //   },
    //   inject: [config.KEY],
    // },
  ],
  exports: [],
})
export class DatabaseModule {}
