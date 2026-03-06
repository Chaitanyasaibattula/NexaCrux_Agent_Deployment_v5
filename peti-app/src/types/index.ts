export type LockerSize = 'small' | 'medium' | 'large';
export type LockerStatus = 'available' | 'occupied' | 'issue';
export type DeliveryStatus = 'Delivered' | 'Stale' | 'Picked Up';
export type ConfirmationType = 'mobile' | 'camera' | 'signature';
export type TicketStatus = 'Open' | 'In Progress' | 'Resolved';
export type TicketPriority = 'Low' | 'Medium' | 'High' | 'Emergency';
export type IssueCategory = 'Hardware Jam' | 'Touchscreen Unresponsive' | 'Sensor Error' | 'Power Issue' | 'Other';

export interface Locker {
  id: number;
  label: string;
  size: LockerSize;
  status: LockerStatus;
}

export interface Resident {
  name: string;
  unit: string;
  email: string;
  phone: string;
  pending: number;
}

export interface Delivery {
  id: string;
  timestamp: string;
  lockerId: string;
  carrier: string;
  recipient: string;
  unit: string;
  status: DeliveryStatus;
  confirmation: ConfirmationType;
  daysInLocker: number;
  pickupTime?: string;
}

export interface Ticket {
  id: string;
  lockerId: string;
  category: IssueCategory;
  priority: TicketPriority;
  status: TicketStatus;
  description: string;
  createdAt: string;
  assignedTo: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  userType: 'resident' | 'manager' | 'admin' | null;
  email: string | null;
}

export interface AppState {
  residents: Resident[];
  deliveries: Delivery[];
  lockers: Locker[];
  tickets: Ticket[];
  auth: AuthState;
}
