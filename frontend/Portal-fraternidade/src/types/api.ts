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