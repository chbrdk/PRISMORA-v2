import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const switchVariants = cva(
  "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input appearance-none",
  {
    variants: {
      variant: {
        default: "data-[state=checked]:bg-primary",
        error: "data-[state=checked]:bg-destructive focus-visible:ring-destructive",
        success: "data-[state=checked]:bg-green-500 focus-visible:ring-green-500",
        prismora: "data-[state=checked]:bg-prismora-500 focus-visible:ring-prismora-500",
        direction: "bg-gray-300 data-[state=checked]:bg-gray-300 data-[state=unchecked]:bg-gray-300 focus-visible:ring-gray-400", // Override both states
      },
      size: {
        sm: "h-4 w-7",
        default: "h-6 w-11",
        lg: "h-8 w-14",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const switchThumbVariants = cva(
  "pointer-events-none block rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0",
  {
    variants: {
      size: {
        sm: "h-3 w-3 data-[state=checked]:translate-x-3",
        default: "h-5 w-5 data-[state=checked]:translate-x-5",
        lg: "h-7 w-7 data-[state=checked]:translate-x-6",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

export interface SwitchProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof switchVariants> {
  error?: string
  success?: string
  label?: string
  helperText?: string
  leftLabel?: boolean
}

const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  ({ className, variant, size, error, success, label, helperText, leftLabel = false, onChange, checked, ...props }, ref) => {
    const switchVariant = error ? "error" : success ? "success" : variant

    // Provide a default onChange handler if none is provided
    const handleChange = onChange || (() => {
      // Default no-op handler to prevent React warnings
      console.warn('Switch used without onChange handler');
    });

    // Determine the current state
    const isChecked = checked || false;

    return (
      <div className="w-full space-y-2">
        <div className="flex items-center space-x-2">
          {leftLabel && label && (
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              {label}
            </label>
          )}
          <div className="relative">
            <input
              type="checkbox"
              className={cn(
                "peer sr-only", // Screen reader only, but still clickable
                className
              )}
              ref={ref}
              onChange={handleChange}
              checked={checked}
              {...props}
            />
            <div 
              className={cn(
                switchVariants({ variant: switchVariant, size }),
                "cursor-pointer"
              )}
              data-state={isChecked ? "checked" : "unchecked"}
              onClick={() => {
                if (handleChange) {
                  const syntheticEvent = {
                    target: { checked: !isChecked }
                  } as React.ChangeEvent<HTMLInputElement>;
                  handleChange(syntheticEvent);
                }
              }}
            />
            <div 
              className={cn(
                switchThumbVariants({ size }),
                "absolute left-0.5 top-0.5 pointer-events-none flex items-center justify-center"
              )}
              data-state={isChecked ? "checked" : "unchecked"}
            >
              {variant === 'direction' && (
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  className={cn(
                    "transition-transform duration-200",
                    isChecked ? "rotate-0" : "rotate-180"
                  )}
                >
                  <path
                    d="M9 18L15 12L9 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </div>
          </div>
          {!leftLabel && label && (
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
Switch.displayName = "Switch"

export { Switch, switchVariants, switchThumbVariants }
