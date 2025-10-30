import { AppDataSource } from "../db/date-source";
import { EventBoard } from "../entities/EventBoard";
import { CreateEventDTO, UpdateEventDTO, ListEventsFilter } from "../dtos/event.dto";


export class EventBoardService {
  private repo = AppDataSource.getRepository(EventBoard);

  async create(dto: CreateEventDTO, userId: number) {
    const start = new Date(dto.startAt);
    const end = new Date(dto.endAt);
    if (isNaN(start.getTime()) || isNaN(end.getTime()) || start >= end) {
      throw new Error("StartAt must be before EndAt");
    }

    const e = this.repo.create({
      title: dto.title,
      description: dto.description,
      location: dto.location,
      startAt: start,
      endAt: end,
      status: "DRAFT",
      visibility: dto.visibility ?? "PUBLIC",
      category: dto.category,
      createdByUserAccountId: userId,
    });

    return this.repo.save(e);
  }

  async update(id: number, dto: UpdateEventDTO, userId: number) {
    const current = await this.repo.findOne({ where: { eventBoardId: id, deletedAt: null } });
    if (!current) throw new Error("Not found");

    if (dto.startAt && dto.endAt) {
      const s = new Date(dto.startAt);
      const e = new Date(dto.endAt);
      if (isNaN(s.getTime()) || isNaN(e.getTime()) || s >= e) {
        throw new Error("StartAt must be before EndAt");
      }
      current.startAt = s;
      current.endAt = e;
    }

    if (dto.title !== undefined) current.title = dto.title;
    if (dto.description !== undefined) current.description = dto.description;
    if (dto.location !== undefined) current.location = dto.location;
    if (dto.visibility !== undefined) current.visibility = dto.visibility as any;
    if (dto.category !== undefined) current.category = dto.category;
    if (dto.status !== undefined) current.status = dto.status as any;

    current.updatedByUserAccountId = userId;
    return this.repo.save(current);
  }

  async getById(id: number) {
    return this.repo.findOne({ where: { eventBoardId: id, deletedAt: null } });
  }

  async list(filter: ListEventsFilter) {
    const qb = this.repo.createQueryBuilder("e").where("e.DeletedAt IS NULL");

    if (filter.q) qb.andWhere("(e.Title LIKE :q OR e.Description LIKE :q)", { q: `%${filter.q}%` });
    if (filter.status) qb.andWhere("e.Status = :status", { status: filter.status });
    if (filter.visibility) qb.andWhere("e.Visibility = :visibility", { visibility: filter.visibility });
    if (filter.category) qb.andWhere("e.Category = :category", { category: filter.category });
    if (filter.from) qb.andWhere("e.StartAt >= :from", { from: filter.from });
    if (filter.to) qb.andWhere("e.EndAt <= :to", { to: filter.to });

    const page = Number(filter.page ?? 1);
    const pageSize = Number(filter.pageSize ?? 20);
    qb.orderBy("e.StartAt", "ASC").skip((page - 1) * pageSize).take(pageSize);

    const [items, total] = await qb.getManyAndCount();
    return { items, total, page, pageSize };
  }

  async publish(id: number, userId: number) {
    const e = await this.repo.findOne({ where: { eventBoardId: id, deletedAt: null } });
    if (!e) throw new Error("Not found");
    if (e.endAt < new Date()) throw new Error("Cannot publish a past event");
    e.status = "PUBLISHED";
    e.updatedByUserAccountId = userId;
    return this.repo.save(e);
  }

  async cancel(id: number, userId: number) {
    const e = await this.repo.findOne({ where: { eventBoardId: id, deletedAt: null } });
    if (!e) throw new Error("Not found");
    e.status = "CANCELLED";
    e.updatedByUserAccountId = userId;
    return this.repo.save(e);
  }

  async remove(id: number) {
    await this.repo
      .createQueryBuilder()
      .update(EventBoard)
      .set({ deletedAt: () => "CURRENT_TIMESTAMP" })
      .where("EventBoardId = :id AND DeletedAt IS NULL", { id })
      .execute();
    return { success: true };
  }
}
