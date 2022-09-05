import { Logger as WinstonLogger } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';

import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Arts, ArtsDocument } from './schemas/arts.schema';
import { Model } from 'mongoose';
import { CreateArtDto } from './dto/create-art.dto';

@Injectable()
export class ArtsService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: WinstonLogger,
    @InjectModel(Arts.name) private artsModel: Model<ArtsDocument>,
  ) {}

  async createArt(artData: CreateArtDto) {
    try {
      const artwork: Arts = await this.artsModel.create(artData);
      return artwork;
    } catch (err) {
      this.logger.error('Error', { err: err });
    }
  }
}
