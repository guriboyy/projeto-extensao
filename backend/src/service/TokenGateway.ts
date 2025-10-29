import {config} from "dotenv";
import { ITokenGateway } from "../interfaces/gateways/ITokenGateway";
import { UserAccount } from "../entities/UserAccount";
import jwt from 'jsonwebtoken';

config();
export class TokenGateway implements ITokenGateway{
    private secretKey: string = process.env.TOKEN_KEY ?? "N;;NLV0z34!4f~GkC?E8Biy&L;2RCTa9%u3fB;*6+<%CtF?T!g9Y'=1z_rCKG7os`g,JW~R<o9<0uL6nsE7Nxg:/4I/ew)j?DvM*,'J>QQ~}tOiHwNJcqQNK60zfk@Y%3'@B4{O;i}HrOiUX>PbPN~<1]-ER!YmC}w=qA)!U~$!3k6;@lJo0iYfg8@#i^M11(UCyys0hw'PD!s702Y9r*'E+cp*)Yr:[1[Gob}MJ66V-$u^)Zh3wdR7n*-";

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