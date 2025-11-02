import express from 'express';
import { UserController } from "../controllers/UserController";
import { PasswordResetCodeController } from '../controllers/PasswordResetCodeController';

const router = express.Router();
const userController = new UserController();
const passwordResetCOdeController = new PasswordResetCodeController();

router.post('/create', (req, res) => {    
    userController.create(req,res)
});

router.get('/get-all', (req, res) => {
    userController.getAll(req, res);
});

router.get('/get/:userAccountId', (req, res) => {
    userController.getById(req, res);
});

router.post('/forget-password/send-code', (req, res) => {    
    passwordResetCOdeController.sendCode(req,res)
});

router.post('/forget-password/validate-code', (req, res) => {    
    passwordResetCOdeController.validateCode(req,res)
});

router.post('/forget-password/reset-password', (req, res) => {    
    passwordResetCOdeController.resetPassword(req,res)
});
export {router};