import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
@Entity('levels_config')
export class LevelConfig {
  @PrimaryGeneratedColumn('uuid')
  idLevel!: string;

  @Column({ type: 'int', unique: true })
  level!: number; 

  @Column({ type: 'int' })
  minXp!: number;

  @Column()
  title!: string;
}