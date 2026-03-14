import { Repository } from 'typeorm';
import { AppDataSource } from '@/configs/database.config';
import { XpTransaction } from '@/modules/gamification/entities/xp_transactions.entity';
import { CreateXpTransactionInput, UpdateXpTransactionInput } from '@/modules/gamification/schemas/gamification.schema';
import { createPaginationQuery, PaginationResult, PaginationUtil } from '@/utils/pagination';

export class XpTransactionRepository {
  private repository: Repository<XpTransaction>;

  constructor() {
    this.repository = AppDataSource.getRepository(XpTransaction);
  }

  async findById(idTransaction: string): Promise<XpTransaction | null> {
    return this.repository.findOne({
      where: { idTransaction },
      relations: {
        user: true,
      },
    });
  }

  async findByUserId(idUser: string): Promise<XpTransaction[]> {
    return this.repository.find({
      where: {
        user: { idUser },
      },
      relations: {
        user: true,
      },
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findByUserIdPaginated(
    idUser: string,
    page: number,
    limit: number
  ): Promise<PaginationResult<XpTransaction>> {
    const { skip, take } = createPaginationQuery(page, limit);
    const [data, total] = await this.repository.findAndCount({
      where: {
        user: { idUser },
      },
      relations: {
        user: true,
      },
      order: {
        createdAt: 'DESC',
      },
      skip,
      take,
    });

    return PaginationUtil.createPagination(data, total, page, limit);
  }

  async create(data: CreateXpTransactionInput): Promise<XpTransaction> {
    const transaction = this.repository.create({
      user: { idUser: data.idUser } as XpTransaction['user'],
      actionType: data.actionType,
      referenceId: data.referenceId,
      xpEarned: data.xpEarned,
    });

    return this.repository.save(transaction);
  }

  async update(idTransaction: string, data: UpdateXpTransactionInput): Promise<XpTransaction | null> {
    const existing = await this.findById(idTransaction);
    if (!existing) {
      return null;
    }

    if (data.actionType !== undefined) existing.actionType = data.actionType;
    if (data.referenceId !== undefined) existing.referenceId = data.referenceId;
    if (data.xpEarned !== undefined) existing.xpEarned = data.xpEarned;

    await this.repository.save(existing);
    return this.findById(idTransaction);
  }

  async delete(idTransaction: string): Promise<boolean> {
    const result = await this.repository.delete(idTransaction);
    return (result.affected ?? 0) > 0;
  }
}

export const xpTransactionRepository = new XpTransactionRepository();
