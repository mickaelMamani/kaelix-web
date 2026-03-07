"use client"

import { Check, X } from "lucide-react"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface ComparisonRow {
  label: string
  kaelix: string
  wordpress: string
  kaelixPositive?: boolean
}

const comparisonData: ComparisonRow[] = [
  {
    label: "Ann\u00E9e 1",
    kaelix: "960 \u20AC",
    wordpress: "2 500 - 5 000 \u20AC",
    kaelixPositive: true,
  },
  {
    label: "Ann\u00E9e 2",
    kaelix: "960 \u20AC",
    wordpress: "800 - 1 500 \u20AC",
    kaelixPositive: true,
  },
  {
    label: "Ann\u00E9e 3",
    kaelix: "960 \u20AC",
    wordpress: "800 - 1 500 \u20AC",
    kaelixPositive: true,
  },
  {
    label: "Total 3 ans",
    kaelix: "2 880 \u20AC",
    wordpress: "4 100 - 8 000 \u20AC",
    kaelixPositive: true,
  },
  {
    label: "Performance",
    kaelix: "95+ PageSpeed",
    wordpress: "50-70 PageSpeed",
    kaelixPositive: true,
  },
  {
    label: "S\u00E9curit\u00E9",
    kaelix: "0 plugin vuln\u00E9rable",
    wordpress: "Mises \u00E0 jour constantes",
    kaelixPositive: true,
  },
  {
    label: "Propri\u00E9t\u00E9",
    kaelix: "100% votre code",
    wordpress: "D\u00E9pendant du CMS",
    kaelixPositive: true,
  },
]

export function CostComparator() {
  return (
    <div className="overflow-hidden rounded-xl ring-1 ring-foreground/10">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="w-[200px]" />
            <TableHead className="text-center font-heading text-base font-bold text-kaelix-blue">
              Kaelix 80&nbsp;&euro;/mois
            </TableHead>
            <TableHead className="text-center font-heading text-base font-bold text-muted-foreground">
              WordPress tout compris
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {comparisonData.map((row) => (
            <TableRow key={row.label}>
              <TableCell className="font-medium">{row.label}</TableCell>
              <TableCell className="text-center">
                <span className="inline-flex items-center gap-1.5">
                  <Check className="size-4 text-kaelix-green" />
                  <span className="font-medium text-foreground">
                    {row.kaelix}
                  </span>
                </span>
              </TableCell>
              <TableCell className="text-center">
                <span className="inline-flex items-center gap-1.5">
                  <X className="size-4 text-destructive" />
                  <span className="text-muted-foreground">{row.wordpress}</span>
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
