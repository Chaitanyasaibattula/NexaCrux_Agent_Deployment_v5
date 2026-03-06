import { Locker, Resident, Delivery, Ticket } from '../types';

export const generateLockers = (): Locker[] => {
  const lockers: Locker[] = [];
  
  // Small lockers: S-01 to S-50
  for (let i = 1; i <= 50; i++) {
    const rand = Math.random();
    let status: 'available' | 'occupied' | 'issue' = 'available';
    if (rand > 0.7) status = 'occupied';
    if (rand > 0.95) status = 'issue';
    
    lockers.push({
      id: i,
      label: `S-${String(i).padStart(2, '0')}`,
      size: 'small',
      status
    });
  }
  
  // Medium lockers: M-51 to M-84
  for (let i = 51; i <= 84; i++) {
    const rand = Math.random();
    let status: 'available' | 'occupied' | 'issue' = 'available';
    if (rand > 0.7) status = 'occupied';
    if (rand > 0.95) status = 'issue';
    
    lockers.push({
      id: i,
      label: `M-${String(i).padStart(2, '0')}`,
      size: 'medium',
      status
    });
  }
  
  // Large lockers: L-85 to L-100
  for (let i = 85; i <= 100; i++) {
    const rand = Math.random();
    let status: 'available' | 'occupied' | 'issue' = 'available';
    if (rand > 0.7) status = 'occupied';
    if (rand > 0.95) status = 'issue';
    
    lockers.push({
      id: i,
      label: `L-${String(i).padStart(2, '0')}`,
      size: 'large',
      status
    });
  }
  
  return lockers;
};

export const generateInitialResidents = (): Resident[] => {
  return [
    { name: 'Sarah Johnson', unit: '410', email: 'sarah.j@email.com', phone: '+91 98765 43210', pending: 2 },
    { name: 'Michael Chen', unit: '716', email: 'm.chen@email.com', phone: '+91 98765 43211', pending: 1 },
    { name: 'Emily Davis', unit: '308', email: 'emily.d@email.com', phone: '+91 98765 43212', pending: 0 },
    { name: 'Raj Patel', unit: '521', email: 'raj.p@email.com', phone: '+91 98765 43213', pending: 3 },
    { name: 'Priya Sharma', unit: '204', email: 'priya.s@email.com', phone: '+91 98765 43214', pending: 1 },
    { name: 'James Wilson', unit: '612', email: 'james.w@email.com', phone: '+91 98765 43215', pending: 0 },
    { name: 'Anita Desai', unit: '405', email: 'anita.d@email.com', phone: '+91 98765 43216', pending: 2 },
    { name: 'David Kim', unit: '803', email: 'david.k@email.com', phone: '+91 98765 43217', pending: 1 },
  ];
};

export const generateInitialDeliveries = (residents: Resident[], lockers: Locker[]): Delivery[] => {
  const carriers = ['Amazon', 'Blue Dart', 'Delhivery', 'Flipkart', 'DHL', 'FedEx'];
  const deliveries: Delivery[] = [];
  const occupiedLockers = lockers.filter(l => l.status === 'occupied');
  
  for (let i = 0; i < Math.min(25, occupiedLockers.length); i++) {
    const resident = residents[Math.floor(Math.random() * residents.length)];
    const locker = occupiedLockers[i];
    const daysInLocker = Math.floor(Math.random() * 10) + 1;
    const deliveryTime = Date.now() - Math.random() * 86400000 * 7;
    
    // 30% chance of being picked up
    const isPickedUp = Math.random() > 0.7;
    const confirmation = ['mobile', 'camera', 'signature'][Math.floor(Math.random() * 3)] as 'mobile' | 'camera' | 'signature';
    
    const delivery: any = {
      id: `PKG-${8000 + i}`,
      timestamp: new Date(deliveryTime).toLocaleString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
      lockerId: locker.label,
      carrier: carriers[Math.floor(Math.random() * carriers.length)],
      recipient: resident.name,
      unit: resident.unit,
      status: isPickedUp ? 'Picked Up' : (daysInLocker > 7 ? 'Stale' : 'Delivered'),
      confirmation: isPickedUp ? 'signature' : confirmation,
      daysInLocker
    };
    
    // Add pickup time if picked up
    if (isPickedUp) {
      const pickupTime = deliveryTime + Math.random() * 86400000 * 3; // Picked up 0-3 days after delivery
      delivery.pickupTime = new Date(pickupTime).toLocaleString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit' 
      });
    }
    
    deliveries.push(delivery);
  }
  
  return deliveries;
};

export const generateNewDelivery = (residents: Resident[], lockers: Locker[]): { delivery: Delivery; lockerId: number } | null => {
  const availableLockers = lockers.filter(l => l.status === 'available');
  if (availableLockers.length === 0 || residents.length === 0) return null;
  
  const carriers = ['Amazon', 'Blue Dart', 'Delhivery', 'Flipkart', 'DHL'];
  const locker = availableLockers[Math.floor(Math.random() * availableLockers.length)];
  const resident = residents[Math.floor(Math.random() * residents.length)];
  
  const delivery: Delivery = {
    id: `PKG-${9000 + Math.floor(Math.random() * 1000)}`,
    timestamp: new Date().toLocaleString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    }),
    lockerId: locker.label,
    carrier: carriers[Math.floor(Math.random() * carriers.length)],
    recipient: resident.name,
    unit: resident.unit,
    status: 'Delivered',
    confirmation: ['mobile', 'camera', 'signature'][Math.floor(Math.random() * 3)] as 'mobile' | 'camera' | 'signature',
    daysInLocker: 0
  };
  
  return { delivery, lockerId: locker.id };
};

export const generateInitialTickets = (lockers: Locker[]): Ticket[] => {
  const categories: Array<'Hardware Jam' | 'Touchscreen Unresponsive' | 'Sensor Error' | 'Power Issue' | 'Other'> = [
    'Hardware Jam', 'Touchscreen Unresponsive', 'Sensor Error', 'Power Issue', 'Other'
  ];
  const techNames = ['Nexa Support Tech #1', 'Nexa Support Tech #2', 'Nexa Support Tech #3', 'Nexa Support Tech #4', 'Nexa Support Tech #5'];
  
  const tickets: Ticket[] = [];
  
  // Generate 5 tickets: 2 Resolved, 1 In Progress, 1 Open, 1 Emergency Open
  const ticketConfigs = [
    { status: 'Resolved' as const, priority: 'Medium' as const, daysAgo: 10 },
    { status: 'Resolved' as const, priority: 'Low' as const, daysAgo: 7 },
    { status: 'In Progress' as const, priority: 'High' as const, daysAgo: 2 },
    { status: 'Open' as const, priority: 'Medium' as const, daysAgo: 1 },
    { status: 'Open' as const, priority: 'Emergency' as const, daysAgo: 0 },
  ];
  
  ticketConfigs.forEach((config, index) => {
    const locker = lockers[Math.floor(Math.random() * lockers.length)];
    const category = categories[Math.floor(Math.random() * categories.length)];
    const createdAt = new Date(Date.now() - config.daysAgo * 86400000);
    
    tickets.push({
      id: `NC-${8820 + index}`,
      lockerId: locker.label,
      category,
      priority: config.priority,
      status: config.status,
      description: `${category} detected in ${locker.label}. ${config.priority === 'Emergency' ? 'Immediate attention required.' : 'Requires maintenance check.'}`,
      createdAt: createdAt.toLocaleString('en-US', { 
        month: 'short', 
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit', 
        minute: '2-digit' 
      }),
      assignedTo: techNames[Math.floor(Math.random() * techNames.length)]
    });
  });
  
  return tickets;
};
