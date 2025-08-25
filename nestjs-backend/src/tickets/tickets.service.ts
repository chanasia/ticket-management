import { Injectable } from '@nestjs/common';
import { RequestCreateTicketDto } from './dto/request-create-ticket.dto';
import { Ticket, TicketStatus } from './entities/ticket.entity';
import { TicketsRepository } from './tickets.repository';
import { TicketDto } from './dto/ticket.dto';

@Injectable()
export class TicketsService {
  constructor(
    private readonly ticketsRepository: TicketsRepository,
  ) { }

  async createTicketAsync(ticket: RequestCreateTicketDto): Promise<TicketDto> {
    const newTicket: Partial<Ticket> = {
      title: ticket.title,
      description: ticket.description,
      contact: ticket.contact,
      status: TicketStatus.PENDING,
    }

    const resultTicket = await this.ticketsRepository.createTicketAsync(newTicket);

    return this.mapEntityToDto(resultTicket);
  }

  private mapEntityToDto(ticket: Ticket): TicketDto {
    return {
      ticket_id: ticket.ticket_id,
      title: ticket.title,
      description: ticket.description,
      contact: ticket.contact,
      status: ticket.status as TicketStatus,
      created_at: ticket.created_at,
      updated_at: ticket.updated_at,
    };
  }
}
