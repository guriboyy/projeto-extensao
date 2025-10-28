export type userAccountResponseDTO = {
    userAccountId: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber?: string;
    isActive: boolean;
    roleName: string;
    createdAt: Date;
    updatedAt?: Date;
}