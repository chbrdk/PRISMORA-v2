import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const sliderVariants = cva(
  "relative flex w-full touch-none select-none items-center",
  {
    variants: {
      variant: {
        default: "",
        prismora: "",
        vertical: "h-full w-6 flex-col",
      },
      size: {
        sm: "h-4",
        default: "h-6",
        lg: "h-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const sliderTrackVariants = cva(
  "relative grow overflow-hidden rounded-full bg-secondary",
  {
    variants: {
      variant: {
        default: "bg-secondary",
        prismora: "bg-prismora-100",
        vertical: "h-full w-2",
      },
      size: {
        sm: "h-1.5",
        default: "h-2",
        lg: "h-3",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const sliderRangeVariants = cva(
  "absolute h-full bg-primary transition-colors",
  {
    variants: {
      variant: {
        default: "bg-primary",
        prismora: "bg-prismora-500",
        vertical: "w-full",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const sliderThumbVariants = cva(
  "block h-4 w-4 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "border-primary",
        prismora: "border-prismora-500",
        vertical: "h-4 w-4",
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

export interface SliderProps
  extends Omit<React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>, 'defaultValue' | 'value' | 'onValueChange'>,
    VariantProps<typeof sliderVariants> {
  label?: string
  helperText?: string
  error?: string
  success?: string
  showValue?: boolean
  valueFormatter?: (value: number) => string
  step?: number
  min?: number
  max?: number
  orientation?: "horizontal" | "vertical"
  showMarks?: boolean
  marks?: number[]
  disabled?: boolean
  defaultValue?: number[]
  value?: number[]
  onValueChange?: (value: number[]) => void
}

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  SliderProps
>(
  ({
    className,
    variant,
    size,
    label,
    helperText,
    error,
    success,
    showValue = false,
    valueFormatter,
    step = 1,
    min = 0,
    max = 100,
    orientation = "horizontal",
    showMarks = false,
    marks = [],
    disabled = false,
    ...props
  }, ref) => {
    const [value, setValue] = React.useState<number[]>([min])
    const isVertical = orientation === "vertical"
    const sliderVariant = error ? "default" : success ? "default" : variant

    const formatValue = (val: number) => {
      if (valueFormatter) return valueFormatter(val)
      return val.toString()
    }

    const handleValueChange = (newValue: number[]) => {
      setValue(newValue)
      if (props.onValueChange) {
        props.onValueChange(newValue)
      }
    }

    // Generate marks if not provided
    const sliderMarks = marks.length > 0 ? marks : showMarks ? 
      Array.from({ length: Math.floor((max - min) / step) + 1 }, (_, i) => min + i * step) : []

    return (
      <div className={cn(
        "w-full space-y-2",
        isVertical && "h-full flex-col"
      )}>
        {(label || showValue) && (
          <div className={cn(
            "flex items-center justify-between",
            isVertical && "flex-col items-start space-y-2"
          )}>
            {label && (
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                {label}
              </label>
            )}
            {showValue && (
              <span className="text-sm text-muted-foreground">
                {formatValue(value[0])}
              </span>
            )}
          </div>
        )}
        
        <div className={cn(
          "relative",
          isVertical && "h-full flex-col"
        )}>
          <SliderPrimitive.Root
            ref={ref}
            className={cn(
              sliderVariants({ variant: sliderVariant, size }),
              isVertical && "h-full w-6 flex-col",
              className
            )}
            orientation={orientation}
            step={step}
            min={min}
            max={max}
            disabled={disabled}
            onValueChange={handleValueChange}
            {...props}
          >
            <SliderPrimitive.Track
              className={cn(
                sliderTrackVariants({ variant: sliderVariant, size }),
                isVertical && "h-full w-2"
              )}
            >
              <SliderPrimitive.Range
                className={cn(
                  sliderRangeVariants({ variant: sliderVariant }),
                  isVertical && "w-full"
                )}
              />
            </SliderPrimitive.Track>
            
            {value.map((_, index) => (
              <SliderPrimitive.Thumb
                key={index}
                className={cn(
                  sliderThumbVariants({ variant: sliderVariant, size }),
                  isVertical && "h-4 w-4"
                )}
              />
            ))}
          </SliderPrimitive.Root>

          {/* Marks */}
          {showMarks && sliderMarks.length > 0 && (
            <div className={cn(
              "absolute inset-0 pointer-events-none",
              isVertical ? "flex-col justify-between" : "flex justify-between"
            )}>
              {sliderMarks.map((mark) => (
                <div
                  key={mark}
                  className={cn(
                    "text-xs text-muted-foreground",
                    isVertical ? "transform -translate-x-1" : "transform -translate-y-1"
                  )}
                  style={{
                    [isVertical ? 'top' : 'left']: `${((mark - min) / (max - min)) * 100}%`
                  }}
                >
                  {mark}
                </div>
              ))}
            </div>
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
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider, sliderVariants, sliderTrackVariants, sliderRangeVariants, sliderThumbVariants }
