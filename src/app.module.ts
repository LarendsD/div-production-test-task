import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceConfig } from './config/data-source.config';
import { RequestsModule } from './requests/requests.module';

@Module({
  imports: [TypeOrmModule.forRoot(dataSourceConfig), RequestsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
