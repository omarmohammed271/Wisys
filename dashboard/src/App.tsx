import { useState } from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import HRDashboard from './pages/dashboards/HRDashboard/HRDashboard'
import { ThemeProvider } from "@/components/theme-provider"
import NavBar from './components/layout/NavBar'
import HomeNavBar from './components/layout/HomeNavBar'
import ProcurmentDashboard from './pages/dashboards/ProcurmentDashboard'
import ManufacturingDashboard from './pages/dashboards/ManufacturingDashboard'
import FinanceDashboard from './pages/dashboards/FinanceDashboard'
import Home from './pages/Home/Home'
import Healthcare from './pages/Healthcare'
import NonHealthcare from './pages/NonHealthcare'
import Contact from './pages/Contact'

function App() {

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router>
        <main className='bg-background select-none text-foreground flex flex-col py-3 md:px-20'>
          <Routes>
            <Route path="/" element={<><HomeNavBar /><Home /></>} />
            <Route path="/healthcare" element={<><NavBar /><Healthcare /></>} />
            <Route path="/non-healthcare" element={<><NavBar /><NonHealthcare /></>} />
            <Route path="/contact" element={<><HomeNavBar /><Contact /></>} />
            <Route path="/hr-dashboard" element={<><NavBar /><HRDashboard /></>} />
            <Route path="/procurement-dashboard" element={<><NavBar /><ProcurmentDashboard /></>} />
            <Route path="/manufacturing-dashboard" element={<><NavBar /><ManufacturingDashboard /></>} />
            <Route path="/finance-dashboard" element={<><NavBar /><FinanceDashboard /></>} />
          </Routes>
        </main>
      </Router>
    </ThemeProvider>
  )
}

export default App