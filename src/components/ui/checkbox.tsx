import * as React from "react"
import { Icon } from "@/components/ui/icon"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const checkboxVariants = cva(
  "peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
  {
    variants: {
      variant: {
        default: "border-primary",
        error: "border-destructive focus-visible:ring-destructive",
        success: "border-green-500 focus-visible:ring-green-500",
        prismora: "border-prismora-500 focus-visible:ring-prismora-500",
      },
      size: {
        sm: "h-3 w-3",
        default: "h-4 w-4",
        lg: "h-5 w-5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof checkboxVariants> {
  error?: string
  success?: string
  label?: string
  helperText?: string
  indeterminate?: boolean
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, variant, size, error, success, label, helperText, indeterminate, ...props }, ref) => {
    const checkboxVariant = error ? "error" : success ? "success" : variant

    return (
      <div className="w-full space-y-2">
        <div className="flex items-center space-x-2">
          <div className="relative">
            <input
              type="checkbox"
              className={cn(
                checkboxVariants({ variant: checkboxVariant, size }),
                "peer",
                className
              )}
              ref={ref}
              {...props}
            />
            <Icon name="CheckIcon" size="xs" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-primary-foreground opacity-0 peer-checked:opacity-100 peer-disabled:cursor-not-allowed" />
          </div>
          {label && (
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              {label}
            </label>
          )}
        </div>
        {(error || success || helperText) && (
          <div className="text-xs">
            {error && <p className="text-destructive">{error}</p>}
            {success && <p className="text-green-600">{success}</p>}
            {helperText && !error && !success && <p className="text-muted-foreground">{helperText}</p>}
          </div>
        )}
      </div>
    )
  }
)
Checkbox.displayName = "Checkbox"

export { Checkbox, checkboxVariants }
