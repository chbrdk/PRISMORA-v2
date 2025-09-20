import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const tableVariants = cva(
  "w-full caption-bottom text-sm",
  {
    variants: {
      variant: {
        default: "",
        prismora: "",
        striped: "",
        bordered: "border border-border",
        compact: "",
      },
      size: {
        sm: "text-xs",
        default: "text-sm",
        lg: "text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const tableHeaderVariants = cva(
  "h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0",
  {
    variants: {
      variant: {
        default: "",
        prismora: "bg-prismora-50 text-prismora-700",
        striped: "",
        bordered: "border-b border-border",
        compact: "h-8 px-2",
      },
      size: {
        sm: "text-xs px-2",
        default: "text-sm px-4",
        lg: "text-base px-6",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const tableRowVariants = cva(
  "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
  {
    variants: {
      variant: {
        default: "",
        prismora: "hover:bg-prismora-50/50",
        striped: "even:bg-muted/50",
        bordered: "border-b border-border",
        compact: "border-b-0",
      },
      size: {
        sm: "h-8",
        default: "h-12",
        lg: "h-16",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const tableCellVariants = cva(
  "p-4 align-middle [&:has([role=checkbox])]:pr-0",
  {
    variants: {
      variant: {
        default: "",
        prismora: "",
        striped: "",
        bordered: "border-r border-border last:border-r-0",
        compact: "p-2",
      },
      size: {
        sm: "p-2 text-xs",
        default: "p-4 text-sm",
        lg: "p-6 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement> & VariantProps<typeof tableVariants>
>(({ className, variant, size, ...props }, ref) => (
  <div className="relative w-full overflow-auto">
    <table
      ref={ref}
      className={cn(tableVariants({ variant, size }), className)}
      {...props}
    />
  </div>
))
Table.displayName = "Table"

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn("[&_tr]:border-b", className)} {...props} />
))
TableHeader.displayName = "TableHeader"

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn("[&_tr:last-child]:border-0", className)}
    {...props}
  />
))
TableBody.displayName = "TableBody"

const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn(
      "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
      className
    )}
    {...props}
  />
))
TableFooter.displayName = "TableFooter"

const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement> & VariantProps<typeof tableRowVariants>
>(({ className, variant, size, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(tableRowVariants({ variant, size }), className)}
    {...props}
  />
))
TableRow.displayName = "TableRow"

const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement> & VariantProps<typeof tableHeaderVariants>
>(({ className, variant, size, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(tableHeaderVariants({ variant, size }), className)}
    {...props}
  />
))
TableHead.displayName = "TableHead"

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement> & VariantProps<typeof tableCellVariants>
>(({ className, variant, size, ...props }, ref) => (
  <td
    ref={ref}
    className={cn(tableCellVariants({ variant, size }), className)}
    {...props}
  />
))
TableCell.displayName = "TableCell"

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn("mt-4 text-sm text-muted-foreground", className)}
    {...props}
  />
))
TableCaption.displayName = "TableCaption"

// Enhanced Table Components
interface DataTableProps<T> {
  data: T[]
  columns: Array<{
    key: keyof T
    header: string
    render?: (value: T[keyof T], row: T) => React.ReactNode
    sortable?: boolean
    width?: string
  }>
  variant?: VariantProps<typeof tableVariants>["variant"]
  size?: VariantProps<typeof tableVariants>["size"]
  className?: string
  onRowClick?: (row: T) => void
  selectable?: boolean
  selectedRows?: T[]
  onSelectionChange?: (selected: T[]) => void
  emptyMessage?: string
  loading?: boolean
}

function DataTable<T extends Record<string, any>>({
  data,
  columns,
  variant = "default",
  size = "default",
  className,
  onRowClick,
  selectable = false,
  selectedRows = [],
  onSelectionChange,
  emptyMessage = "Keine Daten verfügbar",
  loading = false,
}: DataTableProps<T>) {
  const [sortConfig, setSortConfig] = React.useState<{
    key: keyof T | null
    direction: 'asc' | 'desc'
  }>({ key: null, direction: 'asc' })

  const handleSort = (key: keyof T) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }))
  }

  const sortedData = React.useMemo(() => {
    if (!sortConfig.key) return data

    return [...data].sort((a, b) => {
      const aVal = a[sortConfig.key!]
      const bVal = b[sortConfig.key!]
      
      if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1
      if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1
      return 0
    })
  }, [data, sortConfig])

  const handleRowSelection = (row: T) => {
    if (!onSelectionChange) return
    
    const isSelected = selectedRows.some(selectedRow => 
      JSON.stringify(selectedRow) === JSON.stringify(row)
    )
    
    if (isSelected) {
      onSelectionChange(selectedRows.filter(selectedRow => 
        JSON.stringify(selectedRow) !== JSON.stringify(row)
      ))
    } else {
      onSelectionChange([...selectedRows, row])
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-32">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <Table variant={variant} size={size} className={className}>
      <TableHeader>
        <TableRow variant={variant} size={size}>
          {selectable && (
            <TableHead variant={variant} size={size} className="w-12">
              <input
                type="checkbox"
                checked={selectedRows.length === data.length && data.length > 0}
                onChange={(e) => {
                  if (e.target.checked) {
                    onSelectionChange?.(data)
                  } else {
                    onSelectionChange?.([])
                  }
                }}
                className="rounded border-gray-300"
              />
            </TableHead>
          )}
          {columns.map((column) => (
            <TableHead
              key={String(column.key)}
              variant={variant}
              size={size}
              style={{ width: column.width }}
              className={cn(
                column.sortable && "cursor-pointer hover:bg-muted/50",
                column.sortable && sortConfig.key === column.key && "bg-muted"
              )}
              onClick={() => column.sortable && handleSort(column.key)}
            >
              <div className="flex items-center gap-2">
                {column.header}
                {column.sortable && sortConfig.key === column.key && (
                  <span className="text-xs">
                    {sortConfig.direction === 'asc' ? '↑' : '↓'}
                  </span>
                )}
              </div>
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {sortedData.length === 0 ? (
          <TableRow variant={variant} size={size}>
            <TableCell
              variant={variant}
              size={size}
              colSpan={columns.length + (selectable ? 1 : 0)}
              className="text-center py-8 text-muted-foreground"
            >
              {emptyMessage}
            </TableCell>
          </TableRow>
        ) : (
          sortedData.map((row, index) => {
            const isSelected = selectedRows.some(selectedRow => 
              JSON.stringify(selectedRow) === JSON.stringify(row)
            )
            
            return (
              <TableRow
                key={index}
                variant={variant}
                size={size}
                className={cn(
                  onRowClick && "cursor-pointer",
                  isSelected && "bg-muted"
                )}
                onClick={() => onRowClick?.(row)}
              >
                {selectable && (
                  <TableCell variant={variant} size={size} className="w-12">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => handleRowSelection(row)}
                      className="rounded border-gray-300"
                    />
                  </TableCell>
                )}
                {columns.map((column) => (
                  <TableCell key={String(column.key)} variant={variant} size={size}>
                    {column.render
                      ? column.render(row[column.key], row)
                      : String(row[column.key] ?? '')
                    }
                  </TableCell>
                ))}
              </TableRow>
            )
          })
        )}
      </TableBody>
    </Table>
  )
}

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
  DataTable,
  tableVariants,
  tableHeaderVariants,
  tableRowVariants,
  tableCellVariants,
}
