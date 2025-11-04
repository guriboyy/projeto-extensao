export type userUpdateRequestDTO = {
    firstName?: string | null;
    lastName?: string | null;
    email?: string |  null;
    phoneNumber?: string;
    roleId?: number | null;
    isActive?: boolean | null;
}