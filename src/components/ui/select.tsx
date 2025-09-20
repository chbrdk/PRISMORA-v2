import * as React from "react"
import { Icon } from "@/components/ui/icon"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const selectVariants = cva(
  "flex w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors",
  {
    variants: {
      variant: {
        default: "border-input",
        error: "border-destructive focus:ring-destructive",
        success: "border-green-500 focus:ring-green-500",
        prismora: "border-prismora-300 focus:ring-prismora-500",
      },
      size: {
        sm: "h-8 px-2 text-xs",
        default: "h-10 px-3 text-sm",
        lg: "h-12 px-4 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

export interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'onChange' | 'size'>,
    VariantProps<typeof selectVariants> {
  options: SelectOption[]
  placeholder?: string
  error?: string
  success?: string
  label?: string
  helperText?: string
  leftIcon?: React.ReactNode
  onChange?: (value: string) => void
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, variant, size, options, placeholder, error, success, label, helperText, leftIcon, onChange, ...props }, ref) => {
    const selectVariant = error ? "error" : success ? "success" : variant

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      if (onChange) {
        onChange(e.target.value)
      }
    }

    return (
      <div className="w-full space-y-2">
        {label && (
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground z-10">
              {leftIcon}
            </div>
          )}
          <select
            className={cn(
              selectVariants({ variant: selectVariant, size }),
              leftIcon && "pl-10",
              "pr-10",
              className
            )}
            ref={ref}
            onChange={handleChange}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option
                key={option.value}
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </option>
            ))}
          </select>
          <Icon name="ChevronDown" size="sm" className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
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
Select.displayName = "Select"

export { Select, selectVariants }
