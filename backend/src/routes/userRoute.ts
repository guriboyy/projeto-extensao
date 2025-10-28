import express from 'express';
import { UserController } from "../controllers/UserController";

const router = express.Router();
const userController = new UserController();

router.post('/create', (req, res) => {    
    userController.create(req,res)
});

router.get('/get-all', (req, res) => {
    userController.getAll(req, res);
});

router.get('/get/:userAccountId', (req, res) => {
    userController.getById(req, res);
});

export {router};