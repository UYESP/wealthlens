import { Building2, TrendingUp } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

// Hardcoded data (M2 — estática)
const properties = [
  {
    id: 1,
    name: 'Piso Madrid – Calle Mayor',
    location: 'Madrid, España',
    purchasePrice: 250_000,
    currentValue: 310_000,
    mortgage: { outstanding: 180_000, monthlyPayment: 850, interestRate: 2.5 },
    income: { monthlyRent: 1_200 },
    expenses: { ibi: 600, community: 1_200, insurance: 300, maintenance: 500 },
  },
  {
    id: 2,
    name: 'Local Barcelona – Eixample',
    location: 'Barcelona, España',
    purchasePrice: 180_000,
    currentValue: 228_000,
    mortgage: { outstanding: 79_270, monthlyPayment: 520, interestRate: 1.9 },
    income: { monthlyRent: 900 },
    expenses: { ibi: 480, community: 600, insurance: 220, maintenance: 300 },
  },
]

function formatCurrency(amount) {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(amount)
}

function calcStats(p) {
  const equity = p.currentValue - p.mortgage.outstanding
  const annualIncome = p.income.monthlyRent * 12
  const annualExpensesNoMortgage =
    p.expenses.ibi + p.expenses.community + p.expenses.insurance + p.expenses.maintenance
  const annualExpensesTotal = annualExpensesNoMortgage + p.mortgage.monthlyPayment * 12
  const grossYield = (annualIncome / p.currentValue) * 100
  const netYield = ((annualIncome - annualExpensesNoMortgage) / p.currentValue) * 100
  const cashflow = annualIncome - annualExpensesTotal
  return { equity, grossYield, netYield, cashflow }
}

function PropertyCard({ property }) {
  const { equity, grossYield, netYield, cashflow } = calcStats(property)
  const isCashflowPositive = cashflow >= 0

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-100">
              <Building2 className="h-4 w-4 text-emerald-700" />
            </div>
            <div>
              <CardTitle className="text-sm font-semibold text-slate-800">
                {property.name}
              </CardTitle>
              <p className="text-xs text-slate-400">{property.location}</p>
            </div>
          </div>
          <Badge
            variant="secondary"
            className="shrink-0 bg-emerald-50 text-emerald-700 hover:bg-emerald-50"
          >
            <TrendingUp className="mr-1 h-3 w-3" />
            {netYield.toFixed(1)}% neta
          </Badge>
        </div>
      </CardHeader>

      <Separator />

      <CardContent className="pt-4">
        {/* Main metrics grid */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div>
            <p className="text-xs text-slate-400">Valor actual</p>
            <p className="font-semibold text-slate-800">
              {formatCurrency(property.currentValue)}
            </p>
          </div>
          <div>
            <p className="text-xs text-slate-400">Equity</p>
            <p className="font-semibold text-emerald-600">{formatCurrency(equity)}</p>
          </div>
          <div>
            <p className="text-xs text-slate-400">Hipoteca pendiente</p>
            <p className="font-semibold text-slate-800">
              {formatCurrency(property.mortgage.outstanding)}
            </p>
          </div>
          <div>
            <p className="text-xs text-slate-400">Alquiler / mes</p>
            <p className="font-semibold text-slate-800">
              {formatCurrency(property.income.monthlyRent)}
            </p>
          </div>
        </div>

        <Separator className="my-4" />

        {/* Rentability details */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div>
            <p className="text-xs text-slate-400">Rent. bruta</p>
            <p className="font-medium text-slate-700">{grossYield.toFixed(1)}%</p>
          </div>
          <div>
            <p className="text-xs text-slate-400">Rent. neta</p>
            <p className="font-medium text-slate-700">{netYield.toFixed(1)}%</p>
          </div>
          <div>
            <p className="text-xs text-slate-400">Cuota hipoteca</p>
            <p className="font-medium text-slate-700">
              {formatCurrency(property.mortgage.monthlyPayment)}/mes
            </p>
          </div>
          <div>
            <p className="text-xs text-slate-400">Cashflow anual</p>
            <p
              className={`font-semibold ${isCashflowPositive ? 'text-emerald-600' : 'text-red-500'}`}
            >
              {isCashflowPositive ? '+' : ''}
              {formatCurrency(cashflow)}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default function Inmuebles() {
  return (
    <div className="space-y-4">
      {properties.map((p) => (
        <PropertyCard key={p.id} property={p} />
      ))}
    </div>
  )
}
