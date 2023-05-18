import { SendMail } from '../interfaces/send-mail.interface';

export const generateMail = (sendMailOpts: SendMail) => {
  return `
    From: ${sendMailOpts.from}
    To: ${sendMailOpts.to}
    Subject: ${sendMailOpts.subject}

    ${sendMailOpts.text}
  `;
};
