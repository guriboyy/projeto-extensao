import { Request, Response } from "express";
import { EventBoardService } from "../service/EventBoardService";

export class EventBoardController {

  private service: EventBoardService;

  constructor() {
    this.service = new EventBoardService();
  }

  public async create(req: Request, res: Response): Promise<Response> {
    try {
      const userId = (req as any).auth?.userAccountId ?? (req as any).auth?.userId;
      if (!userId) {
        return res.status(401).json({ message: "Usuário não autenticado." });
      }

      const created = await this.service.create(req.body, Number(userId));
      return res.status(201).json({ data: created });
    } catch (error: any) {
      return res.status(400).json({ message: error?.message ?? "Falha ao criar evento." });
    }
  }

  public async list(req: Request, res: Response): Promise<Response> {
    try {
      const result = await this.service.list(req.query as any);
      return res.status(200).json({ data: result });
    } catch (error: any) {
      return res.status(500).json({ message: error?.message ?? "Falha ao listar eventos." });
    }
  }

  public async getById(req: Request, res: Response): Promise<Response> {
    try {
      const id = Number(req.params.id);
      if (Number.isNaN(id)) {
        return res.status(400).json({ message: "Parâmetro id inválido." });
      }

      const event = await this.service.getById(id);
      if (!event) {
        return res.status(404).json({ message: "Evento não encontrado." });
      }

      return res.status(200).json({ data: event });
    } catch (error: any) {
      return res.status(500).json({ message: error?.message ?? "Falha ao buscar evento." });
    }
  }

  public async update(req: Request, res: Response): Promise<Response> {
    try {
      const id = Number(req.params.id);
      if (Number.isNaN(id)) {
        return res.status(400).json({ message: "Parâmetro id inválido." });
      }

      const userId = (req as any).auth?.userAccountId ?? (req as any).auth?.userId;
      if (!userId) {
        return res.status(401).json({ message: "Usuário não autenticado." });
      }

      const updated = await this.service.update(id, req.body, Number(userId));
      return res.status(200).json({ data: updated });
    } catch (error: any) {
      return res.status(400).json({ message: error?.message ?? "Falha ao atualizar evento." });
    }
  }

  public async publish(req: Request, res: Response): Promise<Response> {
    try {
      const id = Number(req.params.id);
      if (Number.isNaN(id)) {
        return res.status(400).json({ message: "Parâmetro id inválido." });
        }

      const userId = (req as any).auth?.userAccountId ?? (req as any).auth?.userId;
      if (!userId) {
        return res.status(401).json({ message: "Usuário não autenticado." });
      }

      const result = await this.service.publish(id, Number(userId));
      return res.status(200).json({ data: result });
    } catch (error: any) {
      return res.status(400).json({ message: error?.message ?? "Falha ao publicar evento." });
    }
  }

  public async cancel(req: Request, res: Response): Promise<Response> {
    try {
      const id = Number(req.params.id);
      if (Number.isNaN(id)) {
        return res.status(400).json({ message: "Parâmetro id inválido." });
      }

      const userId = (req as any).auth?.userAccountId ?? (req as any).auth?.userId;
      if (!userId) {
        return res.status(401).json({ message: "Usuário não autenticado." });
      }

      const result = await this.service.cancel(id, Number(userId));
      return res.status(200).json({ data: result });
    } catch (error: any) {
      return res.status(400).json({ message: error?.message ?? "Falha ao cancelar evento." });
    }
  }

  public async remove(req: Request, res: Response): Promise<Response> {
    try {
      const id = Number(req.params.id);
      if (Number.isNaN(id)) {
        return res.status(400).json({ message: "Parâmetro id inválido." });
      }

      await this.service.remove(id);
      return res.status(204).send();
    } catch (error: any) {
      return res.status(400).json({ message: error?.message ?? "Falha ao remover evento." });
    }
  }
}
