import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { Status } from '../entities/enums/status.enum';
import { ApiProperty } from '@nestjs/swagger';

export class QueryRequestDto {
  @ApiProperty({ description: 'Page number' })
  @IsNumber()
  page: number;

  @ApiProperty({ description: 'Requests per page' })
  @IsNumber()
  perPage: number;

  @ApiProperty({
    enum: Status,
    required: false,
    description: 'Request status to show, if not specified, show all',
  })
  @IsOptional()
  @IsEnum(Status)
  status?: Status;

  @ApiProperty({
    description: 'Date range "from" when created a request(YYYY-MM-DD)',
    format: 'date',
    example: '1990-12-10',
    required: false,
  })
  @IsString()
  dateFrom?: string;

  @ApiProperty({
    description: 'Date range "to" when created a request(YYYY-MM-DD)',
    format: 'date',
    example: '2025-12-10',
    required: false,
  })
  @IsString()
  dateTo?: string;
}
