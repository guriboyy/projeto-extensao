import { Request, Response } from "express";
import { EventBoardService } from "../service/EventBoardService"; 

export class EventBoardController {
  private service = new EventBoardService();

  async create(req: Request, res: Response) {
    const userId = (req as any).auth?.userAccountId ?? (req as any).auth?.userId ?? 0;
    const data = await this.service.create(req.body, Number(userId));
    res.status(201).json(data);
  }

  async list(req: Request, res: Response) {
    const data = await this.service.list(req.query as any);
    res.json(data);
  }

  async getById(req: Request, res: Response) {
    const id = Number(req.params.id);
    const data = await this.service.getById(id);
    if (!data) return res.status(404).json({ message: "Not found" });
    res.json(data);
  }

  async update(req: Request, res: Response) {
    const id = Number(req.params.id);
    const userId = (req as any).auth?.userAccountId ?? (req as any).auth?.userId ?? 0;
    const data = await this.service.update(id, req.body, Number(userId));
    res.json(data);
  }

  async publish(req: Request, res: Response) {
    const id = Number(req.params.id);
    const userId = (req as any).auth?.userAccountId ?? (req as any).auth?.userId ?? 0;
    const data = await this.service.publish(id, Number(userId));
    res.json(data);
  }

  async cancel(req: Request, res: Response) {
    const id = Number(req.params.id);
    const userId = (req as any).auth?.userAccountId ?? (req as any).auth?.userId ?? 0;
    const data = await this.service.cancel(id, Number(userId));
    res.json(data);
  }

  async remove(req: Request, res: Response) {
    const id = Number(req.params.id);
    await this.service.remove(id);
    res.status(204).send();
  }
}
