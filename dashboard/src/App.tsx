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
import Contact from './pages/Contact'
import NonClinical from './pages/NonClinical'
import Clinical from './pages/Clinical'
import { OverlayProvider } from './context/AIOverlayContext'

function App() {

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <OverlayProvider>
        <Router>
          <main className='bg-background select-none text-foreground max-h-screen h-screen min-h-screen  flex flex-col py-3 md:px-20 box-border'>
            <Routes>
              <Route path="/" element={<><HomeNavBar /><Home /></>} />
              <Route path="/Clinical" element={<><NavBar /><Clinical /></>} />
              <Route path="/non-Clinical" element={<><NavBar /><NonClinical /></>} />
              <Route path="/contact" element={<><HomeNavBar /><Contact /></>} />
              <Route path="/hr-dashboard" element={<><NavBar /><HRDashboard /></>} />
              <Route path="/procurement-dashboard" element={<>
                <NavBar />
                <div className='flex flex-col flex-1'>
                  <ProcurmentDashboard />
                </div>
                </>
              } />
              <Route path="/manufacturing-dashboard" element={<><NavBar /><ManufacturingDashboard /></>} />
              <Route path="/finance-dashboard" element={<><NavBar /><FinanceDashboard /></>} />
            </Routes>
          </main>
        </Router>
      </OverlayProvider>
    </ThemeProvider>
  )
}

export default App