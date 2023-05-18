import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateRequestDto {
  @ApiProperty({ example: 'Problem at forum successfully solved!' })
  @IsString()
  comment: string;
}
