import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const dividerVariants = cva(
  "border-t",
  {
    variants: {
      variant: {
        default: "border-border",
        muted: "border-muted",
        prismora: "border-prismora-200",
        dashed: "border-dashed border-border",
        dotted: "border-dotted border-border",
      },
      orientation: {
        horizontal: "border-t w-full",
        vertical: "border-l h-full",
      },
      size: {
        sm: "border-t border-l",
        md: "border-t-2 border-l-2",
        lg: "border-t-4 border-l-4",
      },
      spacing: {
        none: "my-0 mx-0",
        xs: "my-1 mx-1",
        sm: "my-2 mx-2",
        md: "my-4 mx-4",
        lg: "my-6 mx-6",
        xl: "my-8 mx-8",
      },
    },
    defaultVariants: {
      variant: "default",
      orientation: "horizontal",
      size: "sm",
      spacing: "md",
    },
  }
)

export interface DividerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dividerVariants> {
  asChild?: boolean
  label?: string
  labelPosition?: "start" | "center" | "end"
}

const Divider = React.forwardRef<HTMLDivElement, DividerProps>(
  ({ className, variant, orientation, size, spacing, asChild = false, label, labelPosition = "center", ...props }, ref) => {
    const Comp = asChild ? React.Fragment : "div"
    
    if (label) {
      return (
        <Comp
          className={cn("flex items-center", className)}
          ref={ref}
          {...props}
        >
          <div className={cn(
            "flex-grow",
            dividerVariants({ variant, orientation: "horizontal", size, spacing })
          )} />
          <span className={cn(
            "px-3 text-sm text-muted-foreground font-medium",
            labelPosition === "start" && "order-first",
            labelPosition === "center" && "order-none",
            labelPosition === "end" && "order-last"
          )}>
            {label}
          </span>
          <div className={cn(
            "flex-grow",
            dividerVariants({ variant, orientation: "horizontal", size, spacing })
          )} />
        </Comp>
      )
    }
    
    return (
      <Comp
        className={cn(dividerVariants({ variant, orientation, size, spacing }), className)}
        ref={ref}
        {...props}
      />
    )
  }
)
Divider.displayName = "Divider"

export { Divider, dividerVariants }
