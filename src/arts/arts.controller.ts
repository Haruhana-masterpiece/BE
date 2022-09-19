import { Logger as WinstonLogger } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { ApiTags, ApiOperation, ApiResponse, ApiCreatedResponse } from '@nestjs/swagger';

import { HttpStatus, Controller, Inject, Get, Post, Body } from '@nestjs/common';
import { ArtsService } from './arts.service';
import { CreateArtDto } from './dto';

@Controller('api/arts')
@ApiTags('작품 API')
export class ArtsController {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: WinstonLogger,
    private readonly artsService: ArtsService,
  ) {}

  @Post()
  @ApiOperation({ summary: '작품 생성 API', description: '작품을 추가한다.' })
  @ApiCreatedResponse({ description: '작품 생성' /*type: Arts*/ })
  async createOne(@Body() artData: CreateArtDto) {
    this.logger.info('Calling createOne()', { controller: ArtsController.name });
    return this.artsService.create(artData);
  }

  @Get()
  @ApiOperation({ summary: '작품 목록 조회 API', description: '작품 목록을 조회한다.' })
  @ApiCreatedResponse({ description: '작품 목록 조회' /*type: Arts*/ })
  async getMany() {
    this.logger.info('Calling getMany()', { controller: ArtsController.name });
    return this.artsService.findAll();
  }
}
