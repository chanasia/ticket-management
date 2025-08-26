import { useState } from 'react';
import TicketHeader from './TicketHeader'
import TicketLists from './TicketLists'
import type { TicketStatus, SortOrder } from '@/models/Ticket';
import { useTickets } from '@/hooks/useTickets';
import { useCreateTicket } from '@/hooks/useCreateTicket';
import CreateTicketModal from './CreateTicketModal';
import { toast } from 'sonner';
import { Toaster } from 'sonner';
import { useUpdateTicketStatus } from '@/hooks/useUpdateTicketStatus';

type Props = {}

export default function TicketPage({ }: Props) {
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortOrder, setSortOrder] = useState<SortOrder>(null);
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);

  const { tickets, loading: ticketLoading, refetch: ticketRefetch } = useTickets({ statusFilter, sortOrder });
  const { createTicket } = useCreateTicket();
  const { updateTicketStatus } = useUpdateTicketStatus();

  const handleStatusFilterChange = (status: string) => {
    setStatusFilter(status);
  };

  const handleSortOrderChange = (newSortOrder: SortOrder) => {
    setSortOrder(newSortOrder);
  };

  const handleCreateTicketClick = () => {
    setShowCreateModal(true);
  };

  const handleCloseCreateModal = () => {
    setShowCreateModal(false);
  };

  const handleSubmitCreateTicket = async (ticketData: { title: string; description: string; contact: string }) => {
    if (!ticketData.title.trim() || !ticketData.description.trim() || !ticketData.contact.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }

    const loadingToast = toast.loading('Creating ticket...');

    try {
      await createTicket(ticketData);
      await ticketRefetch();
      toast.dismiss(loadingToast);
      toast.success('Ticket created successfully!');
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error('Failed to create ticket. Please try again.');
      console.error('Failed to create ticket:', error);
      throw error;
    }
  };

  const handleStatusChange = async (ticketId: string, newStatus: TicketStatus) => {
    const loadingToast = toast.loading('Updating ticket status...');

    try {
      await updateTicketStatus(ticketId, newStatus);
      await ticketRefetch();
      toast.dismiss(loadingToast);
      toast.success('Ticket status updated successfully!');
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error('Failed to update ticket status');
      console.error('Error updating ticket status:', error);
    }
  };

  return (
    <div className='flex flex-col gap-2 h-[calc(100vh-2rem)]'>
      <TicketHeader
        statusFilter={statusFilter}
        sortOrder={sortOrder}
        onStatusFilterChange={handleStatusFilterChange}
        onCreateTicketClick={handleCreateTicketClick}
        onSortOrderChange={handleSortOrderChange}
      />

      {ticketLoading ? (
        <div className="flex-1 flex items-center justify-center bg-white rounded-lg border border-gray-200">
          <div className="text-gray-500">Loading tickets...</div>
        </div>
      ) : (
        <TicketLists
          tickets={tickets}
          onStatusChange={handleStatusChange}
        />
      )}

      <CreateTicketModal
        isOpen={showCreateModal}
        onClose={handleCloseCreateModal}
        onSubmit={handleSubmitCreateTicket}
      />

      <Toaster richColors position="bottom-right" />
    </div>
  )
}