import { useState } from 'react'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from '@/components/ui/sheet'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

const ASSET_TYPES = [
  { value: 'stock', label: 'Acción' },
  { value: 'etf', label: 'ETF' },
  { value: 'fund', label: 'Fondo' },
  { value: 'crypto', label: 'Crypto' },
]

const CURRENCIES = [
  { value: 'EUR', label: 'EUR — Euro' },
  { value: 'USD', label: 'USD — Dólar' },
  { value: 'GBP', label: 'GBP — Libra' },
]

const BROKERS = [
  'Interactive Brokers',
  'Degiro',
  'Myinvestor',
  'Otro',
]

const initialForm = {
  ticker: '',
  name: '',
  type: '',
  currency: '',
  broker: '',
  quantity: '',
  buyPrice: '',
}

function FieldGroup({ label, required, children, hint }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs font-medium text-slate-700">
        {label}
        {required && <span className="ml-0.5 text-red-400">*</span>}
      </Label>
      {children}
      {hint && <p className="text-[11px] text-slate-400">{hint}</p>}
    </div>
  )
}

function SectionTitle({ children }) {
  return (
    <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-400">
      {children}
    </p>
  )
}

function formatCurrency(amount, currency) {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: currency || 'EUR',
    maximumFractionDigits: 2,
  }).format(amount)
}

export default function NuevaPositionSheet({ open, onClose }) {
  const [form, setForm] = useState(initialForm)

  function handleChange(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  function handleClose() {
    setForm(initialForm)
    onClose()
  }

  const qty = parseFloat(form.quantity)
  const price = parseFloat(form.buyPrice)
  const costBasis = !isNaN(qty) && !isNaN(price) && qty > 0 && price > 0
    ? qty * price
    : null

  const isFormComplete =
    form.ticker &&
    form.name &&
    form.type &&
    form.currency &&
    form.broker &&
    form.quantity &&
    form.buyPrice

  return (
    <Sheet open={open} onOpenChange={handleClose}>
      <SheetContent className="flex w-full flex-col gap-0 p-0 sm:max-w-md">
        {/* Header */}
        <SheetHeader className="px-6 pt-6 pb-4">
          <SheetTitle className="text-base font-semibold text-slate-900">
            Nueva posición
          </SheetTitle>
          <SheetDescription className="text-xs text-slate-400">
            Registra un activo financiero en tu portfolio. Los campos con{' '}
            <span className="text-red-400">*</span> son obligatorios.
          </SheetDescription>
        </SheetHeader>

        <Separator />

        {/* Scrollable form body */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          <div className="space-y-6">

            {/* ── Sección: Activo ── */}
            <div className="space-y-4">
              <SectionTitle>Activo</SectionTitle>

              <FieldGroup label="Ticker" required hint="Ej: AAPL, VWCE, BTC">
                <Input
                  placeholder="VWCE"
                  value={form.ticker}
                  onChange={(e) =>
                    handleChange('ticker', e.target.value.toUpperCase())
                  }
                  className="uppercase placeholder:normal-case"
                />
              </FieldGroup>

              <FieldGroup label="Nombre del activo" required>
                <Input
                  placeholder="Vanguard FTSE All-World ETF"
                  value={form.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                />
              </FieldGroup>

              <div className="grid grid-cols-2 gap-3">
                <FieldGroup label="Tipo de activo" required>
                  <Select
                    value={form.type}
                    onValueChange={(v) => handleChange('type', v)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar" />
                    </SelectTrigger>
                    <SelectContent>
                      {ASSET_TYPES.map(({ value, label }) => (
                        <SelectItem key={value} value={value}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FieldGroup>

                <FieldGroup label="Divisa" required>
                  <Select
                    value={form.currency}
                    onValueChange={(v) => handleChange('currency', v)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar" />
                    </SelectTrigger>
                    <SelectContent>
                      {CURRENCIES.map(({ value, label }) => (
                        <SelectItem key={value} value={value}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FieldGroup>
              </div>
            </div>

            <Separator />

            {/* ── Sección: Posición ── */}
            <div className="space-y-4">
              <SectionTitle>Posición</SectionTitle>

              <FieldGroup label="Broker" required>
                <Select
                  value={form.broker}
                  onValueChange={(v) => handleChange('broker', v)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar broker" />
                  </SelectTrigger>
                  <SelectContent>
                    {BROKERS.map((broker) => (
                      <SelectItem key={broker} value={broker}>
                        {broker}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FieldGroup>

              <div className="grid grid-cols-2 gap-3">
                <FieldGroup
                  label="Cantidad"
                  required
                  hint="Nº de acciones / unidades"
                >
                  <Input
                    type="number"
                    placeholder="10"
                    min="0"
                    step="any"
                    value={form.quantity}
                    onChange={(e) => handleChange('quantity', e.target.value)}
                  />
                </FieldGroup>

                <FieldGroup
                  label="Precio de compra"
                  required
                  hint={`Por unidad en ${form.currency || '—'}`}
                >
                  <Input
                    type="number"
                    placeholder="98.50"
                    min="0"
                    step="any"
                    value={form.buyPrice}
                    onChange={(e) => handleChange('buyPrice', e.target.value)}
                  />
                </FieldGroup>
              </div>
            </div>

            <Separator />

            {/* ── Sección: Resumen ── */}
            <div className="space-y-3">
              <SectionTitle>Resumen</SectionTitle>
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">Coste total estimado</span>
                  <span className="font-semibold text-slate-900">
                    {costBasis !== null
                      ? formatCurrency(costBasis, form.currency)
                      : <span className="text-slate-300">—</span>}
                  </span>
                </div>
                {form.ticker && form.name && (
                  <p className="mt-2 text-[11px] text-slate-400">
                    {form.quantity || '—'} × {form.ticker} a{' '}
                    {form.buyPrice
                      ? formatCurrency(parseFloat(form.buyPrice), form.currency)
                      : '—'}
                  </p>
                )}
              </div>
            </div>

          </div>
        </div>

        <Separator />

        {/* Footer */}
        <SheetFooter className="flex-row gap-2 px-6 py-4">
          <Button
            variant="outline"
            className="flex-1"
            onClick={handleClose}
          >
            Cancelar
          </Button>
          <Button
            className="flex-1"
            disabled={!isFormComplete}
          >
            Añadir posición
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
