import { Request, Response } from "express";
import { IMeetingService } from "../interfaces/services/IMeetingService";
import { MeetingService } from "../service/MeetingService";
import { MeetingRepository } from "../repositories/MeetingRepository";
import { UserAccountRepository } from "../repositories/UserAccountRepository";
import { IWhoRequestThis } from "../interfaces/common/IWhoRequestThis";
import { TokenGateway } from "../service/TokenGateway";
import { WhoRequestThis } from "../utils/whoRequestThis";
import { createMeetingResponseDTO } from "../dtos/requests/meeting/createMeetingRequestDTO";
import { updateMeetingResponseDTO } from "../dtos/requests/meeting/updateMeetingRequestDTO";

export class MeetingController{
    private meetingService: IMeetingService;
    private whoRequestThis: IWhoRequestThis;

    constructor(){
        this.meetingService = new MeetingService(
            MeetingRepository,
            UserAccountRepository
        );

        this.whoRequestThis = new WhoRequestThis(
            new TokenGateway()
        );
    }

    public async mySchedules(req: Request, res: Response): Promise<Response>{
        const userAccountId = this.whoRequestThis.getUserAccountIdByThisRequest(req);

        if(!userAccountId)
            return res.status(400).json({message: "O Id do usuário é necessário para poder buscar suas escalas"});

        try{
            const result = await this.meetingService.mySchedules(userAccountId);
            return res.status(200).json({data: result});
        }
        catch(error){
            return res.status(500).json({message: error.message});
        }
    }

    public async create(req: Request, res: Response): Promise<Response>{
        const {
            meetingDate,
            leaderAccountId,
            gospelUserAccountId, 
            vibrationUserAccountId,
            frontDeskUserAccountId,
            readingUserAccountId,
            passManagerUserAccountId,
            soundAndImageUserAccountId,
            themeGospel
        } = req.body;

        if(!meetingDate || !leaderAccountId || !gospelUserAccountId || !vibrationUserAccountId || !frontDeskUserAccountId || !readingUserAccountId ||
            !passManagerUserAccountId || !soundAndImageUserAccountId || !themeGospel
        )
            return res.status(400).json({message: "Para cria a reunião precisa preencher todos os campos"});

        try{
            const result = await this.meetingService.createMeeting({
                meetingDate,
                leaderAccountId,
                gospelUserAccountId, 
                vibrationUserAccountId,
                frontDeskUserAccountId,
                readingUserAccountId,
                passManagerUserAccountId,
                soundAndImageUserAccountId,
                themeGospel
            } as createMeetingResponseDTO);
            return res.status(200).json({data: result});
        }
        catch(error){
            return res.status(500).json({message: error.message});
        }
    }

    public async delete(req: Request, res: Response): Promise<Response>{
        const { meetingId } = req.params;

        if(!meetingId)
            return res.status(400).json({message: "O Id da reunião é necessári para poder deletar"});

        try{
            const result = await this.meetingService.delete(parseInt(meetingId));
            return res.status(200).json({data: result});
        }
        catch(error){
            return res.status(500).json({message: error.message});
        }
    }

    public async update(req: Request, res: Response): Promise<Response>{
        const { meetingId } = req.params;
        const {
            meetingDate,
            leaderUserAccountId,
            gospelUserAccountId, 
            vibrationUserAccountId,
            frontDeskUserAccountId,
            readingUserAccountId,
            passManagerUserAccountId,
            soundAndImageUserAccountId,
            themeGospel
        } = req.body;

        if(!meetingId)
            return res.status(400).json({message: "O Id da reunião é necessário para poder atualizar"});

        try{
            const result = await this.meetingService.update(
                parseInt(meetingId), 
                {
                    meetingDate,
                    leaderUserAccountId,
                    gospelUserAccountId, 
                    vibrationUserAccountId,
                    frontDeskUserAccountId,
                    readingUserAccountId,
                    passManagerUserAccountId,
                    soundAndImageUserAccountId,
                    themeGospel
                } as updateMeetingResponseDTO
            );

            return res.status(200).json({data: result});
        }
        catch(error){
            return res.status(500).json({message: error.message});
        }
    }


    
    public async getAllCalendar(req: Request, res: Response): Promise<Response>{
        const { numberMonth } = req.params

        if(!numberMonth)
            return res.status(400).json({message: "O número do mês é necessário para visualizar todas as reuniiões"});
        try{
            const result = await this.meetingService.getAllByCalendar(parseInt(numberMonth));
            return res.status(200).json({data: result});
        }
        catch(error){
            return res.status(500).json({message: error.message});
        }
    }

    public async getById(req: Request, res: Response): Promise<Response>{
        const { meetingId } = req.params;

        if(!meetingId)
            return res.status(400).json({message: "O Id da reunião é necessário para poder obter a reunião"});

        try{
            const result = await this.meetingService.getById(parseInt(meetingId));
            return res.status(200).json({data: result});
        }
        catch(error){
            return res.status(500).json({message: error.message});
        }
    }
    
}