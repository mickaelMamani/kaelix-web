import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { StatusBadge } from "@/components/shared/status-badge"
import { EmptyState } from "@/components/shared/empty-state"
import { AlertTriangle, FileDown, Receipt } from "lucide-react"

const dateFormatter = new Intl.DateTimeFormat("fr-FR", {
  day: "numeric",
  month: "short",
  year: "numeric",
})

const currencyFormatter = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
})

interface InvoiceWithClient {
  id: string
  amount: number
  currency: string
  status: string
  due_date: string | null
  paid_at: string | null
  pdf_url: string | null
  created_at: string
  client_name: string | null
  client_company: string | null
}

function isOverdue(dueDate: string | null, status: string): boolean {
  if (!dueDate || status !== "open") return false
  return new Date(dueDate) < new Date()
}

export function InvoicesTable({ invoices }: { invoices: InvoiceWithClient[] }) {
  if (invoices.length === 0) {
    return (
      <EmptyState
        icon={<Receipt className="size-6 text-muted-foreground" />}
        title="Aucune facture"
        description="Il n'y a aucune facture correspondant aux critères."
      />
    )
  }

  return (
    <div className="rounded-lg border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Client</TableHead>
            <TableHead>Montant</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead>Échéance</TableHead>
            <TableHead>Payée le</TableHead>
            <TableHead className="text-right">PDF</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => {
            const overdue = isOverdue(invoice.due_date, invoice.status)
            return (
              <TableRow key={invoice.id}>
                <TableCell>
                  <div>
                    <p className="text-sm font-medium">
                      {invoice.client_name ?? "Client inconnu"}
                    </p>
                    {invoice.client_company && (
                      <p className="text-xs text-muted-foreground">
                        {invoice.client_company}
                      </p>
                    )}
                  </div>
                </TableCell>
                <TableCell className="font-medium">
                  {currencyFormatter.format(invoice.amount / 100)}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <StatusBadge type="invoice" status={invoice.status} />
                    {overdue && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-700">
                        <AlertTriangle className="size-3" />
                        En retard
                      </span>
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {invoice.due_date
                    ? dateFormatter.format(new Date(invoice.due_date))
                    : "\u2014"}
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {invoice.paid_at
                    ? dateFormatter.format(new Date(invoice.paid_at))
                    : "\u2014"}
                </TableCell>
                <TableCell className="text-right">
                  {invoice.pdf_url ? (
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      render={
                        <a
                          href={invoice.pdf_url}
                          target="_blank"
                          rel="noopener noreferrer"
                        />
                      }
                    >
                      <FileDown className="size-4" />
                    </Button>
                  ) : (
                    <span className="text-xs text-muted-foreground">{"\u2014"}</span>
                  )}
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}
