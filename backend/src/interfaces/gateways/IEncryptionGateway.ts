export interface IEncryptionGateway{
    encrypt: (passwordRaw: string) => Promise<string>;
    match: (passwordRaw: string, passwordEncrypt: string) => Promise<boolean>;
}