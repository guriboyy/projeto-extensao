import { Request, Response } from "express";
import { IRoleService } from "../interfaces/services/IRoleService";
import { RoleService } from "../service/RoleService";
import { UserAccountRepository } from "../repositories/UserAccountRepository";
import { RoleRepository } from "../repositories/RoleRepository";
import { IWhoRequestThis } from "../interfaces/common/IWhoRequestThis";
import { WhoRequestThis } from "../utils/whoRequestThis";
import { TokenGateway } from "../service/TokenGateway";

export class RoleController {
    private roleService: IRoleService;
    private whoRequestThis: IWhoRequestThis;

    constructor(){
        this.roleService = new RoleService(
            UserAccountRepository,
            RoleRepository
        );

        this.whoRequestThis = new WhoRequestThis(
            new TokenGateway()
        );
    }

    public async getPermissionByUserId(req: Request, res: Response): Promise<Response> {
        const userAccountId = this.whoRequestThis.getUserAccountIdByThisRequest(req);

        if(!userAccountId)
            return res.status(400).json({message: "O Parâmetro userAccountId é obrigatório para recuperar permissões do usuário"});

        try{
            const getPermissions = await this.roleService.getPermissionByUserId(userAccountId);
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