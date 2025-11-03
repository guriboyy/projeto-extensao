import { UserAccount } from "../../entities/UserAccount";
import jwt from 'jsonwebtoken'

export interface ITokenGateway{
    create: (user: UserAccount) => string;
    verify: (token: string) => boolean;
    decodeToken: (token: string) => string | jwt.JwtPayload | null;
}