import { authResponseDTO } from "../../dtos/responses/auth/authResponseDTO";

export interface IAuthService{
    signIn: (email: string, password: string) => Promise<authResponseDTO>;
    renewTokens:(userAccountId: number, refreshToken: string) => Promise<authResponseDTO>;
    isValidAccessToken:(accessToken: string) => Promise<boolean>;
}