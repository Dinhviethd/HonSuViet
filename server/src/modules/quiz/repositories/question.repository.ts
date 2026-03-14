import { Repository } from 'typeorm';
import { AppDataSource } from '@/configs/database.config';
import { Question } from '@/modules/quiz/entities/question.entity';
import { CreateQuestionInput, UpdateQuestionInput } from '@/modules/quiz/schemas/quiz.schema';

export class QuestionRepository {
  private repository: Repository<Question>;

  constructor() {
    this.repository = AppDataSource.getRepository(Question);
  }

  async findByQuizId(idQuiz: string): Promise<Question[]> {
    return this.repository.find({
      where: {
        quiz: { idQuiz },
      },
      relations: {
        quiz: true,
      },
      order: {
        idQuestion: 'ASC',
      },
    });
  }

  async findById(idQuestion: string): Promise<Question | null> {
    return this.repository.findOne({
      where: { idQuestion },
      relations: {
        quiz: true,
      },
    });
  }

  async create(data: CreateQuestionInput): Promise<Question> {
    const question = this.repository.create({
      content: data.content,
      explanation: data.explanation,
      quiz: { idQuiz: data.idQuiz } as Question['quiz'],
    });

    return this.repository.save(question);
  }

  async update(idQuestion: string, data: UpdateQuestionInput): Promise<Question | null> {
    const existing = await this.findById(idQuestion);
    if (!existing) {
      return null;
    }

    if (data.content !== undefined) existing.content = data.content;
    if (data.explanation !== undefined) existing.explanation = data.explanation;

    await this.repository.save(existing);
    return this.findById(idQuestion);
  }

  async delete(idQuestion: string): Promise<boolean> {
    const result = await this.repository.delete(idQuestion);
    return (result.affected ?? 0) > 0;
  }
}

export const questionRepository = new QuestionRepository();
