import { Module } from '@nestjs/common';
import { RequestsController } from './requests.controller';
import { RequestsService } from './requests.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Request } from './entities/request.entity';
import { MailerModule } from '../mailer/mailer.module';
import { MailerService } from '../mailer/mailer.service';

@Module({
  imports: [TypeOrmModule.forFeature([Request]), MailerModule],
  controllers: [RequestsController],
  providers: [RequestsService, MailerService],
})
export class RequestsModule {}
