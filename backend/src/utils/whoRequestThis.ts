import { Request } from "express";
import { IWhoRequestThis } from "../interfaces/common/IWhoRequestThis";
import { ITokenGateway } from "../interfaces/gateways/ITokenGateway";

export class WhoRequestThis implements IWhoRequestThis{
    constructor(
        private tokenGateway: ITokenGateway
    ){}
    
    public getUserAccountIdByThisRequest(req: Request): number {
        const accessToken = req.headers['authorization'].split(' ')[1];
        const user: any = this.tokenGateway.decodeToken(accessToken);
        return user.id as number;
    }
}