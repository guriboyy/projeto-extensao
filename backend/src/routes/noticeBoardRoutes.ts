import express from 'express';
import { NotificationController } from "../controllers/NoticeBoardController";

const router = express.Router();
const noticeBoardController = new NotificationController();

router.post('/create', (req, res) => {    
    noticeBoardController.create(req,res)
});

router.get('/get-all', (req, res) => {
    noticeBoardController.getAll(req, res);
});

router.get('/get/:noticeBoardId', (req, res) => {
    noticeBoardController.getById(req, res);
});

router.put('/update/:noticeBoardId', (req, res) => {
    noticeBoardController.update(req, res);
});

router.delete('/delete/:noticeBoardId', (req, res) => {
    noticeBoardController.delete(req, res);
});

export {router};    