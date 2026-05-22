import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from '@/components/Layout'
import Dashboard from '@/pages/Dashboard'
import Portfolio from '@/pages/Portfolio'
import Inmuebles from '@/pages/Inmuebles'

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/inmuebles" element={<Inmuebles />} />
      </Routes>
    </Layout>
  )
}
