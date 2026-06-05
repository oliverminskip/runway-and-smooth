// src/App.jsx
import { Loader2 } from 'lucide-react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

function Gate() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-dvh items-center justify-center text-slate-500">
        <Loader2 size={24} className="animate-spin" />
      </div>
    );
  }

  return isAuthenticated ? <Dashboard /> : <Login />;
}

export default function App() {
  return (
    <AuthProvider>
      <Gate />
    </AuthProvider>
  );
}
