import express from 'express';
import { RoleController } from '../controllers/RoleController';
import { checkAuthenticated } from '../middleware/middleware';

const router = express.Router();
const roleController = new RoleController ();

router.post('/get-all-permissions-by-user', checkAuthenticated(["Admin", "Obreiro", "Membro"]), (req, res) => {    
    roleController.getPermissionByUserId(req,res)
});

router.get('/get-all', checkAuthenticated(["Admin"]), (req, res) => {
    roleController.getAll(req, res);
});


export {router};