import { useApp } from './contexts/AppContext';
import Landing from './components/Landing';
import Dashboard from './components/Dashboard';
import AdminDashboard from './components/AdminDashboard';

function App() {
  const { auth } = useApp();

  return (
    <div className="min-h-screen">
      {auth.isAuthenticated && auth.userType === 'manager' ? (
        <Dashboard />
      ) : auth.isAuthenticated && auth.userType === 'admin' ? (
        <AdminDashboard />
      ) : (
        <Landing />
      )}
    </div>
  );
}

export default App;
