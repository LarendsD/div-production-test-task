import { encrypt } from '../../common/secure/encrypt';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('support_members')
export class SupportMember {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 30 })
  name: string;

  @Column({ unique: true, type: 'varchar', length: 80 })
  email: string;

  @Column()
  password: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @BeforeInsert()
  async hashPassword?() {
    this.password = encrypt(this.password);
  }

  @BeforeUpdate()
  async hashPasswordIfNew?() {
    this.password = encrypt(this.password);
  }
}
