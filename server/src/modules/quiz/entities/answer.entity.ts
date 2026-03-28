import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Question } from './question.entity';
@Entity('answers')
export class Answer {
  @PrimaryGeneratedColumn('uuid')
  idAnswer!: string;

  @ManyToOne(() => Question, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'idQuestion' })
  question!: Question;

  @Column()
  content!: string;

  @Column({ type: 'boolean', default: false })
  isCorrect!: boolean;
}