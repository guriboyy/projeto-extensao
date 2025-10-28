export type userRequestDTO = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phoneNumber?: string;
    roleId: number;
    isActive?: boolean;
}