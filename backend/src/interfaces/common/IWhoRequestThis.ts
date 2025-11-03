import { Request } from "express";

export interface IWhoRequestThis{
    getUserAccountIdByThisRequest?: (req: Request) => number; 
}