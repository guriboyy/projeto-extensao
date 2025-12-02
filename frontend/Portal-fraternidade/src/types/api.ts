import type React from "react";

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

export interface AuthContextProps {
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
}

export interface User {
    createdAt: string;
    email: string;
    firstName: string;
    isActive: boolean;
    lastName: string;
    phoneNumber: string;
    roleName: string;
    updatedAt: string;
    userAccountId: number;
}

export interface UserFormCreate {
  name: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  status: boolean;
  role: string;
  password: string;  
};

export interface Schedules {
  meetingId: number,
  meetingDate: string,
  role: string
}

export interface ScheduleResponse {
    data: Schedules[] 
    setSchedule: React.Dispatch<React.SetStateAction<Schedules[]>>
}

export interface UserForm {
  name: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  status: boolean;
  role: string;
   
};

export interface UserManagerResponse {
    data: User[]
    setManageUsers: React.Dispatch<React.SetStateAction<User[]>>;
}

export interface Event {
  title: string,
  eventDate: string,
  time: string,
  description: string
}

export interface EventsReponse {
  data: Event[],
  setEventsList: React.Dispatch<React.SetStateAction<Event[]>>;
}

export interface MonthActivity {
  data: ActivityCalendar[],
  setActivityList: React.Dispatch<React.SetStateAction<ActivityCalendar[]>>;
}

export interface ActivityRole {
  userAccountId: number,
  name: string
}

export interface SelectedActivity {
  id: string;
  title: string;
  start: string;
  [key: string]: any; 
}

export interface ActivityCalendar {
  frontDesk:ActivityRole,
  gospel:ActivityRole ,
  leader:ActivityRole ,
  meetingDate: string,
  hour: string,
  meetingId: number,
  passManager:ActivityRole ,
  reading:ActivityRole ,
  soundAndImage: ActivityRole,
  themeGospel: string,
  titleMeeting: string,
  vibration: ActivityRole
}
export interface Activity {
  date: string,
  leader: number,
  gospel: number,
  vibration: number,
  frontDesk: number,
  reading: number,
  passManager: number,
  soundAndImage: number,
  themeGospel: string,
  title: string,
  hour: string
}