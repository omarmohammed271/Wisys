import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import HRDashboard from './pages/HRDashboard/HRDashboard';
import { ThemeProvider } from '@/components/theme-provider';
import NavBar from './components/layout/NavBar';
import FinanceDashboard from './pages/FinanceDashboard/FinanceDashboard';

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router>
        <main className="bg-background select-none text-foreground lg:h-screen overflow-hidden flex flex-col py-3 md:px-20">
          <NavBar />
          <div className="flex flex-col flex-1">
            <Routes>
              <Route path="/" element={<HRDashboard />} />
            </Routes>
            <Routes>
              <Route path="/finance-dashboard" element={<FinanceDashboard />} />
            </Routes>
          </div>
        </main>
      </Router>
    </ThemeProvider>
  );
}

export default App;
