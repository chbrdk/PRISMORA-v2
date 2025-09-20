import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Icon } from "@/components/ui/icon"

const breadcrumbVariants = cva(
  "flex items-center space-x-1 text-sm text-muted-foreground",
  {
    variants: {
      variant: {
        default: "",
        prismora: "text-prismora-600",
        minimal: "text-xs",
        large: "text-base",
      },
      separator: {
        slash: "",
        chevron: "",
        arrow: "",
        dot: "",
      },
    },
    defaultVariants: {
      variant: "default",
      separator: "chevron",
    },
  }
)

export interface BreadcrumbItem {
  label: string
  href?: string
  icon?: React.ComponentType<{ className?: string }>
  disabled?: boolean
}

export interface BreadcrumbProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof breadcrumbVariants> {
  items: BreadcrumbItem[]
  maxItems?: number
  showHome?: boolean
  homeIcon?: React.ComponentType<{ className?: string }>
  separatorIcon?: React.ComponentType<{ className?: string }>
  onItemClick?: (item: BreadcrumbItem, index: number) => void
}

const Breadcrumb = React.forwardRef<HTMLElement, BreadcrumbProps>(
  ({ 
    className, 
    variant, 
    separator, 
    items, 
    maxItems = 5, 
    showHome = true, 
    homeIcon: HomeIcon = "HomeIcon",
    separatorIcon: SeparatorIcon = "ChevronRightIcon",
    onItemClick,
    ...props 
  }, ref) => {
    const [expanded, setExpanded] = React.useState(false)
    
    // Add home item if requested
    const allItems = showHome 
      ? [{ label: "Home", href: "/", icon: HomeIcon }, ...items]
      : items
    
    // Handle truncation
    const shouldTruncate = allItems.length > maxItems
    const visibleItems = expanded 
      ? allItems 
      : shouldTruncate 
        ? [...allItems.slice(0, 1), ...allItems.slice(-maxItems + 2)]
        : allItems
    
    const Separator = separator === "chevron" ? () => <Icon name="ChevronRightIcon" size="sm" /> : 
                     separator === "arrow" ? () => <Icon name="ChevronRightIcon" size="sm" /> :
                     separator === "slash" ? () => <span>/</span> :
                     () => <span>•</span>
    
    return (
      <nav
        ref={ref}
        aria-label="Breadcrumb"
        className={cn(breadcrumbVariants({ variant, separator }), className)}
        {...props}
      >
        <ol className="flex items-center space-x-1">
          {visibleItems.map((item, index) => {
            const isLast = index === visibleItems.length - 1
            const isFirst = index === 0
            const isTruncated = shouldTruncate && !expanded && index === 1
            
            if (isTruncated) {
              return (
                <li key="truncated" className="flex items-center">
                  <button
                    onClick={() => setExpanded(true)}
                    className="flex items-center justify-center w-6 h-6 rounded hover:bg-accent hover:text-accent-foreground"
                    aria-label="Show more breadcrumbs"
                  >
                    <Icon name="EllipsisHorizontalIcon" size="sm" />
                  </button>
                  <div className="mx-1">
                    <Separator />
                  </div>
                </li>
              )
            }
            
            const ItemIcon = item.icon
            
            return (
              <li key={item.label} className="flex items-center">
                <div className="flex items-center">
                  {ItemIcon && <ItemIcon className="mr-1 h-4 w-4" />}
                  {item.href && !isLast && !item.disabled ? (
                    <a
                      href={item.href}
                      onClick={(e) => {
                        if (onItemClick) {
                          e.preventDefault()
                          onItemClick(item, index)
                        }
                      }}
                      className="hover:text-foreground transition-colors"
                    >
                      {item.label}
                    </a>
                  ) : (
                    <span
                      className={cn(
                        isLast ? "text-foreground font-medium" : "",
                        item.disabled ? "opacity-50 cursor-not-allowed" : ""
                      )}
                    >
                      {item.label}
                    </span>
                  )}
                </div>
                {!isLast && (
                  <div className="mx-1">
                    <Separator />
                  </div>
                )}
              </li>
            )
          })}
        </ol>
      </nav>
    )
  }
)
Breadcrumb.displayName = "Breadcrumb"

// Breadcrumb Item Component
interface BreadcrumbItemProps {
  item: BreadcrumbItem
  isLast?: boolean
  isActive?: boolean
  onClick?: () => void
  className?: string
}

const BreadcrumbItem = React.forwardRef<HTMLLIElement, BreadcrumbItemProps>(
  ({ item, isLast = false, isActive = false, onClick, className, ...props }, ref) => {
    const ItemIcon = item.icon
    
    return (
      <li
        ref={ref}
        className={cn(
          "flex items-center",
          isActive && "text-foreground font-medium",
          className
        )}
        {...props}
      >
        {ItemIcon && <ItemIcon className="mr-1 h-4 w-4" />}
        {item.href && !isLast && !item.disabled ? (
          <a
            href={item.href}
            onClick={(e) => {
              if (onClick) {
                e.preventDefault()
                onClick()
              }
            }}
            className="hover:text-foreground transition-colors"
          >
            {item.label}
          </a>
        ) : (
          <span
            className={cn(
              isLast && "text-foreground font-medium",
              item.disabled && "opacity-50 cursor-not-allowed"
            )}
          >
            {item.label}
          </span>
        )}
      </li>
    )
  }
)
BreadcrumbItem.displayName = "BreadcrumbItem"

export { Breadcrumb, BreadcrumbItem, breadcrumbVariants }
