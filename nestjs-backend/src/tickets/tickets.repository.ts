import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ticket, TicketStatus } from './entities/ticket.entity';

@Injectable()
export class TicketsRepository {
  constructor(
    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>,
  ) { }

  async createTicketAsync(ticketData: Partial<Ticket>): Promise<Ticket> {
    const ticket = this.ticketRepository.create(ticketData);
    return this.ticketRepository.save(ticket);
  }

  async getAllTicketsAsync(
    sortBy?: 'updated_at',
    sortOrder?: 'ASC' | 'DESC',
    status?: TicketStatus
  ): Promise<Ticket[]> {
    const queryBuilder = this.ticketRepository.createQueryBuilder();

    if (status) {
      queryBuilder.where('ticket.status = :status', { status });
    }

    if (sortBy === 'updated_at') {
      queryBuilder.orderBy('ticket.updated_at', sortOrder || 'DESC');
    }

    return queryBuilder.getMany();
  }

  async getTicketByIdAsync(ticketId: string): Promise<Ticket | null> {
    return this.ticketRepository.findOne({ where: { ticket_id: ticketId } });
  }

  async updateTicketAsync(ticket: Ticket): Promise<Ticket> {
    return this.ticketRepository.save(ticket);
  }
}