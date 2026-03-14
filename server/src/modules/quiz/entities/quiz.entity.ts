import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '@/modules/auth/entities/user.model';
import { Chapter } from '../../lesson/entities/chapter.entity';
@Entity('quizzes')
export class Quiz {
  @PrimaryGeneratedColumn('uuid')
  idQuiz!: string;

  @ManyToOne(() => Chapter, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'idChapter' })
  chapter?: Chapter;

  @ManyToOne(() => User, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'authorId' })
  author?: User;

  @Column()
  title!: string;

  @Column({ nullable: true })
  topicTag?: string;

  @Column({ type: 'enum', enum: ['easy', 'medium', 'hard'] })
  difficulty!: string;

  @Column({ type: 'int' })
  timeLimitMinutes!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}