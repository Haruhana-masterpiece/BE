import { Logger as WinstonLogger } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';

import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Author, AuthorDocument } from './schemas/author.schema';
import { Model } from 'mongoose';
import { CreateAuthorDto } from './dto/create-author.dto';

@Injectable()
export class AuthorService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: WinstonLogger,
    @InjectModel(Author.name) private authorModel: Model<AuthorDocument>,
  ) {}

  public async create(authorData: CreateAuthorDto) {
    try {
      const author: Author = await this.authorModel.create(authorData);
      return author;
    } catch (err) {
      this.logger.error('Error', { err: err });
    }
  }

  public async findAll() {
    try {
      const authors: Author[] = await this.authorModel.find();
      return authors;
    } catch (err) {
      this.logger.error('Error', { err: err });
    }
  }
}
