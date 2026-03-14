import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Quiz } from './quiz.entity';

@Entity('questions')
export class Question {
  @PrimaryGeneratedColumn('uuid')
  idQuestion!: string;

  @ManyToOne(() => Quiz, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'idQuiz' })
  quiz!: Quiz;

  @Column({ type: 'text' })
  content!: string;

  @Column({ type: 'text', nullable: true })
  explanation?: string;
}