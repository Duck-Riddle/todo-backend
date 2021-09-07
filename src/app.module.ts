import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TasksModule } from './tasks/tasks.module';

const AtlasUri = process.env.MONGODB_ATLAS || '';

@Module({
  imports: [
    MongooseModule.forRoot(AtlasUri, {
      useNewUrlParser: true,
    }),
    TasksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
