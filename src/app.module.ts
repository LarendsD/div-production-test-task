import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceConfig } from './config/data-source.config';
import { RequestsModule } from './requests/requests.module';
import { SupportMembersModule } from './support-members/support-members.module';
import { SessionModule } from './session/session.module';
import { ValidationModule } from './support-members/validation/validation.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceConfig),
    RequestsModule,
    SupportMembersModule,
    SessionModule,
    ValidationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
