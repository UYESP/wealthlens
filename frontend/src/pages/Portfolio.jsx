import { useState } from 'react'
import { Plus } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import NuevaPositionSheet from '@/components/NuevaPositionSheet'

// Hardcoded data (M2 — estática)
const positions = [
  { ticker: 'VWCE', name: 'Vanguard FTSE All-World', type: 'ETF', broker: 'Interactive Brokers', qty: 120, buyPrice: 98.5, currentPrice: 114.2, currency: 'EUR' },
  { ticker: 'AAPL', name: 'Apple Inc.', type: 'Acción', broker: 'Interactive Brokers', qty: 25, buyPrice: 148.0, currentPrice: 189.3, currency: 'USD' },
  { ticker: 'MSCI', name: 'MSCI World ETF', type: 'ETF', broker: 'Degiro', qty: 80, buyPrice: 72.4, currentPrice: 81.1, currency: 'EUR' },
  { ticker: 'BTC', name: 'Bitcoin', type: 'Crypto', broker: 'Myinvestor', qty: 0.35, buyPrice: 28_000, currentPrice: 62_400, currency: 'USD' },
  { ticker: 'AMZN', name: 'Amazon.com Inc.', type: 'Acción', broker: 'Interactive Brokers', qty: 10, buyPrice: 130.0, currentPrice: 178.5, currency: 'USD' },
  { ticker: 'MC', name: 'LVMH Moët Hennessy', type: 'Acción', broker: 'Degiro', qty: 5, buyPrice: 720.0, currentPrice: 680.0, currency: 'EUR' },
]

function formatCurrency(amount, currency = 'EUR') {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency,
    maximumFractionDigits: 2,
  }).format(amount)
}

const typeBadgeColor = {
  ETF: 'bg-indigo-50 text-indigo-700',
  Acción: 'bg-blue-50 text-blue-700',
  Crypto: 'bg-amber-50 text-amber-700',
  Fondo: 'bg-violet-50 text-violet-700',
}

export default function Portfolio() {
  const [sheetOpen, setSheetOpen] = useState(false)

  return (
    <>
      <NuevaPositionSheet open={sheetOpen} onClose={() => setSheetOpen(false)} />
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-sm font-semibold text-slate-700">
            Posiciones — {positions.length} activos
          </CardTitle>
          <Button size="sm" onClick={() => setSheetOpen(true)}>
            <Plus className="mr-1.5 h-3.5 w-3.5" />
            Nueva posición
          </Button>
        </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50 text-xs font-medium uppercase tracking-wide text-slate-500">
                <th className="px-4 py-3 text-left">Activo</th>
                <th className="px-4 py-3 text-left">Tipo</th>
                <th className="px-4 py-3 text-left">Broker</th>
                <th className="px-4 py-3 text-right">Cantidad</th>
                <th className="px-4 py-3 text-right">P. Compra</th>
                <th className="px-4 py-3 text-right">P. Actual</th>
                <th className="px-4 py-3 text-right">G / P</th>
              </tr>
            </thead>
            <tbody>
              {positions.map((p) => {
                const costBasis = p.buyPrice * p.qty
                const currentValue = p.currentPrice * p.qty
                const gainLoss = currentValue - costBasis
                const gainLossPct = (gainLoss / costBasis) * 100
                const isPositive = gainLoss >= 0
                return (
                  <tr
                    key={p.ticker}
                    className="border-b border-slate-100 last:border-0 hover:bg-slate-50"
                  >
                    <td className="px-4 py-3">
                      <p className="font-semibold text-slate-800">{p.ticker}</p>
                      <p className="text-xs text-slate-400">{p.name}</p>
                    </td>
                    <td className="px-4 py-3">
                      <Badge
                        variant="secondary"
                        className={`text-xs ${typeBadgeColor[p.type] ?? 'bg-slate-100 text-slate-600'} hover:${typeBadgeColor[p.type]}`}
                      >
                        {p.type}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-slate-500">{p.broker}</td>
                    <td className="px-4 py-3 text-right text-slate-700">
                      {p.qty}
                    </td>
                    <td className="px-4 py-3 text-right text-slate-500">
                      {formatCurrency(p.buyPrice, p.currency)}
                    </td>
                    <td className="px-4 py-3 text-right font-medium text-slate-800">
                      {formatCurrency(p.currentPrice, p.currency)}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <p
                        className={`font-semibold ${isPositive ? 'text-emerald-600' : 'text-red-500'}`}
                      >
                        {isPositive ? '+' : ''}
                        {gainLossPct.toFixed(1)}%
                      </p>
                      <p
                        className={`text-xs ${isPositive ? 'text-emerald-500' : 'text-red-400'}`}
                      >
                        {isPositive ? '+' : ''}
                        {formatCurrency(gainLoss, p.currency)}
                      </p>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </CardContent>
      </Card>
    </>
  )
}
