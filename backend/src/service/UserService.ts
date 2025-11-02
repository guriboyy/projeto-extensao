import { Repository } from "typeorm";
import { userAccountResponseDTO } from "../dtos/responses/userAccount/userAccountRespondeDTO";
import { IUserService } from "../interfaces/services/IUserService";
import { UserAccount } from "../entities/UserAccount";
import { userRequestDTO } from "../dtos/requests/user/userRequestDTO";
import { IEncryptionGateway } from "../interfaces/gateways/IEncryptionGateway";
import { Role } from "../entities/Role";

export class UserService implements IUserService{

    constructor(
        private userRepository: Repository<UserAccount>,
        private roleRepository: Repository<Role>,
        private cryptographyGateway: IEncryptionGateway
    ){}

    public async create(body: userRequestDTO): Promise<void>{
        const existEmail = await this.userRepository.findOne({where:{email: body.email}});
        const existRole = await this.roleRepository.findOne({where:{roleId: body.roleId}});

        if(existEmail)
            throw new Error("Já existe um usuário com este email cadastrado");

        if(!existRole)
            throw new Error("Não existe esta função de usuário para adicionar ao usuário");

        if(body.firstName.length > 150)
            throw new Error("O campo de nome excedeu o tamanho máximo de 150 caracteres");
        
        if(body.lastName.length > 150)
            throw new Error("O campo de sobrenome excedeu o tamanho máximo de 150 caracteres");

        if(body.email.length > 150)
            throw new Error("O campo de email excedeu o tamanho máximo de 150 caracteres");

        if(body.password.length > 255)
            throw new Error("O campo de senha excedeu o tamanho máximo de 255 caracteres");

        if(body.phoneNumber?.length > 30)
            throw new Error("O campo de número de contato excedeu o tamanho máximo de 150 caracteres");

        const encryptPass = await this.cryptographyGateway.encrypt(body.password);
        const user = this.userRepository.create({
            firstName: body.firstName,
            lastName: body.lastName,
            email: body.email,
            password: encryptPass,
            phoneNumber: body.phoneNumber,
            roleId: body.roleId,
            isActive: body.isActive ?? true,
        });

        await this.userRepository.save(user);
    }
    
    public async getById(id: number): Promise<userAccountResponseDTO>{
        const finUser = await this.userRepository.findOne({
                where: {userAccountId: id},
                relations: {
                    role: true  
                }
            },
        );
        
        if(!finUser)
            throw new Error("Nenhum usuário encontrado com este Id");

        const result: userAccountResponseDTO = {
            userAccountId: finUser.userAccountId,
            firstName: finUser.firstName,
            lastName: finUser.lastName,
            email: finUser.email,
            phoneNumber: finUser.phoneNumber,
            isActive: finUser.isActive,
            roleName: finUser.role.name,
            createdAt: finUser.createdAt,
            updatedAt: finUser.updatedAt
        }; 

        return result;
    }

    public async getAll(): Promise<Array<userAccountResponseDTO>>{
        const getAllUsers = await this.userRepository.find({
            relations: {
                role: true  
            }
        });

        const result: Array<userAccountResponseDTO> = getAllUsers.map((item) => ({
            userAccountId: item.userAccountId,
            firstName: item.firstName,
            lastName: item.lastName,
            email: item.email,
            phoneNumber: item.phoneNumber,
            isActive: item.isActive,
            roleName: item.role.name,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt
        }));

        return result;
    }
}