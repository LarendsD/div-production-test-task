import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SupportMember } from './entities/support-member.entity';
import { CreateSupportMemberDto } from './dto/create-support-member.dto';
import { UpdateSupportMemberDto } from './dto/update-support-member.dto';

@Injectable()
export class SupportMembersService {
  constructor(
    @InjectRepository(SupportMember)
    private readonly supportMembersRepository: Repository<SupportMember>,
  ) {}

  async getAll(): Promise<SupportMember[]> {
    return this.supportMembersRepository.find();
  }

  async findByEmail(email: string) {
    return this.supportMembersRepository.findOne({ where: { email } });
  }

  async create({
    name,
    password,
    email,
  }: CreateSupportMemberDto): Promise<SupportMember> {
    const supportMember = new SupportMember();
    supportMember.name = name;
    supportMember.password = password;
    supportMember.email = email;

    return this.supportMembersRepository.save(supportMember);
  }

  async update(
    id: number,
    updateSupportMemberDto: UpdateSupportMemberDto,
  ): Promise<SupportMember> {
    const currentSupportMember = await this.supportMembersRepository.findOneBy({
      id,
    });

    const updatedSupportMember = this.supportMembersRepository.merge(
      currentSupportMember,
      updateSupportMemberDto,
    );

    return this.supportMembersRepository.save(updatedSupportMember);
  }

  async delete(id: number) {
    return this.supportMembersRepository.delete({ id });
  }
}
