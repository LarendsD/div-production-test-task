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
  @IsOptional()
  @IsString()
  @IsEmail()
  @Validate(CheckEmail, {
    message: 'This email is already exists!',
  })
  email: string;

  @ApiProperty({ example: 'myNewSecretPass', required: false })
  @IsOptional()
  password: string;
}
