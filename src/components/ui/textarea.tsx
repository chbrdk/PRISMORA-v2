import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const textareaVariants = cva(
  "flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors resize-none",
  {
    variants: {
      variant: {
        default: "border-input",
        error: "border-destructive focus-visible:ring-destructive",
        success: "border-green-500 focus-visible:ring-green-500",
        prismora: "border-prismora-300 focus-visible:ring-prismora-500",
      },
      size: {
        sm: "min-h-[60px] px-2 py-1 text-xs",
        default: "min-h-[80px] px-3 py-2 text-sm",
        lg: "min-h-[120px] px-4 py-3 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface TextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'>,
    VariantProps<typeof textareaVariants> {
  error?: string
  success?: string
  label?: string
  helperText?: string
  characterCount?: boolean
  maxLength?: number
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, variant, size, error, success, label, helperText, characterCount, maxLength, ...props }, ref) => {
    const textareaVariant = error ? "error" : success ? "success" : variant
    const currentLength = props.value?.toString().length || 0

    return (
      <div className="w-full space-y-2">
        {label && (
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            {label}
          </label>
        )}
        <textarea
          className={cn(textareaVariants({ variant: textareaVariant, size }), className)}
          ref={ref}
          {...props}
        />
        <div className="flex justify-between items-center text-xs">
          <div>
            {error && <p className="text-destructive">{error}</p>}
            {success && <p className="text-green-600">{success}</p>}
            {helperText && !error && !success && <p className="text-muted-foreground">{helperText}</p>}
          </div>
          {characterCount && maxLength && (
            <span className="text-muted-foreground">
              {currentLength}/{maxLength}
            </span>
          )}
        </div>
      </div>
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea, textareaVariants }
