import { Request, Response } from "express";
import { IVibration } from "../interfaces/services/IVibrationService";
import { UserAccountRepository } from "../repositories/UserAccountRepository";
import { VibrationRepository } from "../repositories/VibrationRepository";
import { VibrationService } from "../service/VibrationService";

export class VibrationController{
    private vibrationService: IVibration;

    constructor(){
        this.vibrationService = new VibrationService(
            UserAccountRepository,
            VibrationRepository
        );
    }

    public async getAll(req: Request, res: Response): Promise<Response>{
        try{
            const result = await this.vibrationService.getAll();

            return res.status(200).json({data: result});
        }   
        catch(error){
            return res.status(500).json({message: error.message})
        }
    }

    public async create(req: Request, res: Response): Promise<Response>{
        const { reason, userAccountId } = req.body;

        if(!reason || !userAccountId)
            return res.status(400).json({message: "Para solicitar uma vibração os campos de Motivo e Id do usuário precisam estar preenchidos"});

        try{
            const result = await this.vibrationService.create(reason, userAccountId);

            return res.status(200).json({data: result});
        }   
        catch(error){
            return res.status(500).json({message: error.message})
        }
    }
}