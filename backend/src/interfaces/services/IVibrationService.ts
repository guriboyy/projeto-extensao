import { vibrationResponseDTO } from "../../dtos/responses/vibration/vibrationResponseDTO";

export interface IVibration{
    getAll: () => Promise<vibrationResponseDTO[]>;
    create: (reason: string, userAccountId: number) => Promise<string>;
}