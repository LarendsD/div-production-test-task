import { Request } from '../entities/request.entity';

export const generateMessage = (request: Request) => {
  const formattedDate = new Date(request.createdAt).toLocaleDateString();

  return `
    Hello, ${request.name}! We recieved your request at ${formattedDate} with following message:

      ${request.message}

    Our response is:
      
      ${request.comment}

    With best regrets, the site team.
    `;
};
