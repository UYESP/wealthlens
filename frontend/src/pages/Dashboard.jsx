import { TrendingUp, TrendingDown, Wallet, BarChart2, Building2, Percent } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

// --- Hardcoded data (M2 — estática) ---
const summaryData = {
  patrimonioNeto: 490_730,
  portfolio: 312_480,
  inmuebles: {
    valorTotal: 620_000,
    hipotecas: 129_270,
    equity: 490_730,
  },
  rentabilidad: {
    global: 8.7,
    portfolio: 12.4,
    inmuebles: 4.2,
  },
}

function formatCurrency(amount) {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(amount)
}

function ReturnBadge({ value }) {
  const isPositive = value >= 0
  return (
    <Badge
      variant="secondary"
      className={`gap-1 font-medium ${
        isPositive
          ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-50'
          : 'bg-red-50 text-red-600 hover:bg-red-50'
      }`}
    >
      {isPositive ? (
        <TrendingUp className="h-3 w-3" />
      ) : (
        <TrendingDown className="h-3 w-3" />
      )}
      {isPositive ? '+' : ''}{value.toFixed(1)}%
    </Badge>
  )
}

function SummaryCard({ title, value, subtitle, badge, icon: Icon, accent }) {
  return (
    <Card className="relative overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <CardTitle className="text-sm font-medium text-slate-500">
            {title}
          </CardTitle>
          <div
            className={`flex h-8 w-8 items-center justify-center rounded-lg ${accent}`}
          >
            <Icon className="h-4 w-4 text-white" />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold tracking-tight text-slate-900">
          {value}
        </p>
        <div className="mt-1.5 flex items-center gap-2">
          {badge}
          {subtitle && (
            <span className="text-xs text-slate-400">{subtitle}</span>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

// --- Distribución por clase de activo (hardcoded) ---
const distribution = [
  { label: 'Acciones', pct: 38, color: 'bg-indigo-500' },
  { label: 'ETFs', pct: 24, color: 'bg-violet-500' },
  { label: 'Fondos', pct: 12, color: 'bg-blue-400' },
  { label: 'Crypto', pct: 6, color: 'bg-cyan-400' },
  { label: 'Inmuebles', pct: 20, color: 'bg-emerald-500' },
]

export default function Dashboard() {
  const { patrimonioNeto, portfolio, inmuebles, rentabilidad } = summaryData

  return (
    <div className="space-y-6">
      {/* Summary cards */}
      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        <SummaryCard
          title="Patrimonio Neto"
          value={formatCurrency(patrimonioNeto)}
          badge={<ReturnBadge value={rentabilidad.global} />}
          subtitle="vs. inicio de año"
          icon={Wallet}
          accent="bg-indigo-500"
        />
        <SummaryCard
          title="Portfolio Financiero"
          value={formatCurrency(portfolio)}
          badge={<ReturnBadge value={rentabilidad.portfolio} />}
          subtitle="rentabilidad YTD"
          icon={BarChart2}
          accent="bg-violet-500"
        />
        <SummaryCard
          title="Equity Inmobiliario"
          value={formatCurrency(inmuebles.equity)}
          subtitle={`Valor: ${formatCurrency(inmuebles.valorTotal)}`}
          badge={<ReturnBadge value={rentabilidad.inmuebles} />}
          icon={Building2}
          accent="bg-emerald-500"
        />
        <SummaryCard
          title="Rentabilidad Global"
          value={`+${rentabilidad.global.toFixed(1)}%`}
          subtitle="anualizada"
          badge={<ReturnBadge value={rentabilidad.global} />}
          icon={Percent}
          accent="bg-amber-500"
        />
      </div>

      {/* Second row */}
      <div className="grid grid-cols-3 gap-4">
        {/* Distribución por clase de activo */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="text-sm font-semibold text-slate-700">
              Distribución del patrimonio
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {distribution.map(({ label, pct, color }) => (
              <div key={label}>
                <div className="mb-1 flex items-center justify-between text-xs">
                  <span className="text-slate-600">{label}</span>
                  <span className="font-medium text-slate-800">{pct}%</span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                  <div
                    className={`h-full rounded-full ${color}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Resumen portfolio */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="text-sm font-semibold text-slate-700">
              Portfolio por broker
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {[
                { broker: 'Interactive Brokers', valor: 187_450, pct: 60 },
                { broker: 'Degiro', valor: 75_200, pct: 24 },
                { broker: 'Myinvestor', valor: 49_830, pct: 16 },
              ].map(({ broker, valor, pct }) => (
                <li
                  key={broker}
                  className="flex items-center justify-between text-sm"
                >
                  <div>
                    <p className="font-medium text-slate-700">{broker}</p>
                    <p className="text-xs text-slate-400">{pct}% del total</p>
                  </div>
                  <span className="font-semibold text-slate-800">
                    {formatCurrency(valor)}
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Resumen inmuebles */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="text-sm font-semibold text-slate-700">
              Resumen inmobiliario
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {[
                {
                  nombre: 'Piso Madrid – Calle Mayor',
                  equity: 130_000,
                  rent: '+4.8%',
                },
                {
                  nombre: 'Local Barcelona – Eixample',
                  equity: 48_730,
                  rent: '+3.2%',
                },
              ].map(({ nombre, equity, rent }) => (
                <li key={nombre} className="text-sm">
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-medium leading-tight text-slate-700">
                      {nombre}
                    </p>
                    <Badge
                      variant="secondary"
                      className="shrink-0 bg-emerald-50 text-emerald-700 hover:bg-emerald-50"
                    >
                      {rent}
                    </Badge>
                  </div>
                  <p className="mt-0.5 text-xs text-slate-400">
                    Equity: {formatCurrency(equity)}
                  </p>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
