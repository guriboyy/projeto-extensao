import { Request, Response } from "express";
import { IEventBoardService } from "../interfaces/services/IEventBoardService";
import { EventBoardRepository } from "../repositories/EventBoardRepository";
import { EventBoardService } from "../service/EventBoardService";
import { updateEventBoardRequestDTO } from "../dtos/requests/eventBoard/updateEventBoardRequestDTO";
import { createEventBoardRequestDTO } from "../dtos/requests/eventBoard/createEventBoardRequestDTO";

export class EventBoardController{
    private eventBoardService: IEventBoardService;

    constructor(){
        this.eventBoardService = new EventBoardService(
            EventBoardRepository
        );
    }

    public async getAll(req: Request, res: Response): Promise<Response>{
        try{
            const results = await this.eventBoardService.getAll();
            return res.status(200).json({data: results}); 
        }
        catch(error){
            return res.status(500).json({message: error.message});
        }
    }

    public async getbyId(req: Request, res: Response): Promise<Response>{
        const {eventBoardId} = req.params;

        if(!eventBoardId)
            return res.status(400).json({message: "Precisa informa o Id do evento para poder buscar"});

        try{
            const result = await this.eventBoardService.getById(parseInt(eventBoardId));
            return res.status(200).json({data: result}); 
        }
        catch(error){
            return res.status(500).json({message: error.message});
        }
    }

    public async delete(req: Request, res: Response): Promise<Response>{
        const {eventBoardId} = req.params;

        if(!eventBoardId)
            return res.status(400).json({message: "Precisa informa o Id do evento para poder deletar"});

        try{
            const result = await this.eventBoardService.delete(parseInt(eventBoardId));
            return res.status(200).json({data: result}); 
        }
        catch(error){
            return res.status(500).json({message: error.message});
        }
    }

    public async update(req: Request, res: Response): Promise<Response>{
        const {eventBoardId} = req.params;
        const {title, description, eventDate} = req.body;

        if(!eventBoardId)
            return res.status(400).json({message: "Precisa informa o Id do evento para poder editar"});

        try{
            const result = await this.eventBoardService.update(
                parseInt(eventBoardId),
                {
                    title,
                    description,
                    eventDate
                } as updateEventBoardRequestDTO
            );
            return res.status(200).json({data: result}); 
        }
        catch(error){
            return res.status(500).json({message: error.message});
        }
    }

    public async create(req: Request, res: Response): Promise<Response>{
        const {title, description, eventDate} = req.body;

        if(!title || !eventDate)
            throw new Error("O título e a data do evento precisam ser informadas para criar");

        try{
            const result = await this.eventBoardService.create({
                title, description, eventDate
            } as createEventBoardRequestDTO);
            return res.status(200).json({data: result}); 
        }
        catch(error){
            return res.status(500).json({message: error.message});
        }
    }
}