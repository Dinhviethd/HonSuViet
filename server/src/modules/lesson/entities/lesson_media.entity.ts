import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Lesson } from './lesson.entity';
@Entity('lesson_media')
export class LessonMedia {
  @PrimaryGeneratedColumn('uuid')
  idMedia!: string;

  @ManyToOne(() => Lesson, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'idLesson' })
  lesson!: Lesson;

  @Column({ type: 'enum', enum: ['video', 'image', 'document'] })
  mediaType!: string;

  @Column()
  mediaUrl!: string;

  @Column({ nullable: true })
  caption?: string;

  @Column({ type: 'int', default: 0 })
  orderIndex!: number;
}