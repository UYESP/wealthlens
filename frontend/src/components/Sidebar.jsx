import { NavLink } from 'react-router-dom'
import { LayoutDashboard, TrendingUp, Building2, ScanEye } from 'lucide-react'
import { Separator } from '@/components/ui/separator'

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/portfolio', label: 'Portfolio', icon: TrendingUp },
  { to: '/inmuebles', label: 'Inmuebles', icon: Building2 },
]

export default function Sidebar() {
  return (
    <aside className="flex h-screen w-60 flex-col bg-slate-900 text-slate-100">
      {/* Brand */}
      <div className="flex items-center gap-2.5 px-5 py-5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500">
          <ScanEye className="h-4 w-4 text-white" />
        </div>
        <span className="text-base font-semibold tracking-tight">WealthLens</span>
      </div>

      <Separator className="bg-slate-700" />

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4">
        <p className="mb-2 px-2 text-[11px] font-medium uppercase tracking-widest text-slate-500">
          Menú
        </p>
        <ul className="space-y-0.5">
          {navItems.map(({ to, label, icon: Icon }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  `flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-indigo-600 text-white'
                      : 'text-slate-400 hover:bg-slate-800 hover:text-slate-100'
                  }`
                }
              >
                <Icon className="h-4 w-4 shrink-0" />
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <Separator className="bg-slate-700" />

      {/* Footer */}
      <div className="px-5 py-4">
        <p className="text-xs text-slate-500">WealthLens v0.1</p>
        <p className="text-xs text-slate-600">Personal Finance Tracker</p>
      </div>
    </aside>
  )
}
