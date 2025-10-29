import { roleResponseDTO } from "../../dtos/responses/role/roleResponseDTO";
import { userPermissionResponseDTO } from "../../dtos/responses/role/userPermissionResponseDTO";

export interface IRoleService{
    getPermissionByUserId: (userAccountId: number) => Promise<userPermissionResponseDTO>;
    getAll: () => Promise<roleResponseDTO[]>;
}