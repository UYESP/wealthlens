import Sidebar from '@/components/Sidebar'

const pageTitles = {
  dashboard: 'Dashboard',
  portfolio: 'Portfolio Financiero',
  inmuebles: 'Inmuebles',
}

export default function Layout({ children, currentPage, onNavigate }) {
  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      <Sidebar currentPage={currentPage} onNavigate={onNavigate} />
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top bar */}
        <header className="flex h-14 shrink-0 items-center border-b border-slate-200 bg-white px-6">
          <h1 className="text-sm font-semibold text-slate-800">
            {pageTitles[currentPage]}
          </h1>
        </header>
        {/* Page content */}
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
