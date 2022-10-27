import { Logger as WinstonLogger } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';

import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Tag, TagDocument } from './schemas/tag.schema';
import { Model } from 'mongoose';
import { CreateTagDto } from './dto/create-tag.dto';

@Injectable()
export class TagService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: WinstonLogger,
    @InjectModel(Tag.name) private tagModel: Model<TagDocument>,
  ) {}

  public async create(tagData: CreateTagDto) {
    try {
      const tag: Tag = await this.tagModel.create(tagData);
      return tag;
    } catch (err) {
      this.logger.error('Error', { err: err });
    }
  }

  public async findAll() {
    try {
      const tags: Tag[] = await this.tagModel.find();
      return tags;
    } catch (err) {
      this.logger.error('Error', { err: err });
    }
  }
}
