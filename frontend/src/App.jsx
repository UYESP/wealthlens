import { useState } from 'react'
import Layout from '@/components/Layout'
import Dashboard from '@/pages/Dashboard'
import Portfolio from '@/pages/Portfolio'
import Inmuebles from '@/pages/Inmuebles'

const pages = {
  dashboard: Dashboard,
  portfolio: Portfolio,
  inmuebles: Inmuebles,
}

export default function App() {
  const [currentPage, setCurrentPage] = useState('dashboard')
  const PageComponent = pages[currentPage]

  return (
    <Layout currentPage={currentPage} onNavigate={setCurrentPage}>
      <PageComponent />
    </Layout>
  )
}
