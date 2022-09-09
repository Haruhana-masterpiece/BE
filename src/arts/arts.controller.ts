import { Logger as WinstonLogger } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';

import { ApiTags, ApiOperation, ApiResponse, ApiCreatedResponse } from '@nestjs/swagger';

import { HttpStatus, Controller, Inject, Get, Post, Body } from '@nestjs/common';
import { ArtsService } from './arts.service';
import { CreateArtDto } from './dto/create-art.dto';

@Controller('arts')
@ApiTags('작품 API')
export class ArtsController {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: WinstonLogger,
    private readonly artsService: ArtsService,
  ) {}

  @Post('register')
  @ApiOperation({ summary: '작품 생성 API', description: '작품을 추가한다.' })
  @ApiCreatedResponse({ description: '작품 생성' /*type: Arts*/ })
  async createOne(@Body() artData: CreateArtDto) {
    this.logger.info('Calling getHello()', { controller: ArtsController.name });

    return this.artsService.createArt(artData);
  }
}
