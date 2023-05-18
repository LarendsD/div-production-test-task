import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class CreateRequestDto {
  @ApiProperty({ example: 'John' })
  @IsString()
  @Length(1, 30)
  name: string;

  @ApiProperty({ example: 'John998@gmail.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'There is something wrong at forum page!' })
  @IsString()
  message: string;
}
