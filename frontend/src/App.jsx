import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Patients from './pages/Patients';
import PatientDetails from './pages/PatientDetails';
import DashboardPage from './pages/DashboardPage'; // ✅ nom du composant corrigé
import Sidebar from './components/Sidebar';

// ✅ Sous-composant pour la disposition globale avec sidebar
function AppLayout() {
  const navigate = useNavigate();

  const handleSelect = (page) => {
    if (page === 'dashboard') {
      navigate('/dashboard');
    } else if (page === 'patients') {
      navigate('/patients');
    }
  };

  return (
    <div className="flex">
      <Sidebar onSelect={handleSelect} />
      <div className="flex-1 p-4">
        <Routes>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/patients" element={<Patients />} />
          <Route path="/patients/:id" element={<PatientDetails />} />
          <Route path="/" element={<Navigate to="/dashboard" replace />} /> {/* redirection par défaut */}
        </Routes>
      </div>
    </div>
  );
}

// ✅ Composant principal de l'application
function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;
