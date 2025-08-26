import type { CreateTicket } from '@/models/Ticket';
import { useState } from 'react';

export const useCreateTicket = () => {
  const [loading, setLoading] = useState(false);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

  const createTicket = async (ticketData: CreateTicket) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/tickets/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ticketData),
      });

      if (!response.ok) {
        throw new Error('Failed to create ticket');
      }

      const newTicket = await response.json();
      
      return {
        ...newTicket,
        created_at: new Date(newTicket.created_at),
        updated_at: new Date(newTicket.updated_at)
      };
    } catch (error) {
      console.error('Error creating ticket:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { createTicket, loading };
};