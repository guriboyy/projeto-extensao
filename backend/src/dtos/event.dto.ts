export type CreateEventDTO = {
  title: string;
  description?: string;
  location?: string;
  startAt: string;
  endAt: string;
  visibility?: 'PUBLIC' | 'MEMBERS' | 'ROLE';
  category?: string;
};

export type UpdateEventDTO = Partial<CreateEventDTO> & {
  status?: 'DRAFT' | 'PUBLISHED' | 'CANCELLED';
};

export type ListEventsFilter = {
  q?: string;
  status?: 'DRAFT' | 'PUBLISHED' | 'CANCELLED';
  visibility?: 'PUBLIC' | 'MEMBERS' | 'ROLE';
  category?: string;
  from?: string;
  to?: string;
  page?: number;
  pageSize?: number;
};
