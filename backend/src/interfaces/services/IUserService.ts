import { userRequestDTO } from "../../dtos/requests/user/userRequestDTO";
import { userUpdateRequestDTO } from "../../dtos/requests/user/userUpdateRequestDTO";
import { userAccountResponseDTO } from "../../dtos/responses/userAccount/userAccountRespondeDTO";
import { IGenericService } from "../generic/IGenericService";

export interface IUserService extends IGenericService<userRequestDTO, userAccountResponseDTO>{
    update: (userAccountId: number, userAccountRequest: userUpdateRequestDTO) => Promise<string>;
}