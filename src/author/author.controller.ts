import { Logger as WinstonLogger } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { ApiTags, ApiOperation, ApiResponse, ApiCreatedResponse } from '@nestjs/swagger';

import { HttpStatus, Controller, Inject, Get, Post, Body } from '@nestjs/common';
import { AuthorService } from './author.service';
import { CreateAuthorDto } from './dto/create-author.dto';

@Controller('api/authors')
@ApiTags('작가 API')
export class AuthorController {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: WinstonLogger,
    private readonly authorService: AuthorService,
  ) {}

  @Post()
  @ApiOperation({ summary: '작가 추가 API', description: '작가를 추가한다.' })
  @ApiCreatedResponse({ description: '작가 추가' /*type: Author*/ })
  async createOne(@Body() tagData: CreateAuthorDto) {
    this.logger.info('Calling createOne()', { controller: AuthorController.name });
    return this.authorService.createAuthor(tagData);
  }

  @Get()
  @ApiOperation({ summary: '작가 목록 조회 API', description: '작가 목록을 조회한다.' })
  @ApiCreatedResponse({ description: '작가 목록 조회' /*type: Author*/ })
  async getMany() {
    this.logger.info('Calling getMany()', { controller: AuthorController.name });
    return this.authorService.getAuthors();
  }
}
