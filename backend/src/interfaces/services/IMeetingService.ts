import { createMeetingResponseDTO } from "../../dtos/requests/meeting/createMeetingRequestDTO";
import { updateMeetingResponseDTO } from "../../dtos/requests/meeting/updateMeetingRequestDTO";
import { meetingResponseDTO } from "../../dtos/responses/meeting/meetingResponseDTO";

export interface IMeetingService{
    createMeeting: (meetingRequest: createMeetingResponseDTO) => Promise<string>;
    mySchedules: (userAccuntId: number) => Promise<meetingResponseDTO[]>;
    getAllByCalendar: (numberMonth: number) => Promise<meetingResponseDTO[]>;
    getById: (meetingId: number) => Promise<meetingResponseDTO>;
    update: (meetingId: number, meetingRequest: updateMeetingResponseDTO) => Promise<string>;
    delete: (meetingId: number) => Promise<string>;
}