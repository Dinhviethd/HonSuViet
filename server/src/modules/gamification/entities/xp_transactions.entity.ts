import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../auth/entities/user.model';
@Entity('xp_transactions')
export class XpTransaction {
  @PrimaryGeneratedColumn('uuid')
  idTransaction!: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'idUser' })
  user!: User;

  @Column()
  actionType!: string;

  @Column({ type: 'uuid', nullable: true })
  referenceId?: string; 

  @Column({ type: 'int' })
  xpEarned!: number;

  @CreateDateColumn()
  createdAt!: Date;
}