import { Request, response, Response } from "express";
import { IAuthService } from "../interfaces/services/IAuthService";
import { AuthService } from "../service/AuthService";
import { UserAccountRepository } from "../repositories/UserAccountRepository";
import { Cryptography } from "../service/CryptographyGateway";
import { TokenGateway } from "../service/TokenGateway";
import { RefreshTokenService } from "../service/RefreshTokenService";
import { RefreshTokenRepository } from "../repositories/RefreshTokenRepository";

export class AuthController{

    private authService: IAuthService;

    constructor(){
        this.authService = new AuthService(
            UserAccountRepository,
            new Cryptography(),
            new TokenGateway(),
            new RefreshTokenService(RefreshTokenRepository)
        );
    }

    public async login(req: Request, res: Response): Promise<Response> {      
        const { email, password } = req.body;

        try{
            if(!email || !password)
                throw new Error("Email e Senha são obrigatórios para autenticação");

            const result = await this.authService.signIn(email, password);

            return res.status(200).json(result);
        }
        catch(error){
            return res.status(500).json({message: error.message})
        }
    }

    public async renewTokens(req: Request, res: Response): Promise<Response> {
        const { userAccountId, refreshToken } = req.body;

        try{
            if(!userAccountId || !refreshToken)
                throw new Error("Id do usuário e refresh token são obrigatórios para renovação dos tokens");

            const result = await this.authService.renewTokens(userAccountId, refreshToken);

            return res.status(200).json(result); 
        }
        catch(error){
            return res.status(500).json({message: error.message})
        }
    }

    public async verifyAccessToken(req: Request, res: Response): Promise<Response> {
        const { accessToken } = req.body;

        try{
            if(!accessToken)
                throw new Error("Access token é obrigatório para validação");

            const result = await this.authService.isValidAccessToken(accessToken);

            return res.status(200).json({isValid: result}); 
        }
        catch(error){
            return res.status(500).json({message: error.message})
        }
    }
}