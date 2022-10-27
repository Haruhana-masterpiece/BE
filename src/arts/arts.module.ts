import { Module } from '@nestjs/common';
import { ArtsController } from './arts.controller';
import { ArtsService } from './arts.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ArtsSchema, Arts } from './schemas/arts.schema';
import { UploadsService } from '../uploads/uploads.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Arts.name, schema: ArtsSchema }])],
  controllers: [ArtsController],
  providers: [ArtsService, UploadsService],
  exports: [ArtsService],
})
export class ArtsModule {}
