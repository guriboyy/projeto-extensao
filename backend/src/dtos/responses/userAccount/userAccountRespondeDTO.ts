export type userAccountResponseDTO = {
    userAccountId: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber?: string;
    isActive: boolean;
    role: {
        roleId: number,
        name: string;
    };
    createdAt: Date;
    updatedAt?: Date;
}