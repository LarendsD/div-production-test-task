import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsOptional,
  IsString,
  Length,
  Validate,
} from 'class-validator';
import { CheckEmail } from '../validation/check-email';

export class UpdateSupportMemberDto {
  @ApiProperty({ example: 'newJohn', required: false })
  @IsOptional()
  @IsString()
  @Length(1, 30)
  name: string;

  @ApiProperty({ example: 'newJohn@gmail.com', required: true })
  @IsString()
  @IsEmail()
  @Validate(CheckEmail, {
    message: 'Email validation err',
  })
  email: string;

  @ApiProperty({ example: 'myNewSecretPass', required: false })
  @IsOptional()
  password: string;
}
