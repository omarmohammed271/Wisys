import { useState } from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import HRDashboard from './pages/HRDashboard'
import { ThemeProvider } from "@/components/theme-provider"
import NavBar from './components/layout/NavBar'

function App() {

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router>
        <main className='bg-background text-foreground lg:h-screen flex flex-col px-20'>
          <NavBar />
          <div className='flex flex-col flex-1'>
            <Routes>
              <Route path="/" element={<HRDashboard />} />
            </Routes>
          </div>
        </main>
      </Router>
    </ThemeProvider>
  )
}

export default App
