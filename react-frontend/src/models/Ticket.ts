export type TicketStatus = 'pending' | 'accepted' | 'resolved' | 'rejected';

export type SortOrder = 'ASC' | 'DESC' | null;

export interface Ticket {
  ticket_id: string;
  title: string;
  description: string;
  contact: string;
  status: TicketStatus;
  created_at: Date;
  updated_at: Date;
}

export interface CreateTicket {
  title: string;
  description: string;
  contact: string;
}