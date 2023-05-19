import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { SessionService } from './session.service';
import { SessionController } from './session.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtStrategy } from './strategies/jwt.strategy';
import { SupportMembersModule } from '../support-members/support-members.module';
import { SupportMembersService } from '../support-members/support-members.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SupportMember } from '../support-members/entities/support-member.entity';

@Module({
  imports: [
    SupportMembersModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '30m' },
    }),
    TypeOrmModule.forFeature([SupportMember])
  ],
  providers: [
    SessionService,
    SupportMembersService,
    LocalStrategy,
    JwtStrategy,
  ],
  controllers: [SessionController],
})
export class SessionModule {}
