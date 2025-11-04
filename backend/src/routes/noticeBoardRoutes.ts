import express from 'express';
import { NotificationController } from "../controllers/NoticeBoardController";
import { checkAuthenticated } from '../middleware/middleware';

const router = express.Router();
const noticeBoardController = new NotificationController();

router.post('/create', checkAuthenticated(["Admin"]), (req, res) => {    
    noticeBoardController.create(req,res)
});

router.get('/get-all', checkAuthenticated(["Admin", "Obreiro", "Membro"]),(req, res) => {
    noticeBoardController.getAll(req, res);
});

router.get('/get/:noticeBoardId', checkAuthenticated(["Admin"]), (req, res) => {
    noticeBoardController.getById(req, res);
});

router.put('/update/:noticeBoardId', checkAuthenticated(["Admin"]), (req, res) => {
    noticeBoardController.update(req, res);
});

router.delete('/delete/:noticeBoardId', checkAuthenticated(["Admin"]), (req, res) => {
    noticeBoardController.delete(req, res);
});

export {router};    