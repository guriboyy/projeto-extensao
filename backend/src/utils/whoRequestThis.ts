import { Request } from "express";
import { IWhoRequestThis } from "../interfaces/common/IWhoRequestThis";
import { ITokenGateway } from "../interfaces/gateways/ITokenGateway";

export class WhoRequestThis implements IWhoRequestThis{
    constructor(
        private tokenGateway: ITokenGateway
    ){}
    
    public getUserAccountIdByThisRequest(req: Request): number | null {
        try{
            const accessToken = req.headers['authorization'].split(' ')[1];
            const user: any = this.tokenGateway.decodeToken(accessToken);
            return user.id as number;
        }
        catch(error){
            return null;
        }

    }
}