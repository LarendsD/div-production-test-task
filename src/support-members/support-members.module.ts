import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SupportMember } from './entities/support-member.entity';
import { SupportMembersController } from './support-members.controller';
import { SupportMembersService } from './support-members.service';
import { CheckEmail } from './validation/check-email';

@Module({
  imports: [TypeOrmModule.forFeature([SupportMember])],
  controllers: [SupportMembersController],
  providers: [SupportMembersService, CheckEmail],
})
export class SupportMembersModule {}
