import { Logger as WinstonLogger } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';

import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Arts, ArtsDocument } from './schemas/arts.schema';
import { Model } from 'mongoose';
import { CreateArtDto } from './dto/create-art.dto';
import { UpdateArtDto } from './dto/update-art.dto';

@Injectable()
export class ArtsService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: WinstonLogger,
    @InjectModel(Arts.name) private readonly artsModel: Model<ArtsDocument>,
  ) {}

  public async create(artData: CreateArtDto): Promise<Arts> {
    try {
      const artwork: Arts = await this.artsModel.create(artData);
      return artwork;
    } catch (err) {
      this.logger.error('Error', { err: err });
    }
  }

  public async findAll(): Promise<Arts[]> {
    try {
      const arts: Arts[] = await this.artsModel.find();
      return arts;
    } catch (err) {
      this.logger.error('Error', { err: err });
    }
  }

  public async findOne(artsId: number): Promise<Arts> {
    try {
      const arts: Arts = await this.artsModel.findById(artsId);
      return arts;
    } catch (err) {
      this.logger.error('Error', { err: err });
    }
  }

  public async update(artsId: number, updateData: UpdateArtDto): Promise<Arts> {
    try {
      const arts: Arts = await this.artsModel.findByIdAndUpdate(artsId, updateData);
      return arts;
    } catch (err) {
      this.logger.error('Error', { err: err });
    }
  }

  public async delete(artsId: number): Promise<Arts> {
    try {
      const arts: Arts = await this.artsModel.findOneAndDelete({ id: artsId });
      return arts;
    } catch (err) {
      this.logger.error('Error', { err: err });
    }
  }
}
