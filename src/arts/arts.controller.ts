import { Logger as WinstonLogger } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { ApiTags, ApiOperation, ApiResponse, ApiCreatedResponse } from '@nestjs/swagger';

import {
  HttpStatus,
  Controller,
  Inject,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { ArtsService } from './arts.service';
import { CreateArtDto, UpdateArtDto } from './dto';
import { UploadsService } from '../uploads/uploads.service';

@Controller('api/arts')
@ApiTags('작품 API')
export class ArtsController {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: WinstonLogger,
    private readonly artsService: ArtsService,
    private readonly uploadsService: UploadsService,
  ) {}

  @Post()
  @ApiOperation({ summary: '작품 생성 API', description: '작품을 추가한다.' })
  @ApiCreatedResponse({ description: '작품 생성' /*type: Arts*/ })
  @UseInterceptors(FileInterceptor('file'))
  async createOne(@UploadedFile() file, @Body() artData: CreateArtDto) {
    this.logger.info('Calling createOne()', { controller: ArtsController.name });
    artData.image = await this.uploadsService.upload(file);
    return this.artsService.create(artData);
  }

  @Get()
  @ApiOperation({ summary: '작품 목록 조회 API', description: '작품 목록을 조회한다.' })
  @ApiCreatedResponse({ description: '작품 목록 조회' /*type: Arts*/ })
  async getMany() {
    this.logger.info('Calling getMany()', { controller: ArtsController.name });
    return this.artsService.findAll();
  }

  @Get('/:artsId')
  @ApiOperation({ summary: '작품 상세 조회 API', description: '작품 상세를 조회한다.' })
  @ApiCreatedResponse({ description: '작품 상세 조회' })
  async getOne(@Param('artsId') artsId: number) {
    this.logger.info('Calling getOne()', { controller: ArtsController.name });
    return this.artsService.findOne(artsId);
  }

  @Patch('/:artsId')
  @ApiOperation({ summary: '작품 수정 API', description: '작품을 수정한다.' })
  @ApiCreatedResponse({ description: '작품 수정' })
  async patch(@Param('artsId') artsId: number, @Body() updateData: UpdateArtDto) {
    this.logger.info('Calling patch()', { controller: ArtsController.name });
    this.logger.info('... patch data ', updateData);
    return this.artsService.update(artsId, updateData);
  }

  @Delete('/:artsId')
  @ApiOperation({ summary: '작품 삭제 API', description: '작품을 삭제한다.' })
  @ApiCreatedResponse({ description: '작품 삭제' })
  async delete(@Param('artsId') artsId: number) {
    this.logger.info('Calling delete()', { controller: ArtsController.name });
    return this.artsService.delete(artsId);
  }
}
