export interface IRefreshTokenService{
    create: (userAccountId: number) => Promise<string>;
    validate: (refreshToken: string) => Promise<boolean>;
    revokeAllToken: (userAccountId: number) => Promise<void>;
}