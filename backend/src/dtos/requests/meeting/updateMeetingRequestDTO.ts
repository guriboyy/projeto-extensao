export type updateMeetingResponseDTO = {
    meetingDate?: Date| null;
    leaderUserAccountId?: number| null;
    gospelUserAccountId?: number| null; 
    vibrationUserAccountId?: number| null;
    frontDeskUserAccountId?: number| null;
    readingUserAccountId?: number| null;
    passManagerUserAccountId?: number| null;
    soundAndImageUserAccountId?: number| null;
    themeGospel?: string | null;
}