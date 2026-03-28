import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Lesson } from './lesson.entity';
import { User } from '../../auth/entities/user.model';
@Entity('user_lesson_progress')
export class UserLessonProgress {
  @PrimaryGeneratedColumn('uuid')
  idProgress!: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'idUser' })
  user!: User;

  @ManyToOne(() => Lesson, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'idLesson' })
  lesson!: Lesson;

  @Column({ type: 'enum', enum: ['unlocked', 'in_progress', 'completed'], default: 'unlocked' })
  status!: string;

  @Column({ type: 'timestamp', nullable: true })
  completedAt?: Date;
}