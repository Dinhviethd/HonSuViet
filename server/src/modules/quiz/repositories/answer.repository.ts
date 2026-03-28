import { Repository } from 'typeorm';
import { AppDataSource } from '@/configs/database.config';
import { Answer } from '@/modules/quiz/entities/answer.entity';
import { CreateAnswerInput, UpdateAnswerInput } from '@/modules/quiz/schemas/quiz.schema';

export class AnswerRepository {
  private repository: Repository<Answer>;

  constructor() {
    this.repository = AppDataSource.getRepository(Answer);
  }

  async findByQuestionId(idQuestion: string): Promise<Answer[]> {
    return this.repository.find({
      where: {
        question: { idQuestion },
      },
      relations: {
        question: true,
      },
      order: {
        idAnswer: 'ASC',
      },
    });
  }

  async findById(idAnswer: string): Promise<Answer | null> {
    return this.repository.findOne({
      where: { idAnswer },
      relations: {
        question: true,
      },
    });
  }

  async create(data: CreateAnswerInput): Promise<Answer> {
    const answer = this.repository.create({
      content: data.content,
      isCorrect: data.isCorrect ?? false,
      question: { idQuestion: data.idQuestion } as Answer['question'],
    });

    return this.repository.save(answer);
  }

  async update(idAnswer: string, data: UpdateAnswerInput): Promise<Answer | null> {
    const existing = await this.findById(idAnswer);
    if (!existing) {
      return null;
    }

    if (data.content !== undefined) existing.content = data.content;
    if (data.isCorrect !== undefined) existing.isCorrect = data.isCorrect;

    await this.repository.save(existing);
    return this.findById(idAnswer);
  }

  async delete(idAnswer: string): Promise<boolean> {
    const result = await this.repository.delete(idAnswer);
    return (result.affected ?? 0) > 0;
  }
}

export const answerRepository = new AnswerRepository();
