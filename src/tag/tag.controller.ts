import { Logger as WinstonLogger } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { ApiTags, ApiOperation, ApiResponse, ApiCreatedResponse } from '@nestjs/swagger';

import { HttpStatus, Controller, Inject, Get, Post, Body } from '@nestjs/common';
import { TagService } from './tag.service';
import { CreateTagDto } from './dto/create-tag.dto';

@Controller('api/tags')
@ApiTags('태그 API')
export class TagController {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: WinstonLogger,
    private readonly tagService: TagService,
  ) {}

  @Post()
  @ApiOperation({ summary: '태그 추가 API', description: '태그를 추가한다.' })
  @ApiCreatedResponse({ description: '태그 추가' /*type: Tag*/ })
  async createOne(@Body() tagData: CreateTagDto) {
    this.logger.info('Calling createOne()', { controller: TagController.name });
    return this.tagService.createTag(tagData);
  }

  @Get()
  @ApiOperation({ summary: '태그 목록 조회 API', description: '태그 목록을 조회한다.' })
  @ApiCreatedResponse({ description: '태그 목록 조회' /*type: Tag*/ })
  async getMany() {
    this.logger.info('Calling getMany()', { controller: TagController.name });
    return this.tagService.getTags();
  }
}
