import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Welcome to the server for applications! Please follow to /api for documentation!';
  }
}
