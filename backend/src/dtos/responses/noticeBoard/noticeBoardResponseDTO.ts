export type noticeBoardResponseDTO = {
    noticeBoardId: number;
    description: string;
    userAccount: {
        userAccountId: number,
        name: string;
        role: string;
    };
    postedDate: Date;
    endDate?: Date;
}