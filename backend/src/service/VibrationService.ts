import { Repository } from "typeorm";
import { IVibration } from "../interfaces/services/IVibrationService";
import { UserAccount } from "../entities/UserAccount";
import { Vibration } from "../entities/Vibration";
import { vibrationResponseDTO } from "../dtos/responses/vibration/vibrationResponseDTO";

export class VibrationService implements IVibration{

    constructor(
        private userRepository: Repository<UserAccount>,
        private vibrationRepository: Repository<Vibration>
    ){}

    public async getAll(): Promise<vibrationResponseDTO[]>{
        const vibrations = await this.vibrationRepository.find({
            relations: {
                userAccount: true
            }
        });

        const resultFormatted: vibrationResponseDTO[] = vibrations.map((item) => ({
            vibrationId: item.vibrationId,
            userAccount: !item.userAccountId ? null : {
                userAccountId: item.userAccount.userAccountId,
                name: item.userAccount.firstName + " " + item.userAccount.lastName
            },
            reason: item.reason,
            createdAt: item.createdAt
        }));

        return resultFormatted;
    }
    
    public async create(reason: string, userAccountId: number): Promise<string>{
        const findUserAccount = await this.userRepository.findOne({
            where: {userAccountId: userAccountId}
        });

        if(!findUserAccount)
            throw new Error("Nenhum usuário foi encontrado");

        const createVibration = this.vibrationRepository.create({
            userAccountId: userAccountId,
            reason: reason
        });

        await this.vibrationRepository.save(createVibration);

        return "Vibração solicitada com sucesso";
    }
}