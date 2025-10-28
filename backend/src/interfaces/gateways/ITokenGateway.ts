import { UserAccount } from "../../entities/UserAccount";

export interface ITokenGateway{
    create: (user: UserAccount) => string;
    verify: (token: string) => boolean;
}