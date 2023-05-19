import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length, Validate } from 'class-validator';
import { CheckEmail } from '../validation/check-email';

export class CreateSupportMemberDto {
  @ApiProperty({ example: 'John' })
  @IsString()
  @Length(1, 30)
  name: string;

  @ApiProperty({ example: 'john@gmail.com' })
  @IsString()
  @IsEmail()
  @Validate(CheckEmail, { message: 'This email is already exists!' })
  email: string;

  @ApiProperty({ example: 'mySecretPass' })
  password: string;
}
