import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { AppState, Resident, Delivery, Locker, AuthState } from '../types';
import { storage } from '../utils/storage';
import { generateLockers, generateInitialResidents, generateInitialDeliveries, generateNewDelivery } from '../utils/dataGenerator';

interface AppContextType extends AppState {
  login: (email: string, password: string, userType: 'resident' | 'manager' | 'admin') => boolean;
  logout: () => void;
  updateLockerStatus: (lockerId: number, status: 'available' | 'occupied' | 'issue') => void;
  addDelivery: (delivery: Delivery) => void;
  addResident: (resident: Resident) => void;
  generateDemoData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [residents, setResidents] = useState<Resident[]>([]);
  const [deliveries, setDeliveries] = useState<Delivery[]>([]);
  const [lockers, setLockers] = useState<Locker[]>([]);
  const [auth, setAuth] = useState<AuthState>({
    isAuthenticated: false,
    userType: null,
    email: null
  });

  useEffect(() => {
    const savedAuth = storage.loadAuth();
    if (savedAuth && savedAuth.isAuthenticated) {
      setAuth(savedAuth);
    }

    const savedState = storage.loadState();
    if (savedState) {
      setResidents(savedState.residents);
      setDeliveries(savedState.deliveries);
      setLockers(savedState.lockers);
    } else {
      const initialLockers = generateLockers();
      const initialResidents = generateInitialResidents();
      const initialDeliveries = generateInitialDeliveries(initialResidents, initialLockers);
      
      setLockers(initialLockers);
      setResidents(initialResidents);
      setDeliveries(initialDeliveries);
    }
  }, []);

  useEffect(() => {
    if (residents.length > 0 || deliveries.length > 0 || lockers.length > 0) {
      storage.saveState({ residents, deliveries, lockers });
    }
  }, [residents, deliveries, lockers]);

  useEffect(() => {
    storage.saveAuth(auth);
  }, [auth]);

  useEffect(() => {
    if (!auth.isAuthenticated || auth.userType !== 'manager') return;

    const interval = setInterval(() => {
      const newDeliveryData = generateNewDelivery(residents, lockers);
      if (newDeliveryData) {
        const { delivery, lockerId } = newDeliveryData;
        
        setDeliveries(prev => [...prev, delivery]);
        setLockers(prev => prev.map(l => 
          l.id === lockerId ? { ...l, status: 'occupied' as const } : l
        ));
        setResidents(prev => prev.map(r => 
          r.unit === delivery.unit ? { ...r, pending: r.pending + 1 } : r
        ));

        console.log(`[REAL-TIME] New delivery: ${delivery.id} → ${delivery.lockerId} for ${delivery.recipient}`);
      }
    }, 60000);

    return () => clearInterval(interval);
  }, [auth, residents, lockers]);

  const login = useCallback((email: string, password: string, userType: 'resident' | 'manager' | 'admin'): boolean => {
    if (userType === 'manager' && email === 'property@gmail.com' && password === '1234') {
      setAuth({
        isAuthenticated: true,
        userType: 'manager',
        email
      });
      return true;
    }
    if (userType === 'admin' && email === 'admin@gmail.com' && password === '1234') {
      setAuth({
        isAuthenticated: true,
        userType: 'admin',
        email
      });
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    setAuth({
      isAuthenticated: false,
      userType: null,
      email: null
    });
  }, []);

  const updateLockerStatus = useCallback((lockerId: number, status: 'available' | 'occupied' | 'issue') => {
    setLockers(prev => prev.map(l => 
      l.id === lockerId ? { ...l, status } : l
    ));

    if (status === 'available') {
      setDeliveries(prev => {
        const locker = lockers.find(l => l.id === lockerId);
        if (!locker) return prev;
        
        const delivery = prev.find(d => d.lockerId === locker.label);
        if (delivery) {
          setResidents(r => r.map(resident => 
            resident.unit === delivery.unit 
              ? { ...resident, pending: Math.max(0, resident.pending - 1) }
              : resident
          ));
        }
        
        return prev.filter(d => d.lockerId !== locker.label);
      });
    }
  }, [lockers]);

  const addDelivery = useCallback((delivery: Delivery) => {
    setDeliveries(prev => [...prev, delivery]);
  }, []);

  const addResident = useCallback((resident: Resident) => {
    setResidents(prev => [...prev, resident]);
  }, []);

  const generateDemoData = useCallback(() => {
    const firstNames = ['Aarav', 'Vihaan', 'Vivaan', 'Ananya', 'Diya', 'Neha', 'Rohan', 'Aryan', 'Ishaan', 'Saanvi'];
    const lastNames = ['Sharma', 'Patel', 'Gupta', 'Kumar', 'Singh', 'Reddy', 'Nair', 'Desai', 'Mehta', 'Shah'];
    
    const newResidents: Resident[] = [];
    for (let i = 0; i < 20; i++) {
      const name = `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`;
      newResidents.push({
        name,
        unit: String(Math.floor(Math.random() * 900) + 100),
        email: `${name.toLowerCase().replace(' ', '.')}@email.com`,
        phone: `+91 98765 ${String(Math.floor(Math.random() * 90000) + 10000)}`,
        pending: Math.floor(Math.random() * 4)
      });
    }
    
    setResidents(prev => [...prev, ...newResidents]);

    const carriers = ['Amazon', 'Blue Dart', 'Delhivery', 'Flipkart', 'DHL'];
    const newDeliveries: Delivery[] = [];
    const updatedLockers = [...lockers];
    
    for (let i = 0; i < 30; i++) {
      const resident = [...residents, ...newResidents][Math.floor(Math.random() * (residents.length + newResidents.length))];
      const locker = updatedLockers[Math.floor(Math.random() * updatedLockers.length)];
      const shouldOccupy = Math.random() > 0.4;
      
      if (shouldOccupy) {
        locker.status = 'occupied';
      }
      
      const daysInLocker = Math.floor(Math.random() * 12) + 1;
      newDeliveries.push({
        id: `PKG-${9000 + i}`,
        timestamp: new Date(Date.now() - Math.random() * 86400000 * 10).toLocaleString('en-US', { 
          month: 'short', 
          day: 'numeric', 
          hour: '2-digit', 
          minute: '2-digit' 
        }),
        lockerId: locker.label,
        carrier: carriers[Math.floor(Math.random() * carriers.length)],
        recipient: resident.name,
        unit: resident.unit,
        status: daysInLocker > 7 ? 'Stale' : 'Delivered',
        confirmation: ['mobile', 'camera', 'signature'][Math.floor(Math.random() * 3)] as 'mobile' | 'camera' | 'signature',
        daysInLocker
      });
    }
    
    setLockers(updatedLockers);
    setDeliveries(prev => [...prev, ...newDeliveries]);
  }, [residents, lockers]);

  return (
    <AppContext.Provider value={{
      residents,
      deliveries,
      lockers,
      auth,
      login,
      logout,
      updateLockerStatus,
      addDelivery,
      addResident,
      generateDemoData
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};
