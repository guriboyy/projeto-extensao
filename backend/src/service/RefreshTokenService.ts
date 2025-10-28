import { Repository } from "typeorm";
import { RefreshToken } from "../entities/RefreshToken";
import { IRefreshTokenService } from "../interfaces/services/IRefreshTokenService";

export class RefreshTokenService implements IRefreshTokenService{

    constructor(
        private refreshTokenRepository: Repository<RefreshToken>
    ){}

    public async create(userAccountId: number): Promise<string> {
        const token = this.createStringBase64(44);

        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + 7);

        const refreshToken = this.refreshTokenRepository.create({
            token,
            userAccountId,
            expirationDate,
            isRevoked: false,
        });

        await this.refreshTokenRepository.save(refreshToken);
        return token;
    };


    public async validate(refreshToken: string): Promise<boolean>{
        const tokenEntity = await this.refreshTokenRepository.findOne({
            where: { token: refreshToken },
        });

        if (
            !tokenEntity ||
            tokenEntity.isRevoked ||
            tokenEntity.expirationDate < new Date()
        ) {
            return false;
        }

        return true;
    }

    public async revokeAllToken(userAccountId: number): Promise<void>{
        await this.refreshTokenRepository.update(
            { userAccountId: userAccountId, isRevoked: false },
            { isRevoked: true }
        );
    }

    private createStringBase64(length) {
        const bytes = new Uint8Array(length);
        crypto.getRandomValues(bytes);
        return btoa(String.fromCharCode(...bytes));
    }
}