import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCookieAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { SupportMembersService } from './support-members.service';
import { SupportMember } from './entities/support-member.entity';
import { CreateSupportMemberDto } from './dto/create-support-member.dto';
import { UpdateSupportMemberDto } from './dto/update-support-member.dto';
import { JwtAuthGuard } from '../session/guards/jwt-auth.guard';
import { JwtSupportMembersAuthGuard } from '../session/guards/jwt-support-members-auth.guard';

@ApiTags('support-members')
@Controller('support-members')
export class SupportMembersController {
  constructor(private readonly supportMembersService: SupportMembersService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiCookieAuth('access_token')
  @ApiUnauthorizedResponse({
    description: 'You must authenticate for see support members',
  })
  @ApiOkResponse({ description: 'Successfully get all support members!' })
  async getAll(): Promise<SupportMember[]> {
    return this.supportMembersService.getAll();
  }

  @Post()
  @ApiCreatedResponse({ description: 'Succesfully created support member!' })
  @ApiBadRequestResponse({ description: 'Validation failed!' })
  async create(@Body() createSupportMemberDto: CreateSupportMemberDto) {
    return this.supportMembersService.create(createSupportMemberDto);
  }

  @UseGuards(JwtSupportMembersAuthGuard)
  @Put(':id')
  @ApiCookieAuth('access_token')
  @ApiOkResponse({ description: 'Succesfully updated support member!' })
  @ApiBadRequestResponse({ description: 'Validation failed!' })
  @ApiUnauthorizedResponse({
    description: 'You must authenticate for update support member',
  })
  async update(
    @Body() updateSupportMemberDto: UpdateSupportMemberDto,
    @Param('id') id: number,
  ) {
    return this.supportMembersService.update(id, updateSupportMemberDto);
  }

  @UseGuards(JwtSupportMembersAuthGuard)
  @Delete(':id')
  @ApiCookieAuth('access_token')
  @ApiOkResponse({ description: 'Succesfully deleted support member!' })
  @ApiBadRequestResponse({ description: 'Validation failed!' })
  @ApiUnauthorizedResponse({
    description: 'You must authenticate for delete support member',
  })
  async delete(@Param('id') id: number) {
    return this.supportMembersService.delete(id);
  }
}
