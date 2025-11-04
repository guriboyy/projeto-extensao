import express from 'express';
import { UserController } from "../controllers/UserController";
import { PasswordResetCodeController } from '../controllers/PasswordResetCodeController';
import { checkAuthenticated } from '../middleware/middleware';

const router = express.Router();
const userController = new UserController();
const passwordResetCOdeController = new PasswordResetCodeController();

router.post('/create', checkAuthenticated(["Admin"]), (req, res) => {    
    userController.create(req,res)
});

router.get('/get-all', checkAuthenticated(["Admin"]), (req, res) => {
    userController.getAll(req, res);
});

router.get('/get/:userAccountId', checkAuthenticated(["Admin"]), (req, res) => {
    userController.getById(req, res);
});

router.put('/update/:userAccountId', checkAuthenticated(["Admin"]), (req, res) => {
    userController.update(req, res);
});

router.get('/get/my-profile', checkAuthenticated(["Admin", "Obreiro", "Membro"]), (req, res) => {
    userController.getMyProfile(req, res);
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