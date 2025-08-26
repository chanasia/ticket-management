import type { Ticket, TicketStatus } from '@/models/Ticket';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select';

type Props = {
  tickets: Ticket[]; // tickets ที่ filter และ sort แล้ว  
  onStatusChange: (ticketId: string, newStatus: TicketStatus) => void;
}

export default function TicketLists({ tickets, onStatusChange }: Props) {
  const statusConfig: Record<TicketStatus, { color: string; label: string }> = {
    pending: { color: 'bg-orange-100 text-orange-800', label: 'PENDING' },
    accepted: { color: 'bg-blue-100 text-blue-800', label: 'IN PROGRESS' },
    resolved: { color: 'bg-green-100 text-green-800', label: 'RESOLVED' },
    rejected: { color: 'bg-red-100 text-red-800', label: 'REJECTED' }
  };

  const getAvailableStatuses = (currentStatus: TicketStatus): TicketStatus[] => {
    switch (currentStatus) {
      case 'pending':
        return ['accepted', 'rejected'];
      case 'accepted':
        return ['resolved'];
      default:
        return [];
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  const handleStatusChange = (ticketId: string, newStatus: string) => {
    onStatusChange(ticketId, newStatus as TicketStatus);
  };

  return (
    <div className="flex-1 shadow-sm bg-white rounded-lg border border-gray-200 overflow-y-auto">
      <table className="w-full">
        <thead className="bg-gray-50 sticky top-0 z-10">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Ticket ID</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Title</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Description</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Contact</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Updated</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {tickets.length === 0 ? (
            <tr>
              <td colSpan={6} className="text-center text-gray-500 p-4">
                No tickets found
              </td>
            </tr>
          ) : (tickets.map((ticket) => {
            const availableStatuses = getAvailableStatuses(ticket.status);
            const canChangeStatus = availableStatuses.length > 0;

            return (
              <tr
                key={ticket.ticket_id}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="p-4">
                  <span className="text-blue-600 font-semibold text-sm hover:underline">
                    {ticket.ticket_id}
                  </span>
                </td>
                <td className="p-4">
                  <div className="font-medium text-gray-900">{ticket.title}</div>
                </td>
                <td className="p-4 max-w-md">
                  {ticket.description ? (
                    <div className="text-sm text-gray-600">{ticket.description}</div>
                  ) : (
                    <span className="text-sm text-gray-400">No description</span>
                  )}
                </td>
                <td className="p-4">
                  {ticket.contact ? (
                    <span className="text-sm text-gray-900">{ticket.contact}</span>
                  ) : (
                    <span className="text-sm text-gray-400">No contact</span>
                  )}
                </td>
                <td className="p-4">
                  {canChangeStatus ? (
                    <Select
                      value={ticket.status}
                      onValueChange={(value) => handleStatusChange(ticket.ticket_id, value)}
                    >
                      <SelectTrigger className="w-fit p-0 h-auto border-none bg-transparent focus:outline-none focus:ring-0 outline-none shadow-none focus:shadow-none">
                        <span className={`inline-flex items-center justify-center px-2 py-1 text-xs font-semibold rounded-full min-w-[90px] ${statusConfig[ticket.status].color}`}>
                          {statusConfig[ticket.status].label}
                        </span>
                      </SelectTrigger>
                      <SelectContent onCloseAutoFocus={(e) => e.preventDefault()} >
                        {availableStatuses.map((status) => (
                          <SelectItem key={status} value={status}>
                            <span className={`font-semibold ${statusConfig[status].color.split(' ')[1]}`}>
                              {statusConfig[status].label}
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <span className={`inline-flex items-center justify-center px-2 py-1 text-xs font-semibold rounded-full min-w-[90px] ${statusConfig[ticket.status].color}`}>
                      {statusConfig[ticket.status].label}
                    </span>
                  )}
                </td>
                <td className="p-4 text-sm text-gray-600 whitespace-nowrap">
                  {formatDate(ticket.updated_at)}
                </td>
              </tr>
            );
          }))}
        </tbody>
      </table>
    </div>
  );
}