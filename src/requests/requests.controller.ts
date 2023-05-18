import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { Request } from './entities/request.entity';
import { RequestsService } from './requests.service';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { QueryRequestDto } from './dto/query-request.dto';

@Controller('requests')
export class RequestsController {
  constructor(private readonly requestsService: RequestsService) {}

  @Get()
  @ApiOkResponse({ description: 'Successfully get all requests!' })
  async getAll(@Query() queryRequest: QueryRequestDto): Promise<Request[]> {
    return this.requestsService.getAll(queryRequest);
  }

  @Post()
  @ApiCreatedResponse({ description: 'Succesfully created request!' })
  @ApiBadRequestResponse({ description: 'Validation failed!' })
  async create(@Body() createRequestDto: CreateRequestDto) {
    return this.requestsService.create(createRequestDto);
  }

  @Put(':id')
  @ApiOkResponse({ description: 'Succesfully updated request!' })
  @ApiBadRequestResponse({ description: 'Validation failed!' })
  @ApiUnauthorizedResponse({
    description: 'You must authenticate for review request',
  })
  async update(
    @Body() updateRequestDto: UpdateRequestDto,
    @Param('id') id: number,
  ) {
    return this.requestsService.update(id, updateRequestDto);
  }
}
