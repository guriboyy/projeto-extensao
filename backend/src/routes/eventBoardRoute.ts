import express from 'express';
import { EventBoardController } from '../controllers/EventBoardController';

const router = express.Router();
const eventBoardController = new EventBoardController();

router.get('/get-all', (req, res) => {
    eventBoardController.getAll(req, res);
});

router.get('/get/:eventBoardId', (req, res) => {    
    eventBoardController.getbyId(req,res)
});

router.post('/create', (req, res) => {
    eventBoardController.create(req, res);
});

router.put('/update/:eventBoardId', (req, res) => {
    eventBoardController.update(req, res);
});

router.delete('/delete/:eventBoardId', (req, res) => {
    eventBoardController.delete(req, res);
});

export {router};