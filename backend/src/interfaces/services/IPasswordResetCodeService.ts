export interface IPasswordResetCodeService {
    createCode: (email: string) => Promise<string>;
    validateCode: (email: string, codeRaw: string) => Promise<boolean>;
    resetPassword: (email: string, newPassword: string, codeRaw: string) => Promise<string>;
}