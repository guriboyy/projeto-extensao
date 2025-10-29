import { Request, Response } from "express";
import { IRoleService } from "../interfaces/services/IRoleService";
import { RoleService } from "../service/RoleService";
import { UserAccountRepository } from "../repositories/UserAccountRepository";
import { RoleRepository } from "../repositories/RoleRepository";

export class RoleController {

    private roleService: IRoleService;

    constructor(){
        this.roleService = new RoleService(
            UserAccountRepository,
            RoleRepository
        )
    }

    public async getPermissionByUserId(req: Request, res: Response): Promise<Response> {
        const { userAccountId } = req.body;

        if(!userAccountId)
            return res.status(400).json({message: "O Parâmetro userAccountId é obrigatório para recuperar permissões do usuário"});

        try{
            const getPermissions = await this.roleService.getPermissionByUserId(parseInt(userAccountId));
            return res.status(200).json({data: getPermissions});
        }
        catch(error){
            return res.status(500).json({message: error.message});
        }
    }

    public async getAll(req: Request, res: Response): Promise<Response> {
        try{
            const getRoles = await this.roleService.getAll();
            return res.status(200).json({data: getRoles});
        }
        catch(error){
            return res.status(500).json({message: error.message});
        }
    }
}