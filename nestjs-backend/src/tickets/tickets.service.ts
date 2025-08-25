import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { Ticket, TicketStatus } from './entities/ticket.entity';
import { TicketsRepository } from './tickets.repository';
import { TicketDto } from './dto/ticket.dto';

@Injectable()
export class TicketsService {
  constructor(
    private readonly ticketsRepository: TicketsRepository,
  ) { }

  async getAllTickets(
    sortBy?: 'updated_at',
    sortOrder?: 'ASC' | 'DESC',
    status?: TicketStatus
  ): Promise<TicketDto[]> {
    const tickets = await this.ticketsRepository.getAllTicketsAsync(sortBy, sortOrder, status);
    return tickets.map(ticket => this.mapEntityToDto(ticket));
  }

  async createTicketAsync(createTicketDto: CreateTicketDto): Promise<TicketDto> {
    const newTicket: Partial<Ticket> = {
      title: createTicketDto.title,
      description: createTicketDto.description,
      contact: createTicketDto.contact,
      status: TicketStatus.PENDING,
    }

    const resultTicket = await this.ticketsRepository.createTicketAsync(newTicket);

    return this.mapEntityToDto(resultTicket);
  }

  async updateStatusByTicketIdAsync(ticketId: string, status: TicketStatus): Promise<TicketDto> {
    const ticket = await this.ticketsRepository.getTicketByIdAsync(ticketId);
    if (!ticket) {
      throw new NotFoundException('Ticket not found');
    }

    // Validate status transition
    const currentStatus = ticket.status as TicketStatus;
    if (!this.validationTicketStatus(currentStatus, status)) {
      throw new BadRequestException(`Cannot transition from ${currentStatus} to ${status}`);
    }

    ticket.status = status;
    const updatedTicket = await this.ticketsRepository.updateTicketAsync(ticket);
    return this.mapEntityToDto(updatedTicket);
  }

  // pending -> accepted, rejected
  // accepted -> resolved
  private validationTicketStatus(currentStatus: TicketStatus, newStatus: TicketStatus): boolean {
    const allowedTransitions: Record<TicketStatus, TicketStatus[]> = {
      [TicketStatus.PENDING]: [TicketStatus.ACCEPTED, TicketStatus.REJECTED],
      [TicketStatus.ACCEPTED]: [TicketStatus.RESOLVED],
      [TicketStatus.RESOLVED]: [],
      [TicketStatus.REJECTED]: []
    };

    return allowedTransitions[currentStatus]?.includes(newStatus) || false;
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
