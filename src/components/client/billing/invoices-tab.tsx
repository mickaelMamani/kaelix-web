import Link from "next/link"
import { FileText, Download, CreditCard } from "lucide-react"
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
import type { Invoice } from "@/types"

const dateFormatter = new Intl.DateTimeFormat("fr-FR", {
  day: "numeric",
  month: "long",
  year: "numeric",
})

function formatEur(amountInCents: number): string {
  return (amountInCents / 100).toLocaleString("fr-FR", {
    style: "currency",
    currency: "EUR",
  })
}

interface InvoicesTabProps {
  invoices: Invoice[]
}

export function InvoicesTab({ invoices }: InvoicesTabProps) {
  if (invoices.length === 0) {
    return (
      <EmptyState
        icon={<FileText className="h-8 w-8 text-muted-foreground" />}
        title="Aucune facture"
        description="Vous n'avez pas encore de facture. Les factures appara\u00eetront ici une fois qu'elles auront \u00e9t\u00e9 \u00e9mises."
      />
    )
  }

  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Num\u00e9ro</TableHead>
            <TableHead>Projet</TableHead>
            <TableHead>Montant</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead>\u00c9ch\u00e9ance</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice.id}>
              <TableCell className="font-medium">
                <Link
                  href={`/billing/${invoice.id}`}
                  className="hover:underline"
                >
                  #{invoice.id.slice(0, 8)}
                </Link>
              </TableCell>
              <TableCell>
                {invoice.project_id ? (
                  <Link
                    href={`/projects/${invoice.project_id}`}
                    className="text-muted-foreground hover:underline"
                  >
                    Projet #{invoice.project_id.slice(0, 8)}
                  </Link>
                ) : (
                  <span className="text-muted-foreground">&mdash;</span>
                )}
              </TableCell>
              <TableCell className="font-medium">
                {formatEur(invoice.amount)}
              </TableCell>
              <TableCell>
                <StatusBadge type="invoice" status={invoice.status} />
              </TableCell>
              <TableCell>
                {invoice.due_date
                  ? dateFormatter.format(new Date(invoice.due_date))
                  : "\u2014"}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    render={<Link href={`/billing/${invoice.id}`} />}
                  >
                    Voir
                  </Button>
                  {invoice.pdf_url && (
                    <Button
                      variant="ghost"
                      size="sm"
                      render={
                        <a
                          href={invoice.pdf_url}
                          target="_blank"
                          rel="noopener noreferrer"
                        />
                      }
                    >
                      <Download className="mr-1 h-3 w-3" />
                      PDF
                    </Button>
                  )}
                  {invoice.status === "open" && (
                    <Button
                      size="sm"
                      render={<Link href={`/billing/${invoice.id}/pay`} />}
                    >
                      <CreditCard className="mr-1 h-3 w-3" />
                      Payer
                    </Button>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
