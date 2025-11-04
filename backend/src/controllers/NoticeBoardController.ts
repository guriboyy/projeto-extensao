import { Request, Response } from "express";
import { IWhoRequestThis } from "../interfaces/common/IWhoRequestThis";
import { INoticeBoardService } from "../interfaces/services/INoticeBoardService";
import { NoticeBoardRepository } from "../repositories/NoticeBoardRepository";
import { UserAccountRepository } from "../repositories/UserAccountRepository";
import { NoticeBoardService } from "../service/NoticeBoardService";
import { TokenGateway } from "../service/TokenGateway";
import { WhoRequestThis } from "../utils/whoRequestThis";

export class NotificationController{
    private noticeBoardService: INoticeBoardService;
    private whoRequestThis: IWhoRequestThis;

    constructor(){
        this.noticeBoardService = new NoticeBoardService(
            NoticeBoardRepository,
            UserAccountRepository
        );

        this.whoRequestThis = new WhoRequestThis(
            new TokenGateway()
        );
    }

    public async getAll(req: Request, res: Response): Promise<Response>{
        try{
            const result = await this.noticeBoardService.getAll();
            return res.status(200).json({data: result});
        }
        catch(error){
            return res.status(500).json({message: error.message});
        }
    }

    public async getById(req: Request, res: Response): Promise<Response>{
        const {noticeBoardId} = req.params;

        if(!noticeBoardId)
            return res.status(400).json({message: "O Id de aviso precisa ser fornecido"});

        try{
            const result = await this.noticeBoardService.getById(parseInt(noticeBoardId));
            return res.status(200).json({data: result});
        }
        catch(error){
            return res.status(500).json({message: error.message});
        }
    }

    public async create(req: Request, res: Response): Promise<Response>{
        const userAccountId = this.whoRequestThis.getUserAccountIdByThisRequest(req);
        const {
            description,
            endDate
        } = req.body;

        if(!userAccountId || !description)
            return res.status(400).json({message: "O Id de usuário e descrição precisam ser fornecidos"});

        try{
            const result = await this.noticeBoardService.create(
                userAccountId, 
                {
                    description,
                    endDate
                }
            );

            return res.status(200).json({data: result});
        }
        catch(error){
            return res.status(500).json({message: error.message});
        }
    }

    public async update(req: Request, res: Response): Promise<Response>{
        const {noticeBoardId} = req.params;
        const {
            description,
            endDate
        } = req.body;

        if(!noticeBoardId)
            return res.status(400).json({message: "O Id de aviso precisa ser fornecido"});

        try{
            const result = await this.noticeBoardService.update(
                parseInt(noticeBoardId),
                {
                    description,
                    endDate
                }
            );
            
            return res.status(200).json({data: result});
        }
        catch(error){
            return res.status(500).json({message: error.message});
        }
    }

    public async delete(req: Request, res: Response): Promise<Response>{
        const {noticeBoardId} = req.params;

        if(!noticeBoardId)
            return res.status(400).json({message: "O Id de aviso precisa ser fornecido"});

        try{
            const result = await this.noticeBoardService.delete(parseInt(noticeBoardId));
            return res.status(200).json({data: result});
        }
        catch(error){
            return res.status(500).json({message: error.message});
        }
    }
}