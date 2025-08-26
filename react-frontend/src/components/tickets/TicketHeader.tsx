import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { SortOrder } from '@/models/Ticket';

type Props = {
  statusFilter: string;
  sortOrder: SortOrder;
  onStatusFilterChange?: (status: string) => void;
  onCreateTicketClick?: () => void;
  onSortOrderChange?: (sortOrder: SortOrder) => void;
}

export default function TicketHeader({
  statusFilter,
  sortOrder,
  onStatusFilterChange,
  onCreateTicketClick,
  onSortOrderChange
}: Props) {
  const statusOptions = [
    { value: 'all', label: 'ALL STATUSES', bgColor: 'bg-gray-100', textColor: 'text-gray-800' },
    { value: 'pending', label: 'PENDING', bgColor: 'bg-orange-100', textColor: 'text-orange-800' },
    { value: 'accepted', label: 'IN PROGRESS', bgColor: 'bg-blue-100', textColor: 'text-blue-800' },
    { value: 'resolved', label: 'RESOLVED', bgColor: 'bg-green-100', textColor: 'text-green-800' },
    { value: 'rejected', label: 'REJECTED', bgColor: 'bg-red-100', textColor: 'text-red-800' }
  ];

  const getCurrentStatusStyle = () => {
    const currentStatus = statusOptions.find(option => option.value === statusFilter);
    return currentStatus ? `${currentStatus.bgColor} ${currentStatus.textColor}` : 'bg-white';
  };

  const handleStatusChange = (status: string) => {
    if (onStatusFilterChange) onStatusFilterChange(status);
  };

  const handleCreateTicket = () => {
    if (onCreateTicketClick) onCreateTicketClick();
  };

  const handleSortToggle = () => {
    let newSortOrder: SortOrder;
    if (sortOrder === null) {
      newSortOrder = 'ASC';
    } else if (sortOrder === 'ASC') {
      newSortOrder = 'DESC';
    } else {
      newSortOrder = null;
    }
    if (onSortOrderChange) onSortOrderChange(newSortOrder);
  };

  return (
    <div className='border border-gray-200 rounded-md shadow-sm bg-white'>
      <div className='border-b border-gray-200 flex justify-between items-center p-4'>
        <h1 className='font-semibold text-lg'>Helpdesk Support Tickets</h1>
        <Button
          variant="default"
          className='bg-blue-500 text-white px-3 py-1.5 rounded-md hover:bg-blue-800 cursor-pointer'
          onClick={handleCreateTicket}
        >
          Create Ticket
        </Button>
      </div>
      <div className='p-4 flex gap-6 items-center'>
        <div className='flex gap-2 items-center'>
          <h2 className='font-medium'>Status:</h2>
          <Select value={statusFilter} onValueChange={handleStatusChange}>
            <SelectTrigger className={`w-[180px] border-0 shadow-sm focus:ring-0 focus:ring-offset-0 focus:outline-none ${getCurrentStatusStyle()}`}>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent onCloseAutoFocus={(e) => e.preventDefault()}>
              {statusOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className='flex gap-2 items-center'>
          <h2 className='font-medium'>Sort by Updated:</h2>
          <Button
            variant="outline"
            size="sm"
            onClick={handleSortToggle}
            className="flex items-center gap-1 text-sm"
          >
            {sortOrder === null ? (
              <>
                No Sort
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </>
            ) : sortOrder === 'ASC' ? (
              <>
                Oldest First
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7l4-4m0 0l4 4m-4-4v18" />
                </svg>
              </>
            ) : (
              <>
                Newest First
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 17l-4 4m0 0l-4-4m4 4V3" />
                </svg>
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}