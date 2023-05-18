import { Injectable } from '@nestjs/common';
import { SendMail } from './interfaces/send-mail.interface';
import { writeFileSync } from 'fs';
import { generateMail } from './utils/generate-mail';
import { generatePath } from './utils/generate-path';
import { generateFilename } from './utils/generate-filename';

@Injectable()
export class MailerService {
  async sendMail(sendMail: SendMail) {
    const fileName = generateFilename();
    const path = generatePath(fileName);

    const message = generateMail(sendMail);

    writeFileSync(path, message);
  }
}
