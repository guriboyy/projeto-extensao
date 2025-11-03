import { roleResponseDTO } from "./roleResponseDTO";

export interface userPermissionResponseDTO extends roleResponseDTO {
    screens: {
        screenId: number;
        name: string;
        icon?: string;
        path?: string;
        screenFunctions: {
            screenFunctionId: number;
            name: string;
            description?: string;
        }[];
    }[];
}