import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ticket } from './entities/ticket.entity';

@Injectable()
export class TicketsRepository {
  constructor(
    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>,
  ) {}

  async createTicketAsync(ticketData: Partial<Ticket>): Promise<Ticket> {
    const ticket = this.ticketRepository.create(ticketData);
    return this.ticketRepository.save(ticket);
  }

  async getAllTickesAsync(): Promise<Ticket[]> {
    return this.ticketRepository.find();
  }

  async getTicketByIdAsync(ticketId: string): Promise<Ticket | null> {
    return this.ticketRepository.findOne({ where: { ticket_id: ticketId } });
  }

  async updateTicketAsync(ticket: Ticket): Promise<Ticket> {
    return this.ticketRepository.save(ticket);
  }
}