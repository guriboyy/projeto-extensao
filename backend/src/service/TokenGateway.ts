import {config} from "dotenv";
import { ITokenGateway } from "../interfaces/gateways/ITokenGateway";
import { UserAccount } from "../entities/UserAccount";
import jwt from 'jsonwebtoken';

config();
export class TokenGateway implements ITokenGateway{
    private secretKey: string = process.env.TOKEN_KEY;

    public create(user: UserAccount): string {
        const accessToken = jwt.sign({
            id: user.userAccountId,
            email: user.email,
            isActive: user.isActive
        }, this.secretKey,{
            expiresIn: '5h'
        });

        return accessToken;
    };

    public verify(token: string): any {
        try {
            jwt.verify(token, this.secretKey);
            return true;
        } catch (error) {
            throw new Error('Token inválido ou expirado');
        }
    }
}