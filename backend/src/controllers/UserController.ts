import { Request, Response } from "express";
import { IUserService } from "../interfaces/services/IUserService";
import { RoleRepository } from "../repositories/RoleRepository";
import { UserAccountRepository } from "../repositories/UserAccountRepository";
import { Cryptography } from "../service/CryptographyGateway";
import { UserService } from "../service/UserService";
import { IWhoRequestThis } from "../interfaces/common/IWhoRequestThis";
import { WhoRequestThis } from "../utils/whoRequestThis";
import { TokenGateway } from "../service/TokenGateway";

export class UserController{
    private userService: IUserService;
    private whoRequestThis: IWhoRequestThis;

    constructor(){
        this.userService = new UserService(
            UserAccountRepository,
            RoleRepository,
            new Cryptography()
        );

        this.whoRequestThis = new WhoRequestThis(
            new TokenGateway()
        );
    }

    public async create(req: Request, res: Response): Promise<Response> {
        const {
            firstName,
            lastName,
            email,
            password,
            phoneNumber,
            roleId,
            isActive
        } = req.body;

        if(
            !firstName ||
            !lastName ||
            !email || 
            !password ||
            !roleId
        )
            throw new Error("O Nome, Sobrenome, Email, Senha e função são todos obrigatórios");

        try{
            await this.userService.create({
                firstName,
                lastName,
                email,
                password,
                phoneNumber,
                roleId,
                isActive
            });

            return res.status(201).json({message: "Usuário criado com sucesso"});
        }
        catch(error){
            return res.status(500).json({message: error.message})
        }
    }

    public async getAll(req: Request, res: Response): Promise<Response> {
        try{
            const results = await this.userService.getAll();
            return res.status(200).json({data: results});
        }
        catch(error){
            return res.status(500).json({message: error.message})
        }
    }

    public async getById(req: Request, res: Response): Promise<Response> {
        const { userAccountId } = req.params;

        if(!userAccountId)
            return res.status(400).json({message: "O Id do usuário é necessário para poder visualizar"});
        
        try{
            const user = await this.userService.getById(parseInt(userAccountId));

            return res.status(200).json({data: user});
        }
        catch(error){
            return res.status(500).json({message: error.message})
        }
    }

    public async getMyProfile(req: Request, res: Response): Promise<Response> {
        const userAccountId = this.whoRequestThis.getUserAccountIdByThisRequest(req);

        if(!userAccountId)
            return res.status(400).json({message: "Para visualizar seu perfil precisa do seu Id"});
        
        try{
            const user = await this.userService.getById(userAccountId);

            return res.status(200).json({data: user});
        }
        catch(error){
            return res.status(500).json({message: error.message})
        }
    }
}