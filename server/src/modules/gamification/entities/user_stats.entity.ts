import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
import { LevelConfig } from './level_config.entity';
import { User } from '../../auth/entities/user.model';
@Entity('user_stats')
export class UserStat {
  @PrimaryGeneratedColumn('uuid')
  idStat!: string;

  @OneToOne(() => User, user => user.stats, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'idUser' }) 
  user!: User;

  @Column({ type: 'int', default: 0 })
  totalXp!: number;

  @ManyToOne(() => LevelConfig)
  @JoinColumn({ name: 'idLevel' })
  currentLevel!: LevelConfig;

  @Column({ type: 'int', default: 100 })
  energy!: number;

  @Column({ type: 'int', default: 0 })
  streakDays!: number;

  @UpdateDateColumn()
  updatedAt!: Date;
}