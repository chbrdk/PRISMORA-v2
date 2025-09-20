import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Icon } from "@/components/ui/icon"

const zoomSliderVariants = cva(
  "relative flex w-full touch-none select-none items-center",
  {
    variants: {
      variant: {
        default: "",
        prismora: "",
        compact: "h-8",
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

const zoomSliderTrackVariants = cva(
  "relative grow overflow-hidden rounded-full bg-secondary",
  {
    variants: {
      variant: {
        default: "bg-secondary",
        prismora: "bg-prismora-100",
        compact: "h-1.5",
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

const zoomSliderRangeVariants = cva(
  "absolute h-full bg-primary transition-colors",
  {
    variants: {
      variant: {
        default: "bg-primary",
        prismora: "bg-prismora-500",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const zoomSliderThumbVariants = cva(
  "block h-4 w-4 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "border-primary",
        prismora: "border-prismora-500",
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

export interface ZoomSliderProps
  extends Omit<React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>, 'defaultValue' | 'value' | 'onValueChange'>,
    VariantProps<typeof zoomSliderVariants> {
  label?: string
  helperText?: string
  error?: string
  success?: string
  showValue?: boolean
  min?: number
  max?: number
  defaultValue?: number
  value?: number
  onValueChange?: (value: number) => void
  disabled?: boolean
  showZoomButtons?: boolean
  zoomStep?: number
  logarithmic?: boolean
  showMarks?: boolean
  marks?: number[]
  formatValue?: (value: number) => string
}

const ZoomSlider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  ZoomSliderProps
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
    min = 0.1,
    max = 10,
    defaultValue = 1,
    value,
    onValueChange,
    disabled = false,
    showZoomButtons = false,
    zoomStep = 0.1,
    logarithmic = true,
    showMarks = false,
    marks = [],
    formatValue,
    ...props
  }, ref) => {
    const [internalValue, setInternalValue] = React.useState<number[]>(value ? [value] : [defaultValue])
    const sliderVariant = error ? "default" : success ? "default" : variant

    const formatZoomValue = (val: number) => {
      if (formatValue) return formatValue(val)
      return `${(val * 100).toFixed(0)}%`
    }

    const handleValueChange = (newValue: number[]) => {
      setInternalValue(newValue)
      if (onValueChange) {
        onValueChange(newValue[0])
      }
    }

    const handleZoomIn = () => {
      const newValue = Math.min(max, internalValue[0] + zoomStep)
      handleValueChange([newValue])
    }

    const handleZoomOut = () => {
      const newValue = Math.max(min, internalValue[0] - zoomStep)
      handleValueChange([newValue])
    }

    const handleReset = () => {
      handleValueChange([1])
    }

    // Generate marks for zoom levels
    const zoomMarks = marks.length > 0 ? marks : showMarks ? 
      [0.1, 0.25, 0.5, 1, 2, 5, 10] : []

    return (
      <div className="w-full space-y-2">
        {(label || showValue) && (
          <div className="flex items-center justify-between">
            {label && (
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                {label}
              </label>
            )}
            {showValue && (
              <span className="text-sm text-muted-foreground">
                {formatZoomValue(internalValue[0])}
              </span>
            )}
          </div>
        )}
        
        <div className="relative">
          <SliderPrimitive.Root
            ref={ref}
            className={cn(
              zoomSliderVariants({ variant: sliderVariant, size }),
              className
            )}
            min={min}
            max={max}
            step={logarithmic ? 0.01 : zoomStep}
            disabled={disabled}
            value={value ? [value] : internalValue}
            onValueChange={handleValueChange}
            {...props}
          >
            <SliderPrimitive.Track
              className={cn(
                zoomSliderTrackVariants({ variant: sliderVariant, size })
              )}
            >
                          <SliderPrimitive.Range
              className={cn(
                zoomSliderRangeVariants({ variant: sliderVariant === 'compact' ? 'default' : sliderVariant })
              )}
            />
            </SliderPrimitive.Track>
            
            <SliderPrimitive.Thumb
              className={cn(
                zoomSliderThumbVariants({ variant: sliderVariant, size })
              )}
            />
          </SliderPrimitive.Root>

          {/* Zoom Marks */}
          {showMarks && zoomMarks.length > 0 && (
            <div className="absolute inset-0 pointer-events-none flex justify-between">
              {zoomMarks.map((mark) => (
                <div
                  key={mark}
                  className="text-xs text-muted-foreground transform -translate-y-1"
                  style={{
                    left: `${((mark - min) / (max - min)) * 100}%`
                  }}
                >
                  {formatZoomValue(mark)}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Zoom Controls */}
        {showZoomButtons && (
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <button
                onClick={handleZoomOut}
                disabled={disabled || internalValue[0] <= min}
                className="p-1 rounded-md hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed"
                title="Zoom Out"
              >
                <Icon name="MinusIcon" size="sm" />
              </button>
              <button
                onClick={handleReset}
                disabled={disabled}
                className="px-2 py-1 text-xs rounded-md hover:bg-accent"
                title="Reset Zoom"
              >
                Reset
              </button>
              <button
                onClick={handleZoomIn}
                disabled={disabled || internalValue[0] >= max}
                className="p-1 rounded-md hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed"
                title="Zoom In"
              >
                <Icon name="PlusIcon" size="sm" />
              </button>
            </div>
            
            <div className="flex items-center space-x-1">
                              <Icon name="MinusIcon" size="xs" className="text-muted-foreground" />
              <span className="text-xs text-muted-foreground">
                {formatZoomValue(internalValue[0])}
              </span>
                              <Icon name="PlusIcon" size="xs" className="text-muted-foreground" />
            </div>
          </div>
        )}

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
ZoomSlider.displayName = SliderPrimitive.Root.displayName

export { ZoomSlider, zoomSliderVariants, zoomSliderTrackVariants, zoomSliderRangeVariants, zoomSliderThumbVariants }
