import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const radioVariants = cva(
  "peer h-4 w-4 shrink-0 rounded-full border border-primary ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
  {
    variants: {
      variant: {
        default: "border-primary",
        error: "border-destructive focus:ring-destructive",
        success: "border-green-500 focus:ring-green-500",
        prismora: "border-prismora-500 focus:ring-prismora-500",
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

export interface RadioOption {
  value: string
  label: string
  disabled?: boolean
}

export interface RadioProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'size'>,
    VariantProps<typeof radioVariants> {
  options: RadioOption[]
  name: string
  error?: string
  success?: string
  label?: string
  helperText?: string
  onChange?: (value: string) => void
  layout?: 'vertical' | 'horizontal'
}

const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  ({ className, variant, size, options, name, error, success, label, helperText, onChange, layout = 'vertical', ...props }, ref) => {
    const radioVariant = error ? "error" : success ? "success" : variant

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        <div className={cn(
          "space-y-2",
          layout === 'horizontal' && "flex flex-wrap gap-4"
        )}>
          {options.map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <div className="relative">
                <input
                  type="radio"
                  name={name}
                  value={option.value}
                  disabled={option.disabled}
                  className={cn(
                    radioVariants({ variant: radioVariant, size }),
                    "peer",
                    className
                  )}
                  ref={ref}
                  onChange={handleChange}
                  {...props}
                />
                <div className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-foreground opacity-0 peer-checked:opacity-100 peer-disabled:cursor-not-allowed" />
              </div>
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                {option.label}
              </label>
            </div>
          ))}
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
Radio.displayName = "Radio"

export { Radio, radioVariants }
