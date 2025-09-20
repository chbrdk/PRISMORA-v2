import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Icon } from "@/components/ui/icon"
import { Button } from "@/components/ui/button"

const paginationVariants = cva(
  "flex items-center justify-center",
  {
    variants: {
      variant: {
        default: "",
        prismora: "",
        minimal: "",
        compact: "",
      },
      size: {
        sm: "space-x-1",
        default: "space-x-2",
        lg: "space-x-3",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const pageButtonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "border border-input bg-background hover:bg-accent hover:text-accent-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground",
        prismora: "border border-input bg-background hover:bg-prismora-50 hover:text-prismora-600 data-[state=active]:bg-prismora-500 data-[state=active]:text-white",
        minimal: "border-0 bg-transparent hover:bg-accent hover:text-accent-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground",
        compact: "border border-input bg-background hover:bg-accent hover:text-accent-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground",
      },
      size: {
        sm: "h-8 w-8 text-xs",
        default: "h-10 w-10",
        lg: "h-12 w-12 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface PaginationProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof paginationVariants> {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  showFirstLast?: boolean
  showPrevNext?: boolean
  maxVisiblePages?: number
  showPageInfo?: boolean
  pageInfoFormat?: string
  disabled?: boolean
}

const Pagination = React.forwardRef<HTMLDivElement, PaginationProps>(
  ({ 
    className, 
    variant, 
    size, 
    currentPage, 
    totalPages, 
    onPageChange, 
    showFirstLast = true,
    showPrevNext = true,
    maxVisiblePages = 5,
    showPageInfo = false,
    pageInfoFormat = "Seite {current} von {total}",
    disabled = false,
    ...props 
  }, ref) => {
    const [expanded, setExpanded] = React.useState(false)
    
    // Calculate visible page range
    const getVisiblePages = () => {
      if (totalPages <= maxVisiblePages) {
        return Array.from({ length: totalPages }, (_, i) => i + 1)
      }
      
      const halfVisible = Math.floor(maxVisiblePages / 2)
      let start = Math.max(1, currentPage - halfVisible)
      let end = Math.min(totalPages, start + maxVisiblePages - 1)
      
      if (end - start + 1 < maxVisiblePages) {
        start = Math.max(1, end - maxVisiblePages + 1)
      }
      
      return Array.from({ length: end - start + 1 }, (_, i) => start + i)
    }
    
    const visiblePages = getVisiblePages()
    const hasEllipsisStart = visiblePages[0] > 1
    const hasEllipsisEnd = visiblePages[visiblePages.length - 1] < totalPages
    
    const handlePageChange = (page: number) => {
      if (!disabled && page >= 1 && page <= totalPages && page !== currentPage) {
        onPageChange(page)
      }
    }
    
    const renderPageInfo = () => {
      if (!showPageInfo) return null
      
      const info = pageInfoFormat
        .replace('{current}', currentPage.toString())
        .replace('{total}', totalPages.toString())
      
      return (
        <span className="text-sm text-muted-foreground mx-4">
          {info}
        </span>
      )
    }
    
    return (
      <div
        ref={ref}
        className={cn(paginationVariants({ variant, size }), className)}
        {...props}
      >
        {showPageInfo && renderPageInfo()}
        
        <div className="flex items-center space-x-1">
          {/* First Page */}
          {showFirstLast && (
            <Button
              variant="outline"
              size={size === "sm" ? "sm" : size === "lg" ? "lg" : "default"}
              onClick={() => handlePageChange(1)}
              disabled={disabled || currentPage === 1}
              className="hidden sm:inline-flex"
            >
              Erste
            </Button>
          )}
          
          {/* Previous Page */}
          {showPrevNext && (
            <Button
              variant="outline"
              size={size === "sm" ? "sm" : size === "lg" ? "lg" : "default"}
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={disabled || currentPage === 1}
            >
                              <Icon name="ChevronLeft" size="sm" />
              <span className="sr-only">Vorherige Seite</span>
            </Button>
          )}
          
          {/* Page Numbers */}
          <div className="flex items-center space-x-1">
            {/* Ellipsis Start */}
            {hasEllipsisStart && (
              <Button
                variant="outline"
                size={size}
                onClick={() => handlePageChange(Math.max(1, visiblePages[0] - maxVisiblePages))}
                disabled={disabled}
                className="hidden sm:inline-flex"
              >
                <Icon name="MoreHorizontal" size="sm" />
              </Button>
            )}
            
            {/* Page Numbers */}
            {visiblePages.map((page) => (
              <Button
                key={page}
                variant={page === currentPage ? "default" : "outline"}
                size={size}
                onClick={() => handlePageChange(page)}
                disabled={disabled}
                data-state={page === currentPage ? "active" : "inactive"}
                className={cn(
                  pageButtonVariants({ variant, size }),
                  page === currentPage && "font-semibold"
                )}
              >
                {page}
              </Button>
            ))}
            
            {/* Ellipsis End */}
            {hasEllipsisEnd && (
              <Button
                variant="outline"
                size={size}
                onClick={() => handlePageChange(Math.min(totalPages, visiblePages[visiblePages.length - 1] + maxVisiblePages))}
                disabled={disabled}
                className="hidden sm:inline-flex"
              >
                <Icon name="MoreHorizontal" size="sm" />
              </Button>
            )}
          </div>
          
          {/* Next Page */}
          {showPrevNext && (
            <Button
              variant="outline"
              size={size === "sm" ? "sm" : size === "lg" ? "lg" : "default"}
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={disabled || currentPage === totalPages}
            >
              <Icon name="ChevronRight" size="sm" />
              <span className="sr-only">Nächste Seite</span>
            </Button>
          )}
          
          {/* Last Page */}
          {showFirstLast && (
            <Button
              variant="outline"
              size={size === "sm" ? "sm" : size === "lg" ? "lg" : "default"}
              onClick={() => handlePageChange(totalPages)}
              disabled={disabled || currentPage === totalPages}
              className="hidden sm:inline-flex"
            >
              Letzte
            </Button>
          )}
        </div>
      </div>
    )
  }
)
Pagination.displayName = "Pagination"

// Compact Pagination Component
interface CompactPaginationProps
  extends Omit<PaginationProps, 'showFirstLast' | 'showPrevNext' | 'maxVisiblePages'> {
  showPageInfo?: boolean
}

const CompactPagination = React.forwardRef<HTMLDivElement, CompactPaginationProps>(
  ({ showPageInfo = true, ...props }, ref) => {
    return (
      <Pagination
        ref={ref}
        variant="compact"
        size="sm"
        showFirstLast={false}
        showPrevNext={true}
        maxVisiblePages={3}
        showPageInfo={showPageInfo}
        {...props}
      />
    )
  }
)
CompactPagination.displayName = "CompactPagination"

export { Pagination, CompactPagination, paginationVariants, pageButtonVariants }
