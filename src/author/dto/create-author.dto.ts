import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDate, IsOptional } from 'class-validator';

export class CreateAuthorDto {
  @ApiProperty({ description: '작가 이름' })
  @IsString()
  readonly name: string;

  @ApiProperty({ description: '작가 출생일' })
  @IsDate()
  readonly birth: Date;

  @ApiProperty({ description: '작가 사망일' })
  @IsDate()
  readonly death: Date;

  @ApiProperty({ description: '작가 상세 설명' })
  @IsString()
  readonly description: string;

  @ApiProperty({ description: '작가 이미지' })
  @IsOptional()
  @IsString()
  readonly image: string;
}
