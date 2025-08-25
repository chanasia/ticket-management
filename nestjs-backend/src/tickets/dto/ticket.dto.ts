import { TicketStatus } from "../entities/ticket.entity";

export class TicketDto {
  ticket_id: string;
  title: string;
  description?: string;
  contact?: string;
  status: TicketStatus;
  created_at: Date;
  updated_at: Date;
}