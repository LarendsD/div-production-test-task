import { Injectable } from '@nestjs/common';
import { Request } from './entities/request.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { Status } from './entities/enums/status.enum';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import { MailerService } from '../mailer/mailer.service';
import { generateMessage } from './utils/generate-message';
import { QueryRequestDto } from './dto/query-request.dto';

@Injectable()
export class RequestsService {
  constructor(
    @InjectRepository(Request)
    private readonly requestsRepository: Repository<Request>,
    private readonly mailerService: MailerService,
  ) {}

  async getAll({
    status,
    page,
    perPage,
    dateFrom,
    dateTo,
  }: QueryRequestDto): Promise<Request[]> {
    return this.requestsRepository.find({
      where: {
        status,
        createdAt: Between(
          new Date(dateFrom ?? 0),
          new Date(dateTo ?? Date.now()),
        ),
      },
      take: perPage,
      skip: (page - 1) * perPage,
    });
  }

  async create(createRequestDto: CreateRequestDto): Promise<Request> {
    return this.requestsRepository.save(createRequestDto);
  }

  async update(id: number, { comment }: UpdateRequestDto): Promise<Request> {
    const currentRequest = await this.requestsRepository.findOneBy({ id });

    currentRequest.comment = comment;
    currentRequest.status = Status.RESOLVED;

    const resolvedRequest = await this.requestsRepository.save(currentRequest);

    this.mailerService.sendMail({
      from: 'ourSite@gmail.com',
      to: currentRequest.email,
      subject: currentRequest.message,
      text: generateMessage(resolvedRequest),
    });

    return resolvedRequest;
  }
}
