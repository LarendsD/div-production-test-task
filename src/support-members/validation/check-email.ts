import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { SupportMembersService } from '../support-members.service';

@ValidatorConstraint({ name: 'email', async: true })
@Injectable()
export class CheckEmail implements ValidatorConstraintInterface {
  constructor(private supportMembersService: SupportMembersService) {}

  async validate(text: string, validationArguments: ValidationArguments) {
    console.log('lol');
    const email = validationArguments.value;
    const exists = await this.supportMembersService.findByEmail(email);
    return !exists;
  }
}
