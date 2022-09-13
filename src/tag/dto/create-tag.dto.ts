import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsDate, IsOptional } from 'class-validator';

export class CreateTagDto {
  @ApiProperty({ description: '작가 ID번호' })
  @IsNumber()
  readonly author: number;

  @ApiProperty({ description: '작품명' })
  @IsString()
  readonly title: string;

  @ApiProperty({ description: '작품설명' })
  @IsString()
  readonly description: string;

  @ApiProperty({ description: '작품 이미지' })
  @IsNumber()
  readonly image: string;

  // 배열이면 each true, 옵션값이면 IsOptional 사용
  @ApiProperty({ description: '태그들' })
  @IsOptional()
  @IsString({ each: true })
  readonly tags: string[];

  @ApiProperty({ description: '작품 공개일' })
  @IsOptional()
  @IsDate()
  readonly paintedAt: Date;

  @ApiProperty({ description: '작품 등록일' })
  @IsOptional()
  @IsDate()
  readonly createdAt: Date;

  @ApiProperty({ description: '작품 수정일' })
  @IsOptional()
  @IsDate()
  readonly updatedAt: Date;
}
