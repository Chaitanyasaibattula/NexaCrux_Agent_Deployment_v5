# Nexa Crux — The New Architecture of Delivery

A professional, scalable React + Vite + TypeScript application for managing smart locker systems in premium properties.

<!-- Deployment: 2026-03-12 06:50 -->

## 🎯 Features Implemented

### ✅ Core Architecture
- **React 18 + Vite** - Modern build tooling with hot module replacement
- **TypeScript** - Full type safety across the application
- **Tailwind CSS** - Custom design system with PETI brand colors
- **Context API** - Centralized state management
- **localStorage Persistence** - All data survives page refreshes

### ✅ Fixed Hallucinations from Original
- **Locker Numbering**: Correctly generates S-01 to S-50, M-51 to M-84, L-85 to L-100
- **Delivery-Locker Sync**: Bidirectional mapping ensures consistency
- **Lucide Icons**: Properly integrated with `lucide-react`
- **Tailwind Config**: Custom animations and colors properly configured

### ✅ New Features
- **Real-time Delivery Simulation**: New deliveries auto-generate every 60 seconds
- **Mock Auth Provider**: Session state persists across refreshes
- **localStorage Integration**: Residents, deliveries, and lockers all persist
- **Modular Component Structure**: Clean separation of concerns

## 📁 Project Structure

```
peti-app/
├── public/
│   └── assets/              # Static assets (images)
├── src/
│   ├── components/
│   │   ├── modals/
│   │   │   ├── LoginModal.tsx
│   │   │   ├── SignupModal.tsx
│   │   │   └── ManagerModal.tsx
│   │   ├── Landing.tsx      # Landing page
│   │   └── Dashboard.tsx    # Manager dashboard
│   ├── contexts/
│   │   └── AppContext.tsx   # Global state + localStorage
│   ├── hooks/               # Custom React hooks
│   ├── types/
│   │   └── index.ts         # TypeScript interfaces
│   ├── utils/
│   │   ├── storage.ts       # localStorage utilities
│   │   └── dataGenerator.ts # Demo data generation
│   ├── App.tsx              # Root component
│   ├── main.tsx             # Entry point
│   └── index.css            # Global styles
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
└── postcss.config.js
```

## 🚀 Installation & Setup

### Prerequisites
- Node.js 18+ and npm

### Step 1: Install Dependencies
```bash
cd peti-app
npm install
```

### Step 2: Start Development Server
```bash
npm run dev
```

The app will open at `http://localhost:3000`

### Step 3: Build for Production
```bash
npm run build
```

## 🔐 Demo Credentials

**Manager Portal:**
- Email: `property@gmail.com`
- Password: `1234`

## 🎨 Key Improvements Over Original

### 1. **Fixed Locker Generation Logic**
**Before (Hallucination):**
```javascript
// Wrong indices - all lockers labeled incorrectly
if (i <= 50) { size = 'small'; label = `S-${i}`; }
else if (i <= 84) { size = 'medium'; label = `M-${i}`; }
else { size = 'large'; label = `L-${i}`; }
```

**After (Correct):**
```typescript
// Small: S-01 to S-50 (ids 1-50)
// Medium: M-51 to M-84 (ids 51-84)
// Large: L-85 to L-100 (ids 85-100)
for (let i = 1; i <= 50; i++) {
  lockers.push({ id: i, label: `S-${String(i).padStart(2, '0')}`, size: 'small', status });
}
```

### 2. **localStorage Persistence**
All state (residents, deliveries, lockers, auth) automatically saves and loads:
```typescript
// Auto-save on state change
useEffect(() => {
  storage.saveState({ residents, deliveries, lockers });
}, [residents, deliveries, lockers]);

// Auto-load on mount
useEffect(() => {
  const savedState = storage.loadState();
  if (savedState) {
    setResidents(savedState.residents);
    // ...
  }
}, []);
```

### 3. **Real-time Delivery Simulation**
```typescript
useEffect(() => {
  const interval = setInterval(() => {
    const newDeliveryData = generateNewDelivery(residents, lockers);
    if (newDeliveryData) {
      // Add delivery, update locker status, increment resident pending count
      setDeliveries(prev => [...prev, delivery]);
      setLockers(prev => prev.map(l => 
        l.id === lockerId ? { ...l, status: 'occupied' } : l
      ));
    }
  }, 60000); // Every 60 seconds
  return () => clearInterval(interval);
}, [auth, residents, lockers]);
```

### 4. **Bidirectional Delivery-Locker Sync**
When a locker is unlocked, the associated delivery is automatically removed:
```typescript
const updateLockerStatus = (lockerId: number, status: 'available') => {
  setLockers(prev => prev.map(l => l.id === lockerId ? { ...l, status } : l));
  
  // Remove delivery and update resident pending count
  setDeliveries(prev => {
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
};
```

## 🔧 Technologies Used

- **React 18.2** - UI library
- **Vite 5.0** - Build tool
- **TypeScript 5.2** - Type safety
- **Tailwind CSS 3.3** - Styling
- **Lucide React** - Icon library
- **Context API** - State management
- **localStorage** - Data persistence

## 📝 Next Steps (Future Enhancements)

1. **Full Dashboard Views**: Implement locker grid, deliveries table, residents table
2. **Image Assets**: Move JPG files to `/public/assets` and update paths
3. **CSV Upload**: Implement resident data import functionality
4. **API Integration**: Replace localStorage with backend API
5. **Mobile App**: Build React Native version
6. **Analytics**: Add charts and reporting features

## 🐛 Known Issues

- Dashboard is currently a placeholder - full locker grid and tables need implementation
- Images still reference original paths - need to be moved to `/public/assets`
- No CSV parsing yet - "Sync Property" button generates demo data only

## 📄 License

© 2026 PETI Systems. All rights reserved.

---

**Built with ❤️ by Senior Full-Stack Engineers**
