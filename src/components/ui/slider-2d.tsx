import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const slider2dVariants = cva(
  "relative w-full aspect-square bg-secondary rounded-lg border-2 border-dashed border-muted-foreground/20",
  {
    variants: {
      variant: {
        default: "bg-secondary",
        prismora: "bg-prismora-50",
      },
      size: {
        sm: "w-48 h-48",
        default: "w-64 h-64",
        lg: "w-80 h-80",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const slider2dThumbVariants = cva(
  "absolute w-4 h-4 rounded-full border-2 border-primary bg-background shadow-lg cursor-grab active:cursor-grabbing transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-primary",
        prismora: "border-prismora-500",
      },
      size: {
        sm: "w-3 h-3",
        default: "w-4 h-4",
        lg: "w-5 h-5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface Slider2DProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'defaultValue'>,
    VariantProps<typeof slider2dVariants> {
  label?: string
  helperText?: string
  error?: string
  success?: string
  showValues?: boolean
  valueFormatter?: (value: { x: number; y: number }) => string
  min?: { x: number; y: number }
  max?: { x: number; y: number }
  step?: { x: number; y: number }
  defaultValue?: { x: number; y: number }
  value?: { x: number; y: number }
  onValueChange?: (value: { x: number; y: number }) => void
  disabled?: boolean
  showGrid?: boolean
  gridSize?: number
  showCenterCross?: boolean
}

const Slider2D = React.forwardRef<HTMLDivElement, Slider2DProps>(
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
    min = { x: 0, y: 0 },
    max = { x: 100, y: 100 },
    step = { x: 1, y: 1 },
    defaultValue = { x: 50, y: 50 },
    value,
    onValueChange,
    disabled = false,
    showGrid = false,
    gridSize = 20,
    showCenterCross = false,
    ...props
  }, ref) => {
    const [internalValue, setInternalValue] = React.useState<{ x: number; y: number }>(value || defaultValue)
    const [isDragging, setIsDragging] = React.useState(false)
    const containerRef = React.useRef<HTMLDivElement>(null)
    const sliderVariant = error ? "default" : success ? "default" : variant

    const formatValue = (val: { x: number; y: number }) => {
      if (valueFormatter) return valueFormatter(val)
      return `X: ${val.x}, Y: ${val.y}`
    }

    const updateValue = (newValue: { x: number; y: number }) => {
      setInternalValue(newValue)
      if (onValueChange) {
        onValueChange(newValue)
      }
    }

    const handleMouseDown = (e: React.MouseEvent) => {
      if (disabled) return
      setIsDragging(true)
      handleMouseMove(e)
    }

    const handleMouseMove = (e: React.MouseEvent | MouseEvent) => {
      if (!isDragging || disabled || !containerRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      // Convert to percentage
      const xPercent = Math.max(0, Math.min(100, (x / rect.width) * 100))
      const yPercent = Math.max(0, Math.min(100, (y / rect.height) * 100))

      // Convert to actual values
      const xValue = min.x + (xPercent / 100) * (max.x - min.x)
      const yValue = min.y + (yPercent / 100) * (max.y - min.y)

      // Apply step
      const steppedX = Math.round(xValue / step.x) * step.x
      const steppedY = Math.round(yValue / step.y) * step.y

      updateValue({ x: steppedX, y: steppedY })
    }

    const handleMouseUp = () => {
      setIsDragging(false)
    }

    React.useEffect(() => {
      if (isDragging) {
        document.addEventListener('mousemove', handleMouseMove)
        document.addEventListener('mouseup', handleMouseUp)
        return () => {
          document.removeEventListener('mousemove', handleMouseMove)
          document.removeEventListener('mouseup', handleMouseUp)
        }
      }
    }, [isDragging])

    // Convert value to percentage for positioning
    const xPercent = ((internalValue.x - min.x) / (max.x - min.x)) * 100
    const yPercent = ((internalValue.y - min.y) / (max.y - min.y)) * 100

    return (
      <div className="w-full space-y-2">
        {(label || showValues) && (
          <div className="flex items-center justify-between">
            {label && (
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                {label}
              </label>
            )}
            {showValues && (
              <span className="text-sm text-muted-foreground">
                {formatValue(internalValue)}
              </span>
            )}
          </div>
        )}
        
        <div
          ref={containerRef}
          className={cn(
            slider2dVariants({ variant: sliderVariant, size }),
            disabled && "opacity-50 cursor-not-allowed",
            className
          )}
          onMouseDown={handleMouseDown}
          {...props}
        >
          {/* Grid */}
          {showGrid && (
            <div className="absolute inset-0 pointer-events-none">
              {Array.from({ length: Math.floor(100 / gridSize) + 1 }, (_, i) => (
                <React.Fragment key={i}>
                  {/* Vertical lines */}
                  <div
                    className="absolute top-0 bottom-0 w-px bg-muted-foreground/20"
                    style={{ left: `${i * gridSize}%` }}
                  />
                  {/* Horizontal lines */}
                  <div
                    className="absolute left-0 right-0 h-px bg-muted-foreground/20"
                    style={{ top: `${i * gridSize}%` }}
                  />
                </React.Fragment>
              ))}
            </div>
          )}

          {/* Center cross */}
          {showCenterCross && (
            <>
              <div className="absolute top-1/2 left-0 right-0 h-px bg-muted-foreground/30 -translate-y-1/2" />
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-muted-foreground/30 -translate-x-1/2" />
            </>
          )}

          {/* Thumb */}
          <div
            className={cn(
              slider2dThumbVariants({ variant: sliderVariant, size }),
              isDragging && "scale-110"
            )}
            style={{
              left: `${xPercent}%`,
              top: `${yPercent}%`,
              transform: 'translate(-50%, -50%)',
            }}
          />

          {/* Value indicators */}
          <div className="absolute top-2 left-2 text-xs text-muted-foreground">
            X: {internalValue.x}
          </div>
          <div className="absolute top-2 right-2 text-xs text-muted-foreground">
            Y: {internalValue.y}
          </div>
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
Slider2D.displayName = "Slider2D"

export { Slider2D, slider2dVariants, slider2dThumbVariants }
