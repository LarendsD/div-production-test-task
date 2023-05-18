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
  status: Status;

  @ApiProperty({
    description: 'Date from create a request',
    format: 'date',
    example: '10.12.1990',
  })
  @IsString()
  dateFrom: string;

  @ApiProperty({
    description: 'Date to create a request',
    format: 'date',
    example: '10.12.2025',
  })
  @IsString()
  dateTo: string;
}
