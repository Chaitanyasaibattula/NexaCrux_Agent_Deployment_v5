# PROJECT_CONTEXT.md

**Comprehensive System Documentation for AI Models**

This document provides complete context for the Nexa Crux project, enabling AI models to understand the architecture, design language, and implementation details required to continue development without losing consistency.

---

## 1. Project Identity

### **Nexa Crux: The New Architecture of Delivery**

**Nexa Crux** is a premium smart locker management system designed for high-end residential and commercial properties. The project was rebranded from **PETI** to establish a more futuristic, sophisticated identity.

**Core Aesthetic:**
- **Premium/Futuristic**: Dark, cinematic UI with neon accents
- **Cyberpunk-inspired**: Terminal-style logs, scan-line animations, glowing effects
- **Glassmorphism**: Semi-transparent cards with backdrop blur
- **High-fidelity**: Deep gradients, multi-layer lighting, 3D parallax effects

**Brand Positioning:**
- Target market: Luxury residential complexes, corporate offices, high-end retail
- Value proposition: Intelligent, secure, seamlessly integrated delivery infrastructure
- Tagline: "The New Architecture of Delivery"

---

## 2. Tech Stack

### **Architecture**

```
Vite + React 18 + TypeScript + Tailwind CSS
```

**Frontend Framework:**
- **React 18** - Modern component-based architecture with hooks
- **TypeScript** - Full type safety across the application
- **Vite** - Lightning-fast build tooling with HMR (Hot Module Replacement)

**Styling:**
- **Tailwind CSS** - Utility-first CSS framework with custom configuration
- **Custom animations** - Keyframe animations defined in `src/index.css`
- **Framer Motion** - 3D tilt/parallax effects for Nexa Series cards

**State Management:**
- **React Context API** - Centralized state in `AppContext.tsx`
- **localStorage** - Persistent data for residents, deliveries, lockers, and auth

**Icons:**
- **Lucide React** - Consistent icon library throughout the application

**Package Manager:**
- **npm** - Dependency management

---

## 3. Branding Specifications

### **Color Palette**

**Primary Colors:**
```css
--nexa-black: #0A0A0F        /* Deep background */
--nexa-charcoal: #1A1A2E     /* Surface/card backgrounds */
--nexa-surface: #1A1A2E      /* Interactive surfaces */
--nexa-indigo: #6366f1       /* Primary brand color */
--nexa-cyan: #00f2ff         /* Accent/highlight color */
--nexa-electric: #06b6d4     /* Secondary accent */
```

**Semantic Colors:**
```css
Matrix Green: #00FF41        /* Terminal success logs */
Neon Red: #FF3131            /* Terminal error/alert logs */
Nexa Cyan: #00f2ff           /* Terminal info logs, links */
Gold/Amber: #fbbf24          /* Admin portal theme */
```

**Gradient Backgrounds:**
```css
Hero Section: linear-gradient(135deg, #0a0a14 0%, #0f0f1e 50%, #141428 100%)
Locker Card: linear-gradient(145deg, #1a1a2e 0%, #0f0f1a 100%)
```

### **Typography**

**Font Families:**
```css
--font-space: 'Space Grotesk', sans-serif  /* Headings, titles, buttons */
--font-mono: 'JetBrains Mono', monospace   /* Terminal logs, code-like text */
```

**Font Weights:**
- Regular: 400
- Medium: 500
- Semibold: 600
- Bold: 700

### **Tailwind Custom Classes**

Defined in `tailwind.config.js`:
```javascript
colors: {
  'nexa-black': '#0A0A0F',
  'nexa-charcoal': '#1A1A2E',
  'nexa-surface': '#1A1A2E',
  'nexa-indigo': '#6366f1',
  'nexa-cyan': '#00f2ff',
  'nexa-electric': '#06b6d4',
}
```

**Custom Animations:**
```javascript
animation: {
  'float': 'float 6s ease-in-out infinite',
  'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
  'scale-in': 'scaleIn 0.2s ease-out',
  'marquee-rtl': 'marquee-rtl 30s linear infinite',
}
```

---

## 4. Key Features & Components

### **4.1 3D Locker Hero Component**

**Location:** `src/components/Landing.tsx` (Hero Section)

**Description:**
The centerpiece of the landing page is a floating 3D locker with multi-layer lighting effects.

**Technical Implementation:**
```tsx
<div className="relative animate-float">
  {/* Multi-layer ambient glows */}
  <div style={{background: 'radial-gradient(ellipse at center, rgba(59, 130, 246, 0.4) 0%, rgba(79, 70, 229, 0.3) 30%, transparent 65%)'}} 
       className="absolute inset-0 rounded-3xl blur-[120px]"></div>
  
  {/* Locker container with scan-line */}
  <div className="relative w-72 h-[480px] rounded-2xl locker-glow overflow-hidden">
    <div className="scan-line"></div>
    {/* Locker compartments */}
  </div>
</div>
```

**Scan-Line Animation:**
Defined in `src/index.css`:
```css
.scan-line {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background: linear-gradient(90deg, transparent, #00f2ff, transparent);
  box-shadow: 0 0 20px #00f2ff, 0 0 40px #00f2ff, 0 0 60px #00f2ff;
  animation: scan 3s linear infinite;
}

@keyframes scan {
  0% { top: 0; opacity: 0; }
  50% { opacity: 1; }
  100% { top: 100%; opacity: 0; }
}
```

**Lighting Layers:**
1. Deep background blur (120px)
2. Mid-layer glow (80px)
3. Edge glow rings (-inset-6)
4. Spotlight effect (linear gradient)
5. Box shadows for depth

---

### **4.2 Nexa Crux Core Terminal**

**Location:** `src/components/Landing.tsx` (Hero Section)

**Description:**
Real-time terminal simulation with auto-scrolling logs and heartbeat animation.

**Technical Implementation:**
```tsx
useEffect(() => {
  const terminalFeed = document.getElementById('terminalFeed');
  const logTemplates = [
    { text: '[SECURE] Locker M-{n} verified', color: 'text-[#00FF41]' },
    { text: '[SYNC] Cloud database updated', color: 'text-[#00f2ff]' },
    { text: '[AUTH] Admin session active', color: 'text-[#FF3131]' },
    // ... more templates
  ];
  
  const interval = setInterval(() => {
    const randomLog = logTemplates[Math.floor(Math.random() * logTemplates.length)];
    const logText = randomLog.text.replace('{n}', Math.floor(Math.random() * 100));
    // Append to terminal and auto-scroll
  }, 2000);
}, []);
```

**Heartbeat Animation:**
```css
@keyframes heartbeat {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.1); opacity: 0.8; }
}
```

**Terminal Styling:**
- Background: `#0A0A0F` with border `#00f2ff/30`
- Font: `JetBrains Mono`
- Auto-scroll: `scrollTop = scrollHeight`
- Log colors: Matrix Green, Neon Red, Nexa Cyan

---

### **4.3 Inquire Form (InquireModal)**

**Location:** `src/components/modals/InquireModal.tsx`

**Description:**
Contact form with custom-styled dropdown and glassmorphism design.

**Key Features:**
1. **Product Interest Dropdown** - Custom select with proper visibility
2. **Thank You State** - Success screen with animated checkmark
3. **Glassmorphism** - Semi-transparent background with backdrop blur

**Dropdown Fix (Critical):**
```tsx
<div className="relative">
  <select 
    className="appearance-none cursor-pointer pr-10"
    style={{background: '#1A1A2E', color: '#FFFFFF'}}
  >
    <option value="" style={{background: '#1A1A2E', color: '#FFFFFF'}}>Select a product</option>
    <option value="nexa-hub" style={{background: '#1A1A2E', color: '#FFFFFF'}}>Nexa Hub</option>
    <option value="nexa-hive" style={{background: '#1A1A2E', color: '#FFFFFF'}}>Nexa Hive</option>
    <option value="nexa-stealth" style={{background: '#1A1A2E', color: '#FFFFFF'}}>Nexa [Stealth]</option>
  </select>
  {/* Custom chevron icon */}
  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
    <svg className="w-4 h-4 text-gray-400">...</svg>
  </div>
</div>
```

**Submit Button Glow:**
```tsx
<button className="group hover:shadow-lg hover:shadow-nexa-indigo/50">
  <span className="relative z-10">Submit Inquiry</span>
  <div className="absolute inset-0 bg-gradient-to-r from-nexa-cyan to-nexa-indigo opacity-0 group-hover:opacity-100"></div>
</button>
```

---

### **4.4 Nexa Series Section**

**Location:** `src/components/Landing.tsx` (After Capabilities)

**Description:**
Three product cards with framer-motion 3D tilt effects.

**Products:**
1. **Nexa Hub** - Residential/corporate (glassmorphism)
2. **Nexa Hive** - Luxury retail (hexagonal clip-path)
3. **Nexa [Stealth]** - Coming soon (dark theme)

**Framer Motion Implementation:**
```tsx
<motion.div
  whileHover={{ rotateY: 5, rotateX: -5, scale: 1.02 }}
  transition={{ type: "spring", stiffness: 300, damping: 20 }}
  style={{ transformStyle: "preserve-3d" }}
>
  {/* Card content */}
</motion.div>
```

**Hexagonal Card (Nexa Hive):**
```tsx
<motion.div
  style={{ clipPath: "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)" }}
>
  {/* Hexagonal content */}
</motion.div>
```

---

## 5. Authentication Structure

### **Three-Tier Access System**

#### **Tier 1: Public Landing Page**
- **Route:** `/` (unauthenticated)
- **Component:** `Landing.tsx`
- **Access:** Open to all visitors
- **Features:** Hero section, Nexa Series, capabilities, inquiry form

#### **Tier 2: Property Manager Dashboard**
- **Route:** `/` (authenticated as `manager`)
- **Component:** `Dashboard.tsx`
- **Credentials:** `property@gmail.com` / `1234`
- **Access Modal:** `ManagerModal.tsx`
- **Features:** 
  - Delivery management
  - Locker status monitoring
  - Resident management
  - Real-time delivery simulation (60s interval)

#### **Tier 3: System Admin Portal**
- **Route:** `/` (authenticated as `admin`)
- **Component:** `AdminDashboard.tsx`
- **Credentials:** `admin@gmail.com` / `1234`
- **Access Modal:** `AdminModal.tsx`
- **Features:**
  - Building overview (Prism)
  - KPI dashboard (deliveries, occupancy, residents, stale packages)
  - Full system analytics
  - Gold/amber theme for distinction

### **Authentication Flow**

**Login Modal Links:**
```tsx
<LoginModal>
  {/* Resident login (coming soon) */}
  <button onClick={onSwitchToManager} style={{color: '#6366f1'}}>Manager Portal</button>
  <button onClick={onSwitchToAdmin} style={{color: '#fbbf24'}}>Admin Portal</button>
  <button onClick={onSwitchToSignup} style={{color: '#00f2ff'}}>Sign Up</button>
</LoginModal>
```

**Routing Logic (App.tsx):**
```tsx
{auth.isAuthenticated && auth.userType === 'manager' ? (
  <Dashboard />
) : auth.isAuthenticated && auth.userType === 'admin' ? (
  <AdminDashboard />
) : (
  <Landing />
)}
```

### **Security Notes**

- **No hardcoded credentials in input fields** (all useState initialized to `''`)
- **No visible demo hints** in production modals
- **Credentials validated in AppContext.tsx** login function
- **Session persists via localStorage** (`storage.saveAuth()`)

---

## 6. State Management

### **AppContext.tsx**

**Location:** `src/contexts/AppContext.tsx`

**Purpose:** Centralized state management for the entire application.

**State Variables:**
```typescript
interface AppState {
  residents: Resident[];
  deliveries: Delivery[];
  lockers: Locker[];
  auth: AuthState;
}

interface AuthState {
  isAuthenticated: boolean;
  userType: 'resident' | 'manager' | 'admin' | null;
  email: string | null;
}
```

**Key Functions:**
```typescript
login(email: string, password: string, userType: 'resident' | 'manager' | 'admin'): boolean
logout(): void
updateLockerStatus(lockerId: number, status: 'available' | 'occupied' | 'issue'): void
addDelivery(delivery: Delivery): void
addResident(resident: Resident): void
generateDemoData(): void
```

### **localStorage Persistence**

**Storage Keys:**
- `nexa-crux-state` - Residents, deliveries, lockers
- `nexa-crux-auth` - Authentication state

**Implementation:**
```typescript
// Load on mount
useEffect(() => {
  const savedAuth = storage.loadAuth();
  const savedState = storage.loadState();
  // ... restore state
}, []);

// Save on change
useEffect(() => {
  storage.saveState({ residents, deliveries, lockers });
}, [residents, deliveries, lockers]);

useEffect(() => {
  storage.saveAuth(auth);
}, [auth]);
```

### **Real-Time Delivery Simulation**

**Manager Dashboard Only:**
```typescript
useEffect(() => {
  if (!auth.isAuthenticated || auth.userType !== 'manager') return;
  
  const interval = setInterval(() => {
    const newDelivery = generateNewDelivery(residents, lockers);
    setDeliveries(prev => [...prev, newDelivery]);
    // Update locker status and resident pending count
  }, 60000); // Every 60 seconds
  
  return () => clearInterval(interval);
}, [auth, residents, lockers]);
```

---

## 7. Asset Mapping

### **Public Assets Directory**

**Location:** `/public/assets/`

**Structure:**
```
/public/
  /assets/
    /images/
      - logo.png
      - locker-3d.png
      - hero-background.jpg
      - (other visual assets)
```

**Usage in Components:**
```tsx
<img src="/assets/images/logo.png" alt="Nexa Crux" />
```

**Important Notes:**
- All images referenced with `/assets/` prefix (Vite public directory)
- No import statements needed for public assets
- Assets are copied to dist folder during build

---

## 8. Recent Fixes & Improvements

### **8.1 Logo Replacement**

**Issue:** Old "P" logo from PETI branding
**Fix:** Replaced with geometric "X" icon using Lucide React

```tsx
// Before
<Activity className="w-6 h-6" />

// After
<X className="w-6 h-6 text-white" strokeWidth={2.5} />
```

**Locations:**
- Navbar logo (`Landing.tsx`)
- Footer logo (`Landing.tsx`)

---

### **8.2 Dropdown Visibility Fix**

**Issue:** Product Interest dropdown had white background with white text (invisible)
**Fix:** Applied explicit inline styles for cross-browser compatibility

```tsx
<select style={{background: '#1A1A2E', color: '#FFFFFF'}}>
  <option style={{background: '#1A1A2E', color: '#FFFFFF'}}>...</option>
</select>
```

**Additional Fixes:**
- Added `appearance-none` to remove default browser styling
- Custom SVG chevron icon for dropdown arrow
- Proper padding-right to prevent text overlap

---

### **8.3 Smooth Scrolling Implementation**

**Issue:** Navigation links caused jarring page jumps
**Fix:** Added smooth scroll behavior globally

```css
/* src/index.css */
html {
  scroll-behavior: smooth;
}
```

**Navigation Links:**
```tsx
<a href="#capabilities" className="...">Capabilities</a>
<a href="#nexa-series" className="...">Nexa Series</a>
<a href="#core" className="...">Nexa Crux Core</a>
```

---

### **8.4 Hero Section Lighting Replication**

**Issue:** Lighting didn't match reference screenshot
**Fix:** Multi-layer radial gradients with precise opacity and blur values

```tsx
{/* Deep blue-purple background gradient */}
<section style={{background: 'linear-gradient(135deg, #0a0a14 0%, #0f0f1e 50%, #141428 100%)'}}>
  {/* Atmospheric glow layers */}
  <div style={{background: 'radial-gradient(circle, rgba(59, 130, 246, 0.35) 0%, rgba(79, 70, 229, 0.25) 40%, transparent 70%)'}}></div>
  
  {/* Concentrated locker glow */}
  <div style={{background: 'radial-gradient(ellipse at center, rgba(59, 130, 246, 0.4) 0%, rgba(79, 70, 229, 0.3) 30%, transparent 65%)'}}></div>
</section>
```

---

### **8.5 Social Proof Section Management**

**History:**
1. Initially removed during rebranding
2. Restored per user screenshot with colorful circular logos
3. Finally removed for cleaner hero section

**Current State:** No social proof section in hero

---

### **8.6 System Intelligence Icons Update**

**Issue:** Generic icons didn't match premium aesthetic
**Fix:** Updated to Waves and Cpu icons with glowing effects

```tsx
// Real-time Monitoring
<Waves className="w-7 h-7 text-nexa-cyan animate-pulse-slow" />

// Predictive Analytics
<Cpu className="w-7 h-7 text-green-400 animate-pulse-slow" />
```

**Glassmorphism Applied:**
```tsx
<div className="glass-card-strong rounded-2xl p-8 border border-white/10 backdrop-blur-md">
  {/* Card content */}
</div>
```

---

### **8.7 Auth Modal Hyperlink Styling**

**Issue:** Inconsistent link colors and missing hover states
**Fix:** Standardized with brand colors and underline effects

```tsx
// Login link (Nexa Cyan)
<button style={{color: '#00f2ff'}} className="hover:underline">Login</button>

// Sign Up link (Nexa Cyan)
<button style={{color: '#00f2ff'}} className="hover:underline">Sign Up</button>

// Manager Portal link (Nexa Indigo)
<button style={{color: '#6366f1'}} className="hover:underline">Manager Portal</button>

// Admin Portal link (Gold)
<button style={{color: '#fbbf24'}} className="font-bold hover:underline">Admin Portal</button>
```

---

### **8.8 Security Cleanup**

**Issue:** Hardcoded credentials visible in modals
**Fix:** Removed all pre-filled values and demo hints

**Manager Modal:**
```tsx
// Before
const [email, setEmail] = useState('property@gmail.com');
const [password, setPassword] = useState('1234');

// After
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
```

**Removed Elements:**
- Demo credentials footer text
- Hardcoded input values
- Visible password hints

---

## 9. Component Architecture

### **File Structure**

```
src/
├── components/
│   ├── Landing.tsx              # Main landing page
│   ├── Dashboard.tsx            # Manager dashboard
│   ├── AdminDashboard.tsx       # Admin portal
│   └── modals/
│       ├── LoginModal.tsx       # Resident login
│       ├── SignupModal.tsx      # Resident signup
│       ├── ManagerModal.tsx     # Manager auth
│       ├── AdminModal.tsx       # Admin auth
│       └── InquireModal.tsx     # Contact form
├── contexts/
│   └── AppContext.tsx           # Global state
├── types/
│   └── index.ts                 # TypeScript interfaces
├── utils/
│   ├── dataGenerator.ts         # Mock data generation
│   └── storage.ts               # localStorage utilities
├── index.css                    # Global styles + animations
├── App.tsx                      # Root component + routing
└── main.tsx                     # Entry point
```

### **Component Hierarchy**

```
App.tsx
├── Landing.tsx (unauthenticated)
│   ├── Hero Section (3D Locker + Terminal)
│   ├── Carrier Marquee
│   ├── Capabilities Section
│   ├── Nexa Series Section (Framer Motion cards)
│   ├── Nexa Crux Core Section
│   ├── Sectors Section
│   ├── Sustainability Section
│   ├── Footer
│   └── Modals (conditional)
│       ├── LoginModal
│       ├── SignupModal
│       ├── ManagerModal
│       ├── AdminModal
│       └── InquireModal
├── Dashboard.tsx (manager authenticated)
│   ├── Header
│   ├── Stats Grid
│   ├── Delivery Table
│   └── Locker Grid
└── AdminDashboard.tsx (admin authenticated)
    ├── Header (Building: Prism)
    ├── KPI Cards
    └── System Overview
```

---

## 10. Design Constraints & Guidelines

### **DO's:**
✅ Use `nexa-*` color classes (never `peti-*`)
✅ Apply glassmorphism with `backdrop-blur-md` and semi-transparent backgrounds
✅ Use `font-space` for headings, `font-mono` for terminal/code text
✅ Implement multi-layer lighting for premium depth
✅ Add hover states with smooth transitions
✅ Use Lucide React icons exclusively
✅ Maintain dark theme (#0A0A0F background)
✅ Apply neon accent colors (#00f2ff, #6366f1)

### **DON'Ts:**
❌ Never use old PETI branding or color classes
❌ Avoid bright white backgrounds (use dark surfaces)
❌ Don't use generic icons (stick to Lucide)
❌ Avoid flat designs (add depth with shadows/glows)
❌ Don't hardcode credentials in input fields
❌ Never remove smooth scroll behavior
❌ Avoid breaking the three-tier auth structure

---

## 11. Development Commands

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type check
npx tsc --noEmit
```

---

## 12. Future Considerations

### **Planned Features:**
- Resident authentication and dashboard
- Real backend API integration
- Multi-building support (beyond Prism)
- Advanced analytics and reporting
- Mobile app integration
- Notification system

### **Technical Debt:**
- TypeScript module declaration errors for modals (non-blocking)
- Hardcoded demo credentials in login logic (replace with API)
- Mock data generation (replace with real database)

---

## 13. Critical Implementation Notes

### **For AI Models Continuing This Project:**

1. **Always use inline styles for critical visibility** (e.g., dropdown backgrounds) to ensure cross-browser compatibility
2. **Maintain the three-tier auth structure** - never merge or simplify
3. **Preserve the multi-layer lighting approach** - it's core to the premium aesthetic
4. **Keep terminal logs randomized and auto-scrolling** - it's a key brand differentiator
5. **Never remove the scan-line animation** - it's iconic to the 3D locker
6. **Respect the color palette** - deviations break the cohesive design language
7. **Use framer-motion for all 3D effects** - CSS transforms alone aren't sufficient
8. **Maintain localStorage persistence** - users expect data to survive refreshes
9. **Keep modals clean and professional** - no visible demo credentials
10. **Test dropdown visibility** - it's a recurring issue across browsers

---

## 14. Contact & Support

**Project Name:** Nexa Crux  
**Original Name:** PETI  
**Version:** 1.0.0  
**Last Updated:** March 2, 2026  
**Tech Lead:** AI-Assisted Development  

---

**End of Documentation**

This document should provide complete context for any AI model to understand and continue building the Nexa Crux project while maintaining design consistency and technical standards.
