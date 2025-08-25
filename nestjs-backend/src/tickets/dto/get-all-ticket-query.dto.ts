import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsEnum } from 'class-validator';
import { TicketStatus } from '../entities/ticket.entity';

export class GetAllTicketsQueryDto {
  @ApiPropertyOptional({ enum: ['updated_at'] })
  @IsOptional()
  @IsEnum(['updated_at'])
  sortBy?: 'updated_at';

  @ApiPropertyOptional({ enum: ['ASC', 'DESC'] })
  @IsOptional()
  @IsEnum(['ASC', 'DESC'])
  sortOrder?: 'ASC' | 'DESC';

  @ApiPropertyOptional({ enum: TicketStatus })
  @IsOptional()
  @IsEnum(TicketStatus)
  status?: TicketStatus;
}