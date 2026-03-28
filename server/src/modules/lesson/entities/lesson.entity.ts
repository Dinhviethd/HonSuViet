import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Chapter } from './chapter.entity';
import { User } from '../../auth/entities/user.model';
@Entity('lessons')
export class Lesson {
  @PrimaryGeneratedColumn('uuid')
  idLesson!: string;

  @ManyToOne(() => Chapter, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'idChapter' })
  chapter!: Chapter;

  @ManyToOne(() => User, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'authorId' })
  author?: User;

  @Column()
  title!: string;

  @Column({ nullable: true })
  timeTag?: string;

  @Column({ type: 'int', default: 0 })
  durationMinutes!: number;

  @Column({ type: 'jsonb', nullable: true })
  contentBody?: any;

  @Column({ type: 'int', default: 0 })
  orderIndex!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}