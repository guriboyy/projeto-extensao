import express from 'express';
import { AuthController } from "../controllers/AuthController";

const router = express.Router();
const authController = new AuthController();

router.post('/sign-in', (req, res) => {    
    authController.login(req,res)
});

router.post('/refresh-token', (req, res) => {
    authController.renewTokens(req, res);
});

router.post('/verify/refresh-token', (req, res) => {
    authController.verifyAccessToken(req, res);
});

export {router};