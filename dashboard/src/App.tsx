import { useState } from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import HRDashboard from './pages/HRDashboard'
import { ThemeProvider } from "@/components/theme-provider"
import NavBar from './components/layout/NavBar'
import ProcurmentDashboard from './pages/ProcurmentDashboard'
import ManufacturingDashboard from './pages/ManufacturingDashboard'

function App() {

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router>
        <main className='bg-background select-none text-foreground lg:h-screen overflow-hidden flex flex-col py-3 md:px-20'>
          <NavBar />
          <div className='flex flex-col flex-1'>
            <Routes>
              <Route path="/" element={<HRDashboard />} />
              <Route path="/procurement-dashboard" element={<ProcurmentDashboard />} />
              <Route path="/manufacturing-dashboard" element={<ManufacturingDashboard />} />
            </Routes>
          </div>
        </main>
      </Router>
    </ThemeProvider>
  )
}

export default App
