import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const rangeSliderVariants = cva(
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

const rangeSliderTrackVariants = cva(
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

const rangeSliderRangeVariants = cva(
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

const rangeSliderThumbVariants = cva(
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

export interface RangeSliderProps
  extends Omit<React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>, 'defaultValue' | 'value' | 'onValueChange'>,
    VariantProps<typeof rangeSliderVariants> {
  label?: string
  helperText?: string
  error?: string
  success?: string
  showValues?: boolean
  valueFormatter?: (value: number) => string
  step?: number
  min?: number
  max?: number
  orientation?: "horizontal" | "vertical"
  showMarks?: boolean
  marks?: number[]
  disabled?: boolean
  defaultValue?: [number, number]
  value?: [number, number]
  onValueChange?: (value: [number, number]) => void
}

const RangeSlider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  RangeSliderProps
>(
  ({
    className,
    variant,
    size,
    label,
    helperText,
    error,
    success,
    showValues = false,
    valueFormatter,
    step = 1,
    min = 0,
    max = 100,
    orientation = "horizontal",
    showMarks = false,
    marks = [],
    disabled = false,
    defaultValue = [25, 75],
    value,
    onValueChange,
    ...props
  }, ref) => {
    const [internalValue, setInternalValue] = React.useState<number[]>(value || defaultValue)
    const isVertical = orientation === "vertical"
    const sliderVariant = error ? "default" : success ? "default" : variant

    const formatValue = (val: number) => {
      if (valueFormatter) return valueFormatter(val)
      return val.toString()
    }

    const handleValueChange = (newValue: number[]) => {
      setInternalValue(newValue)
      if (onValueChange && newValue.length === 2) {
        onValueChange([newValue[0], newValue[1]])
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
        {(label || showValues) && (
          <div className={cn(
            "flex items-center justify-between",
            isVertical && "flex-col items-start space-y-2"
          )}>
            {label && (
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                {label}
              </label>
            )}
            {showValues && (
              <div className="text-sm text-muted-foreground">
                {formatValue(internalValue[0])} - {formatValue(internalValue[1])}
              </div>
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
              rangeSliderVariants({ variant: sliderVariant, size }),
              isVertical && "h-full w-6 flex-col",
              className
            )}
            orientation={orientation}
            step={step}
            min={min}
            max={max}
            disabled={disabled}
            value={value || internalValue}
            onValueChange={handleValueChange}
            {...props}
          >
            <SliderPrimitive.Track
              className={cn(
                rangeSliderTrackVariants({ variant: sliderVariant, size }),
                isVertical && "h-full w-2"
              )}
            >
              <SliderPrimitive.Range
                className={cn(
                  rangeSliderRangeVariants({ variant: sliderVariant }),
                  isVertical && "w-full"
                )}
              />
            </SliderPrimitive.Track>
            
            <SliderPrimitive.Thumb
              className={cn(
                rangeSliderThumbVariants({ variant: sliderVariant, size }),
                isVertical && "h-4 w-4"
              )}
            />
            <SliderPrimitive.Thumb
              className={cn(
                rangeSliderThumbVariants({ variant: sliderVariant, size }),
                isVertical && "h-4 w-4"
              )}
            />
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
RangeSlider.displayName = SliderPrimitive.Root.displayName

export { RangeSlider, rangeSliderVariants, rangeSliderTrackVariants, rangeSliderRangeVariants, rangeSliderThumbVariants }
