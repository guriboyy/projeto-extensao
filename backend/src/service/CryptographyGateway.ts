import { IEncryptionGateway } from "../interfaces/gateways/IEncryptionGateway";
import bcrypt from 'bcrypt';

export class Cryptography implements IEncryptionGateway{
    private numSalt: number = 12;

    public async encrypt(passwordRaw: string){
        let salt = await bcrypt.genSalt(this.numSalt);
        let passwordEncoded = await bcrypt.hash(passwordRaw, salt);

        return passwordEncoded;
    };

    public async match(passwordRaw: string, passwordEncrypt: string){
        let result = await bcrypt.compare(passwordRaw, passwordEncrypt);
        return result;
    };
}