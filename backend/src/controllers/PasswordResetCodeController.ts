import { Request, Response } from "express";
import { IPasswordResetCodeService } from "../interfaces/services/IPasswordResetCodeService";
import { PasswordResetCodeRepository } from "../repositories/PasswordResetCodeRepository";
import { UserAccountRepository } from "../repositories/UserAccountRepository";
import { Cryptography } from "../service/CryptographyGateway";
import { PasswordResetCodeService } from "../service/PasswordResetCodeService";
import { EmailGateway } from "../service/EmailGateway";

export class PasswordResetCodeController{
    private passwordResetCodeService: IPasswordResetCodeService;

    constructor(){
        this.passwordResetCodeService = new PasswordResetCodeService(
            UserAccountRepository,
            PasswordResetCodeRepository,
            new Cryptography(),
            new EmailGateway()
        );

    }

    public async sendCode(req: Request, res: Response): Promise<Response>{
        const { email } = req.body;

        if(!email)
            return res.status(400).json({message: "O email é obrigtatório para recuperação de senha"});
        
        try{
            const response = await this.passwordResetCodeService.createCode(email);
            return res.status(201).json({data: response});
        }
        catch(error){
            return res.status(500).json({message: error.message});
        }
    }

    public async validateCode(req: Request, res: Response): Promise<Response>{
        const { email, codeRaw } = req.body;
        
        if(!email || !codeRaw)
            return res.status(400).json({message: "Para validar o código é necessário o email e o código chegado no seu email"});
        
        try{
            const isValid = await this.passwordResetCodeService.validateCode(email, codeRaw);
            return res.status(200).json({data: isValid});
        }
        catch(error){
            return res.status(500).json({message: error.message});
        }
    }

    public async resetPassword(req: Request, res: Response): Promise<Response>{
        const { email, codeRaw, newPassword } = req.body;
        
        if(!email || !codeRaw || !newPassword)
            return res.status(400).json({message: "Para trocar a senha é necessário o email, código chegado no seu email e nova senha"});
        
        try{
            const response = await this.passwordResetCodeService.resetPassword(email, newPassword, codeRaw);
            return res.status(200).json({data: response});
        }
        catch(error){
            return res.status(500).json({message: error.message});
        }
    }
}