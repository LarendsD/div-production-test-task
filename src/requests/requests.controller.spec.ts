import { Test } from '@nestjs/testing';
import { RequestsController } from './requests.controller';
import { RequestsService } from './requests.service';
import { Repository } from 'typeorm';
import { Request } from './entities/request.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MailerService } from '../mailer/mailer.service';
import { Status } from './entities/enums/status.enum';
import { generateMessage } from './utils/generate-message';

describe('RequestsController', () => {
  let requestsController: RequestsController;
  let requestsService: RequestsService;
  let requestsRepository: Repository<Request>;
  let request: Request;
  let mailerService: MailerService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [],
      controllers: [RequestsController],
      providers: [
        RequestsService,
        MailerService,
        {
          provide: getRepositoryToken(Request),
          useClass: Repository,
        },
      ],
    }).compile();

    request = {
      id: 1,
      comment: 'test',
      name: 'test',
      email: 'test@mail.ru',
      status: Status.ACTIVE,
      message: 'test',
      createdAt: new Date(Date.now()),
      updatedAt: new Date(Date.now()),
    };

    requestsRepository = moduleRef.get<Repository<Request>>(
      getRepositoryToken(Request),
    );
    requestsService = moduleRef.get<RequestsService>(RequestsService);
    requestsController = moduleRef.get<RequestsController>(RequestsController);
    mailerService = moduleRef.get<MailerService>(MailerService);
  });

  describe('findAll', () => {
    let spyRepo: jest.SpyInstance;
    let spyService: jest.SpyInstance;

    beforeEach(() => {
      spyRepo = jest
        .spyOn(requestsRepository, 'find')
        .mockResolvedValueOnce([request]);

      spyService = jest.spyOn(requestsService, 'getAll');
    });

    it('should called with right params(Only require params)', async () => {
      const queryOpts = {
        page: 1,
        perPage: 10,
      };
      await requestsController.getAll(queryOpts);

      expect(spyService).toHaveBeenCalledWith(queryOpts);

      expect(spyRepo).toHaveBeenCalled();
    });

    it('should called with right params(All params)', async () => {
      const queryOpts = {
        page: 1,
        perPage: 10,
        status: Status.ACTIVE,
        dateFrom: '2022-12-12',
        dateTo: '2023-12-12',
      };

      await requestsController.getAll(queryOpts);

      expect(spyService).toHaveBeenCalledWith(queryOpts);

      expect(spyRepo).toHaveBeenCalled();
    });
  });

  describe('create', () => {
    let spyRepo: jest.SpyInstance;
    let spyService: jest.SpyInstance;

    beforeEach(() => {
      spyRepo = jest
        .spyOn(requestsRepository, 'save')
        .mockResolvedValueOnce(request);

      spyService = jest.spyOn(requestsService, 'create');
    });

    it('should called with right params', async () => {
      const bodyOpts = {
        name: 'John',
        email: 'john@gmail.com',
        message: 'Hello, there is an issue!',
      };

      await requestsController.create(bodyOpts);

      expect(spyService).toHaveBeenCalledWith(bodyOpts);

      expect(spyRepo).toHaveBeenCalledWith(bodyOpts);
    });
  });

  describe('update', () => {
    let spyRepoFind: jest.SpyInstance;
    let spyRepoSave: jest.SpyInstance;
    let spyService: jest.SpyInstance;
    let spyMailer: jest.SpyInstance;

    beforeEach(() => {
      spyRepoFind = jest
        .spyOn(requestsRepository, 'findOneBy')
        .mockResolvedValueOnce(request);

      spyRepoSave = jest
        .spyOn(requestsRepository, 'save')
        .mockResolvedValueOnce(request);

      spyService = jest.spyOn(requestsService, 'update');
      spyMailer = jest.spyOn(mailerService, 'sendMail').mockResolvedValueOnce();
    });

    it('should called with right params', async () => {
      const bodyOpts = { comment: 'We resolved this!' };

      await requestsController.update(bodyOpts, 1);

      expect(spyService).toHaveBeenCalledWith(1, bodyOpts);

      expect(spyRepoFind).toHaveBeenCalledWith({ id: 1 });

      expect(spyRepoSave).toBeCalledWith(request);
      expect(spyMailer).toHaveBeenCalledWith({
        from: 'ourSite@gmail.com',
        to: request.email,
        subject: request.message,
        text: generateMessage(request),
      });
    });
  });
});
