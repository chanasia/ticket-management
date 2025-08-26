import { useState, useEffect } from 'react';
import type { Ticket, SortOrder } from '@/models/Ticket';

interface UseTicketsParams {
  statusFilter: string;
  sortOrder: SortOrder;
}

export const useTickets = ({ statusFilter, sortOrder }: UseTicketsParams) => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

  const fetchTickets = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();

      if (sortOrder) {
        params.append('sortBy', 'updated_at');
        params.append('sortOrder', sortOrder);
      }

      if (statusFilter !== 'all') {
        params.append('status', statusFilter);
      }

      const queryString = params.toString();
      const url = queryString
        ? `${API_BASE_URL}/tickets/get-all?${queryString}`
        : `${API_BASE_URL}/tickets/get-all`;

      const response = await fetch(url);
      const data = await response.json();

      const ticketsWithDates = data.map((ticket: any) => ({
        ...ticket,
        created_at: new Date(ticket.created_at),
        updated_at: new Date(ticket.updated_at)
      }));

      setTickets(ticketsWithDates);
    } catch (error) {
      console.error('Error fetching tickets:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, [statusFilter, sortOrder]);

  return { tickets, loading, refetch: fetchTickets };
};