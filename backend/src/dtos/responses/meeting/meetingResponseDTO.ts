export interface meetingResponseDTO{
    titleMeeting: string;
    meetingId: number;
    meetingDate: Date;
    themeGospel: string;
    leader: {
        userAccountId: number,
        name: string;
    };
    gospel: {
        userAccountId: number,
        name: string;
    };
    vibration: {
        userAccountId: number,
        name: string;
    };
    frontDesk: {
        userAccountId: number,
        name: string;
    };
    reading: {
        userAccountId: number,
        name: string;
    };
    passManager: {
        userAccountId: number,
        name: string;
    };
    soundAndImage: {
        userAccountId: number,
        name: string;
    };
}