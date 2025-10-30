// backend/src/routes/eventboard.routes.ts
import express from "express";
import { EventBoardController } from "../controllers/EventBoardController";

const router = express.Router();
const eventController = new EventBoardController();

// criar
router.post("/create", (req, res) => eventController.create(req, res));

// listar todos (com filtros via query)
router.get("/get-all", (req, res) => eventController.list(req, res));

// obter por id
router.get("/get/:id", (req, res) => eventController.getById(req, res));

// atualizar
router.put("/update/:id", (req, res) => eventController.update(req, res));

// publicar / cancelar
router.post("/publish/:id", (req, res) => eventController.publish(req, res));
router.post("/cancel/:id", (req, res) => eventController.cancel(req, res));

// excluir (soft delete)
router.delete("/delete/:id", (req, res) => eventController.remove(req, res));

export { router };
