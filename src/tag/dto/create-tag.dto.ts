import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsDate, IsOptional } from 'class-validator';

export class CreateTagDto {
  @ApiProperty({ description: '태그명' })
  @IsString()
  readonly name: string;

  @ApiProperty({ description: '태그 상세' })
  @IsString()
  readonly description: string;

  @ApiProperty({ description: '태그 등록일' })
  @IsOptional()
  @IsDate()
  readonly createdAt: Date;

  @ApiProperty({ description: '태그 수정일' })
  @IsOptional()
  @IsDate()
  readonly updatedAt: Date;
}
