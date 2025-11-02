// backend/src/routes/eventboard.routes.ts
import express from "express";
import { EventBoardController } from "../controllers/EventBoardController";
import { checkAuthenticated } from "../middleware/middleware";


const router = express.Router();
const eventController = new EventBoardController();

// criar — apenas Admin ou Obreiro
router.post("/create", checkAuthenticated(["Admin", "Obreiro"]), (req, res) =>
  eventController.create(req, res)
);

// listar todos (com filtros via query) — qualquer usuário autenticado
router.get("/get-all", checkAuthenticated(["Admin", "Obreiro", "Membro"]), (req, res) =>
  eventController.list(req, res)
);

// obter por id — qualquer usuário autenticado
router.get("/get/:id", checkAuthenticated(["Admin", "Obreiro", "Membro"]), (req, res) =>
  eventController.getById(req, res)
);

// atualizar — Admin ou Obreiro
router.put("/update/:id", checkAuthenticated(["Admin", "Obreiro"]), (req, res) =>
  eventController.update(req, res)
);

// publicar / cancelar — apenas Admin
router.post("/publish/:id", checkAuthenticated(["Admin"]), (req, res) =>
  eventController.publish(req, res)
);
router.post("/cancel/:id", checkAuthenticated(["Admin"]), (req, res) =>
  eventController.cancel(req, res)
);

// excluir (soft delete) — apenas Admin
router.delete("/delete/:id", checkAuthenticated(["Admin"]), (req, res) =>
  eventController.remove(req, res)
);

export { router };
