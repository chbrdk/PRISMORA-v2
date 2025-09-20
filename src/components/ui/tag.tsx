import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Icon, iconNames } from "@/components/ui/icon"

const tagVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        prismora: "border-transparent bg-prismora-500 text-white hover:bg-prismora-600",
        success: "border-transparent bg-green-500 text-white hover:bg-green-600",
        warning: "border-transparent bg-yellow-500 text-white hover:bg-yellow-600",
        info: "border-transparent bg-blue-500 text-white hover:bg-blue-600",
        gray: "border-transparent bg-gray-500 text-white hover:bg-gray-600",
        purple: "border-transparent bg-purple-500 text-white hover:bg-purple-600",
        pink: "border-transparent bg-pink-500 text-white hover:bg-pink-600",
      },
      size: {
        sm: "px-2 py-0.5 text-xs",
        default: "px-2.5 py-0.5 text-xs",
        lg: "px-3 py-1 text-sm",
        xl: "px-4 py-1.5 text-base",
      },
      shape: {
        rounded: "rounded-md",
        pill: "rounded-full",
        square: "rounded-none",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      shape: "rounded",
    },
  }
)

const Tag = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof tagVariants>
>(({ className, variant, size, shape, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(tagVariants({ variant, size, shape }), className)}
    {...props}
  />
))
Tag.displayName = "Tag"

// Removable Tag Component
interface RemovableTagProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof tagVariants> {
  onRemove?: () => void
  removeIcon?: typeof iconNames[number]
  disabled?: boolean
}

const RemovableTag = React.forwardRef<HTMLDivElement, RemovableTagProps>(
  ({ 
    className, 
    variant, 
    size, 
    shape, 
    onRemove, 
    removeIcon: RemoveIcon = "X",
    disabled = false,
    children,
    ...props 
  }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          tagVariants({ variant, size, shape }),
          "group",
          className
        )}
        {...props}
      >
        <span className="mr-1">{children}</span>
        {onRemove && !disabled && (
          <button
            onClick={onRemove}
            className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
            disabled={disabled}
          >
            <Icon name={RemoveIcon} size="xs" />
            <span className="sr-only">Remove tag</span>
          </button>
        )}
      </div>
    )
  }
)
RemovableTag.displayName = "RemovableTag"

// Add Tag Component
interface AddTagProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof tagVariants> {
  onAdd?: () => void
  addIcon?: typeof iconNames[number]
  label?: string
}

const AddTag = React.forwardRef<HTMLButtonElement, AddTagProps>(
  ({ 
    className, 
    variant, 
    size, 
    shape, 
    onAdd, 
    addIcon: AddIcon = "Plus",
    label = "Add tag",
    ...props 
  }, ref) => {
    return (
      <button
        ref={ref}
        onClick={onAdd}
        className={cn(
          tagVariants({ variant, size, shape }),
          "cursor-pointer border-dashed hover:bg-muted/50",
          className
        )}
        {...props}
      >
                    <Icon name={AddIcon} size="xs" className="mr-1" />
        {label}
      </button>
    )
  }
)
AddTag.displayName = "AddTag"

// Tag Group Component
interface TagGroupProps
  extends React.HTMLAttributes<HTMLDivElement> {
  tags: Array<{
    id: string
    label: string
    variant?: VariantProps<typeof tagVariants>["variant"]
    size?: VariantProps<typeof tagVariants>["size"]
    shape?: VariantProps<typeof tagVariants>["shape"]
  }>
  onRemove?: (id: string) => void
  onAdd?: () => void
  maxTags?: number
  gap?: 'sm' | 'default' | 'lg'
  wrap?: boolean
}

const TagGroup = React.forwardRef<HTMLDivElement, TagGroupProps>(
  ({ 
    tags, 
    onRemove, 
    onAdd, 
    maxTags = Infinity,
    gap = "default",
    wrap = true,
    className,
    ...props 
  }, ref) => {
    const gapClasses = {
      sm: "gap-1",
      default: "gap-2",
      lg: "gap-3",
    }

    const visibleTags = tags.slice(0, maxTags)
    const hiddenCount = tags.length - maxTags

    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center",
          gapClasses[gap],
          wrap && "flex-wrap",
          className
        )}
        {...props}
      >
        {visibleTags.map((tag) => (
          <RemovableTag
            key={tag.id}
            variant={tag.variant}
            size={tag.size}
            shape={tag.shape}
            onRemove={onRemove ? () => onRemove(tag.id) : undefined}
          >
            {tag.label}
          </RemovableTag>
        ))}
        {hiddenCount > 0 && (
          <Tag variant="secondary" size="sm">
            +{hiddenCount} more
          </Tag>
        )}
        {onAdd && tags.length < maxTags && (
          <AddTag
            variant="outline"
            size="sm"
            onAdd={onAdd}
            label="Add"
          />
        )}
      </div>
    )
  }
)
TagGroup.displayName = "TagGroup"

// Status Tag Component
interface StatusTagProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof tagVariants> {
  status: 'active' | 'inactive' | 'pending' | 'completed' | 'error' | 'warning'
  showDot?: boolean
}

const StatusTag = React.forwardRef<HTMLDivElement, StatusTagProps>(
  ({ 
    className, 
    status, 
    showDot = true,
    size = "default",
    shape = "rounded",
    children,
    ...props 
  }, ref) => {
    const getStatusVariant = (status: string): VariantProps<typeof tagVariants>["variant"] => {
      switch (status) {
        case 'active': return 'success'
        case 'inactive': return 'gray'
        case 'pending': return 'warning'
        case 'completed': return 'success'
        case 'error': return 'destructive'
        case 'warning': return 'warning'
        default: return 'default'
      }
    }

    const getStatusColor = (status: string) => {
      switch (status) {
        case 'active': return 'bg-green-500'
        case 'inactive': return 'bg-gray-400'
        case 'pending': return 'bg-yellow-500'
        case 'completed': return 'bg-green-500'
        case 'error': return 'bg-red-500'
        case 'warning': return 'bg-yellow-500'
        default: return 'bg-gray-400'
      }
    }

    return (
      <div
        ref={ref}
        className={cn(
          tagVariants({ 
            variant: getStatusVariant(status), 
            size, 
            shape 
          }),
          "inline-flex items-center",
          className
        )}
        {...props}
      >
        {showDot && (
          <span
            className={cn(
              "mr-1.5 h-1.5 w-1.5 rounded-full",
              getStatusColor(status)
            )}
          />
        )}
        {children}
      </div>
    )
  }
)
StatusTag.displayName = "StatusTag"

export {
  Tag,
  RemovableTag,
  AddTag,
  TagGroup,
  StatusTag,
  tagVariants,
}
