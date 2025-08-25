import { Controller, Get, Post, Body, Param, HttpStatus, HttpCode, Put, Query } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { create } from 'domain';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { Ticket, TicketStatus } from './entities/ticket.entity';
import { GetAllTicketsQueryDto } from './dto/get-all-ticket-query.dto';
import { TicketDto } from './dto/ticket.dto';

@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) { }

  @Get('get-all')
async getAllTickets(@Query() query: GetAllTicketsQueryDto): Promise<TicketDto[]> {
  return this.ticketsService.getAllTickets(query.sortBy, query.sortOrder, query.status);
}

  @Post('create')
  async createTicket(@Body() createTicketDto: CreateTicketDto): Promise<TicketDto> {
    return this.ticketsService.createTicketAsync(createTicketDto);
  }

  @Put(':ticket_id/accept')
  @HttpCode(HttpStatus.OK)
  async acceptTicket(@Param('ticket_id') ticket_id: string): Promise<TicketDto> {
    return this.ticketsService.updateStatusByTicketIdAsync(ticket_id, TicketStatus.ACCEPTED);
  }

  @Put(':ticket_id/reject')
  @HttpCode(HttpStatus.OK)
  async rejectTicket(@Param('ticket_id') ticket_id: string): Promise<TicketDto> {
    return this.ticketsService.updateStatusByTicketIdAsync(ticket_id, TicketStatus.REJECTED);
  }

  @Put(':ticket_id/resolve')
  @HttpCode(HttpStatus.OK)
  async resolveTicket(@Param('ticket_id') ticket_id: string): Promise<TicketDto> {
    return this.ticketsService.updateStatusByTicketIdAsync(ticket_id, TicketStatus.RESOLVED);
  }
}
