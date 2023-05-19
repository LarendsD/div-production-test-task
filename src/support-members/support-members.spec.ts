import { Test } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { SupportMember } from './entities/support-member.entity';
import { SupportMembersController } from './support-members.controller';
import { SupportMembersService } from './support-members.service';
import { encrypt } from '../common/secure/encrypt';

describe('SupportMembersController', () => {
  let supportMembersController: SupportMembersController;
  let supportMembersService: SupportMembersService;
  let supportMembersRepository: Repository<SupportMember>;
  let supportMember: SupportMember;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [],
      controllers: [SupportMembersController],
      providers: [
        SupportMembersService,
        {
          provide: getRepositoryToken(SupportMember),
          useClass: Repository,
        },
      ],
    }).compile();

    supportMember = {
      id: 1,
      name: 'test',
      email: 'test@mail.ru',
      password: encrypt('myPass'),
      createdAt: new Date(Date.now()),
    };

    supportMembersRepository = moduleRef.get<Repository<SupportMember>>(
      getRepositoryToken(SupportMember),
    );
    supportMembersService = moduleRef.get<SupportMembersService>(
      SupportMembersService,
    );
    supportMembersController = moduleRef.get<SupportMembersController>(
      SupportMembersController,
    );
  });

  describe('findAll', () => {
    let spyRepo: jest.SpyInstance;
    let spyService: jest.SpyInstance;

    beforeEach(() => {
      spyRepo = jest
        .spyOn(supportMembersRepository, 'find')
        .mockResolvedValueOnce([supportMember]);

      spyService = jest.spyOn(supportMembersService, 'getAll');
    });

    it('should called with right params(Only require params)', async () => {
      await supportMembersController.getAll();

      expect(spyService).toHaveBeenCalledWith();
      expect(spyRepo).toHaveBeenCalledWith();
    });
  });

  describe('create', () => {
    let spyRepo: jest.SpyInstance;
    let spyService: jest.SpyInstance;

    beforeEach(() => {
      spyRepo = jest
        .spyOn(supportMembersRepository, 'save')
        .mockResolvedValueOnce(supportMember);

      spyService = jest.spyOn(supportMembersService, 'create');
    });

    it('should called with right params', async () => {
      const bodyOpts = {
        name: 'John',
        email: 'john@gmail.com',
        password: 'This is my new password',
      };

      await supportMembersController.create(bodyOpts);

      expect(spyService).toHaveBeenCalledWith(bodyOpts);

      expect(spyRepo).toHaveBeenCalledWith(bodyOpts);
    });
  });

  describe('update', () => {
    let spyRepoFind: jest.SpyInstance;
    let spyRepoSave: jest.SpyInstance;
    let spyService: jest.SpyInstance;

    beforeEach(() => {
      spyRepoFind = jest
        .spyOn(supportMembersRepository, 'findOneBy')
        .mockResolvedValueOnce(supportMember);

      jest
        .spyOn(supportMembersRepository, 'merge')
        .mockReturnValueOnce(supportMember);

      spyRepoSave = jest
        .spyOn(supportMembersRepository, 'save')
        .mockResolvedValueOnce(supportMember);

      spyService = jest.spyOn(supportMembersService, 'update');
    });

    it('should called with right params', async () => {
      const bodyOpts = {
        name: 'Alex',
        email: 'myNew@gmail.com',
        password: 'myNewPass',
      };

      await supportMembersController.update(bodyOpts, 1);

      expect(spyService).toHaveBeenCalledWith(1, bodyOpts);

      expect(spyRepoFind).toHaveBeenCalledWith({ id: 1 });

      expect(spyRepoSave).toBeCalledWith(supportMember);
    });
  });

  describe('delete', () => {
    let spyRepo: jest.SpyInstance;
    let spyService: jest.SpyInstance;

    beforeEach(() => {
      spyRepo = jest
        .spyOn(supportMembersRepository, 'delete')
        .mockResolvedValueOnce({ affected: 1, raw: 'completed!' });

      spyService = jest.spyOn(supportMembersService, 'delete');
    });

    it('should called with right params', async () => {
      await supportMembersController.delete(1);

      expect(spyService).toHaveBeenCalledWith(1);

      expect(spyRepo).toHaveBeenCalledWith({ id: 1 });
    });
  });
});
