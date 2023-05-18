import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Requests api')
  .setDescription('This is Requests api')
  .addTag('requests')
  .addTag('moderators')
  .build();
