import express from 'express';
import { RoleController } from '../controllers/RoleController';

const router = express.Router();
const roleController = new RoleController ();

router.post('/get-all-permissions-by-user', (req, res) => {    
    roleController.getPermissionByUserId(req,res)
});

router.get('/get-all', (req, res) => {
    roleController.getAll(req, res);
});


export {router};