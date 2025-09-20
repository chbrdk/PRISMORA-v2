import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
  {
    variants: {
      variant: {
        default: "text-foreground",
        muted: "text-muted-foreground",
        prismora: "text-prismora-600",
        success: "text-green-600",
        warning: "text-yellow-600",
        destructive: "text-red-600",
        info: "text-blue-600",
      },
      size: {
        xs: "text-xs",
        sm: "text-sm",
        md: "text-base",
        lg: "text-lg",
        xl: "text-xl",
      },
      weight: {
        normal: "font-normal",
        medium: "font-medium",
        semibold: "font-semibold",
        bold: "font-bold",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "sm",
      weight: "medium",
    },
  }
)

export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement>,
    VariantProps<typeof labelVariants> {
  asChild?: boolean
}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, variant, size, weight, asChild = false, ...props }, ref) => {
    const Comp = asChild ? React.Fragment : "label"
    return (
      <Comp
        ref={ref}
        className={cn(labelVariants({ variant, size, weight }), className)}
        {...props}
      />
    )
  }
)
Label.displayName = "Label"

export { Label, labelVariants }
