import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SessionService } from '../../session/session.service';
import { JwtService } from '@nestjs/jwt';
import { SupportMember } from '../entities/support-member.entity';
import { SupportMembersController } from '../support-members.controller';
import { SupportMembersService } from '../support-members.service';

@Module({
  imports: [TypeOrmModule.forFeature([SupportMember])],
  controllers: [SupportMembersController],
  providers: [SupportMembersService, SessionService, JwtService],
})
export class ValidationModule {}
