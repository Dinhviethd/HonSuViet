import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../auth/entities/user.model';
import { Quiz } from './quiz.entity';
@Entity('quiz_attempts')
export class QuizAttempt {
  @PrimaryGeneratedColumn('uuid')
  idAttempt!: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'idUser' })
  user!: User;

  @ManyToOne(() => Quiz, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'idQuiz' })
  quiz!: Quiz;

  @Column({ type: 'jsonb', nullable: true })
  questionsLayout?: any;

  @Column({ type: 'jsonb', nullable: true })
  answersData?: any;

  @Column({ type: 'int', default: 0 })
  scorePercentage!: number;

  @Column({ type: 'int', default: 0 })
  correctAnswersCount!: number;

  @Column({ type: 'enum', enum: ['in_progress', 'completed'], default: 'in_progress' })
  status!: string;

  @CreateDateColumn()
  startedAt!: Date;

  @Column({ type: 'timestamp', nullable: true })
  completedAt?: Date;
}