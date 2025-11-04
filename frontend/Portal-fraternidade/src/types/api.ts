export interface SignInResponse {
    accessToken : string;
    refreshToken : string;
}

export interface UserPermissionResponse {
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