export type vibrationResponseDTO = {
    vibrationId: number;
    userAccount?: {
        userAccountId: number,
        name: string,
    };
    reason: string;
    createdAt: Date;
}