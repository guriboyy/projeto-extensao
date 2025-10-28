import { Request, Response } from "express";
import { IUserService } from "../interfaces/services/IUserService";
import { RoleRepository } from "../repositories/RoleRepository";
import { UserAccountRepository } from "../repositories/UserAccountRepository";
import { Cryptography } from "../service/CryptographyGateway";
import { UserService } from "../service/UserService";

export class UserController{
    private userService: IUserService;

    constructor(){
        this.userService = new UserService(
            UserAccountRepository,
            RoleRepository,
            new Cryptography()
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
        
        try{
            const user = await this.userService.getById(parseInt(userAccountId));

            return res.status(200).json({data: user});
        }
        catch(error){
            return res.status(500).json({message: error.message})
        }
    }
}