import { ItemStatus, RequestStatus, ReturnStatus } from '../../types';
import { getStatusLabel, getStatusColor, getRequestStatusLabel, getRequestStatusColor, getReturnStatusLabel, getReturnStatusColor } from '../../utils/helpers';

interface StatusBadgeProps {
  status: ItemStatus | RequestStatus | ReturnStatus;
  type?: 'item' | 'request' | 'return';
}

export const StatusBadge = ({ status, type = 'item' }: StatusBadgeProps) => {
  let label = '';
  let colorClass = '';
  
  if (type === 'item') {
    label = getStatusLabel(status as ItemStatus);
    colorClass = getStatusColor(status as ItemStatus);
  } else if (type === 'request') {
    label = getRequestStatusLabel(status as RequestStatus);
    colorClass = getRequestStatusColor(status as RequestStatus);
  } else {
    label = getReturnStatusLabel(status as ReturnStatus);
    colorClass = getReturnStatusColor(status as ReturnStatus);
  }
  
  return (
    <span className={`badge ${colorClass}`}>
      {label}
    </span>
  );
};
