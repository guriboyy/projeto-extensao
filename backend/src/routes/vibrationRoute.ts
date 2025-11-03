import express from 'express';
import { VibrationController } from '../controllers/VibrationController';

const router = express.Router();
const vibrationController = new VibrationController ();

router.post('/request-vibration', (req, res) => {    
    vibrationController.create(req,res)
});

router.get('/get-all', (req, res) => {
    vibrationController.getAll(req, res);
});


export {router};