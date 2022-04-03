import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://root:root@localhost:27017/?authSource=admin&readPreference=primary',
    ),
  ],
})
export class DatabaseModule {}
