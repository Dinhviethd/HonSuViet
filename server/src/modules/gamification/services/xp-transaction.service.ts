import { xpTransactionRepository, XpTransactionRepository } from '@/modules/gamification/repositories/xp-transaction.repository';
import { CreateXpTransactionInput, UpdateXpTransactionInput } from '@/modules/gamification/schemas/gamification.schema';
import { XpTransaction } from '@/modules/gamification/entities/xp_transactions.entity';
import { PaginationResult } from '@/utils/pagination';
import { AppError } from '@/utils/error.response';

export class XpTransactionService {
  private repo: XpTransactionRepository;

  constructor() {
    this.repo = xpTransactionRepository;
  }

  async getById(idTransaction: string): Promise<XpTransaction> {
    const tx = await this.repo.findById(idTransaction);
    if (!tx) throw new AppError(404, 'XP transaction không tồn tại');
    return tx;
  }

  async getByUser(idUser: string): Promise<XpTransaction[]> {
    return this.repo.findByUserId(idUser);
  }

  async getByUserPaginated(idUser: string, page: number, limit: number): Promise<PaginationResult<XpTransaction>> {
    return this.repo.findByUserIdPaginated(idUser, page, limit);
  }

  async create(data: CreateXpTransactionInput): Promise<XpTransaction> {
    return this.repo.create(data);
  }

  async update(idTransaction: string, data: UpdateXpTransactionInput): Promise<XpTransaction> {
    const updated = await this.repo.update(idTransaction, data);
    if (!updated) throw new AppError(404, 'XP transaction không tồn tại');
    return updated;
  }

  async delete(idTransaction: string): Promise<void> {
    const deleted = await this.repo.delete(idTransaction);
    if (!deleted) throw new AppError(404, 'XP transaction không tồn tại');
  }
}

export const xpTransactionService = new XpTransactionService();
