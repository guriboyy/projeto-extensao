import { Repository } from "typeorm";
import { UserAccount } from "../entities/UserAccount";
import { IAuthService } from "../interfaces/services/IAuthService";
import { IEncryptionGateway } from "../interfaces/gateways/IEncryptionGateway";
import { ITokenGateway } from "../interfaces/gateways/ITokenGateway";
import { IRefreshTokenService } from "../interfaces/services/IRefreshTokenService";
import { authResponseDTO } from "../dtos/responses/auth/authResponseDTO";

export class AuthService implements IAuthService{

    constructor(
        private userRepository: Repository<UserAccount>,
        private encryptionGateway: IEncryptionGateway,
        private tokenGateway: ITokenGateway,
        private refreshTokenService: IRefreshTokenService
    ){}

    async signIn(email: string, password: string){
        console.log(email)
        const findUser = await this.userRepository.findOne({
            where: {email},
            relations: {
                role: true
            }
        });
        console.log(findUser);
        if(!findUser)
            throw new Error("Usuário ou senha inválidos!");
        console.log(2)
        if(!findUser.isActive)
            throw new Error("Usuário inativo");
        console.log(3)
        const isMathPassword = await this.encryptionGateway.match(password, findUser.password);
        
        // if(!isMathPassword)
        //     throw new Error("Usuário ou senha inválidos!");
        console.log(4)
        await this.refreshTokenService.revokeAllToken(findUser.userAccountId);
        const tokens: authResponseDTO = {
            accessToken: this.tokenGateway.create(findUser),
            refreshToken: await this.refreshTokenService.create(findUser.userAccountId),
            userAccountId: findUser.userAccountId
        };
        console.log(tokens);
        return tokens;
    }

    public async renewTokens(userAccountId: number, refreshToken: string): Promise<authResponseDTO>{
        const findUser = await this.userRepository.findOne({
            where: {userAccountId},
            relations: {
                role: true
            }
        });
        const isValidRefreshToken = await this.refreshTokenService.validate(refreshToken);

        if(!isValidRefreshToken || !findUser)
            throw new Error("Token inválido ou Expirado");

        await this.refreshTokenService.revokeAllToken(findUser.userAccountId);

        const tokens: authResponseDTO = {
            accessToken: this.tokenGateway.create(findUser),
            refreshToken: await this.refreshTokenService.create(findUser.userAccountId),
            userAccountId: findUser.userAccountId
        };

        return tokens;
    }

    public async isValidAccessToken(accessToken: string): Promise<boolean>{
        try{
            const isValid = await this.tokenGateway.verify(accessToken);
            return isValid;
        }
        catch(error){
            return false;
        }
    }
}