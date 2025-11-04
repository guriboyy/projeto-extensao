import express from 'express';
import { VibrationController } from '../controllers/VibrationController';
import { checkAuthenticated } from '../middleware/middleware';

const router = express.Router();
const vibrationController = new VibrationController ();

router.post('/request-vibration', checkAuthenticated(["Admin", "Obreiro", "Membro"]), (req, res) => {    
    vibrationController.create(req,res)
});

router.get('/get-all', checkAuthenticated(["Admin"]), (req, res) => {
    vibrationController.getAll(req, res);
});


export {router};