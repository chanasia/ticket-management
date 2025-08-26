import { useState } from 'react';
import type { TicketStatus } from '@/models/Ticket';

export const useUpdateTicketStatus = () => {
  const [loading, setLoading] = useState(false);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

  const getStatusEndpoint = (status: TicketStatus): string => {
    switch (status) {
      case 'accepted':
        return 'accept';
      case 'rejected':
        return 'reject';
      case 'resolved':
        return 'resolve';
      default:
        throw new Error(`Unsupported status: ${status}`);
    }
  };

  const updateTicketStatus = async (ticketId: string, newStatus: TicketStatus) => {
    setLoading(true);
    try {
      const endpoint = getStatusEndpoint(newStatus);
      const response = await fetch(`${API_BASE_URL}/tickets/${ticketId}/${endpoint}`, {
        method: 'PUT',
      });

      if (!response.ok) {
        throw new Error('Failed to update ticket status');
      }

      const updatedTicket = await response.json();
      
      return {
        ...updatedTicket,
        created_at: new Date(updatedTicket.created_at),
        updated_at: new Date(updatedTicket.updated_at)
      };
    } catch (error) {
      console.error('Error updating ticket status:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { updateTicketStatus, loading };
};