import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        success: "border-transparent bg-green-500 text-white hover:bg-green-600",
        warning: "border-transparent bg-yellow-500 text-white hover:bg-yellow-600",
        info: "border-transparent bg-blue-500 text-white hover:bg-blue-600",
        prismora: "border-transparent bg-prismora-500 text-white hover:bg-prismora-600",
        // Status variants
        online: "border-transparent bg-green-500 text-white",
        offline: "border-transparent bg-gray-500 text-white",
        busy: "border-transparent bg-red-500 text-white",
        away: "border-transparent bg-yellow-500 text-white",
        // Priority variants
        low: "border-transparent bg-gray-500 text-white",
        medium: "border-transparent bg-yellow-500 text-white",
        high: "border-transparent bg-red-500 text-white",
        critical: "border-transparent bg-red-600 text-white",
      },
      size: {
        sm: "px-2 py-0.5 text-xs",
        default: "px-2.5 py-0.5 text-xs",
        lg: "px-3 py-1 text-sm",
        xl: "px-4 py-1.5 text-base",
      },
      shape: {
        rounded: "rounded-full",
        square: "rounded",
        pill: "rounded-full px-4",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      shape: "rounded",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  asChild?: boolean
  dot?: boolean
  dotColor?: string
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant, size, shape, asChild = false, dot, dotColor, children, ...props }, ref) => {
    const Comp = asChild ? React.Fragment : "div"
    
    return (
      <Comp
        className={cn(badgeVariants({ variant, size, shape }), className)}
        ref={ref}
        {...props}
      >
        {dot && (
          <div 
            className={cn(
              "mr-1.5 h-1.5 w-1.5 rounded-full",
              dotColor || "bg-current"
            )} 
          />
        )}
        {children}
      </Comp>
    )
  }
)
Badge.displayName = "Badge"

// Badge with Icon Component
interface BadgeWithIconProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  icon?: React.ComponentType<{ className?: string }>
  iconPosition?: "left" | "right"
  asChild?: boolean
}

const BadgeWithIcon = React.forwardRef<HTMLDivElement, BadgeWithIconProps>(
  ({ className, variant, size, shape, asChild = false, icon: Icon, iconPosition = "left", children, ...props }, ref) => {
    const Comp = asChild ? React.Fragment : "div"
    
    return (
      <Comp
        className={cn(badgeVariants({ variant, size, shape }), className)}
        ref={ref}
        {...props}
      >
        {Icon && iconPosition === "left" && (
          <Icon className="mr-1 h-3 w-3" />
        )}
        {children}
        {Icon && iconPosition === "right" && (
          <Icon className="ml-1 h-3 w-3" />
        )}
      </Comp>
    )
  }
)
BadgeWithIcon.displayName = "BadgeWithIcon"

// Badge Group Component
interface BadgeGroupProps
  extends React.HTMLAttributes<HTMLDivElement> {
  gap?: "none" | "xs" | "sm" | "md" | "lg"
  wrap?: boolean
}

const BadgeGroup = React.forwardRef<HTMLDivElement, BadgeGroupProps>(
  ({ className, gap = "sm", wrap = true, children, ...props }, ref) => {
    const gapClasses = {
      none: "gap-0",
      xs: "gap-1",
      sm: "gap-2",
      md: "gap-3",
      lg: "gap-4",
    }
    
    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex items-center",
          gapClasses[gap],
          wrap && "flex-wrap",
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)
BadgeGroup.displayName = "BadgeGroup"

export { Badge, BadgeWithIcon, BadgeGroup, badgeVariants }
