import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const progressVariants = cva(
  "relative w-full overflow-hidden rounded-full bg-secondary",
  {
    variants: {
      variant: {
        default: "bg-secondary",
        prismora: "bg-prismora-100",
        success: "bg-green-100",
        warning: "bg-yellow-100",
        destructive: "bg-red-100",
      },
      size: {
        sm: "h-1",
        default: "h-2",
        lg: "h-3",
        xl: "h-4",
      },
      animated: {
        true: "animate-pulse",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      animated: false,
    },
  }
)

const progressBarVariants = cva(
  "h-full w-full flex-1 bg-primary transition-all",
  {
    variants: {
      variant: {
        default: "bg-primary",
        prismora: "bg-prismora-500",
        success: "bg-green-500",
        warning: "bg-yellow-500",
        destructive: "bg-red-500",
      },
      striped: {
        true: "bg-gradient-to-r from-transparent via-white/20 to-transparent bg-[length:20px_100%] animate-pulse",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      striped: false,
    },
  }
)

export interface ProgressProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof progressVariants> {
  value?: number
  max?: number
  showValue?: boolean
  showLabel?: boolean
  label?: string
  striped?: boolean
  indeterminate?: boolean
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ 
    className, 
    variant, 
    size, 
    animated, 
    value = 0, 
    max = 100, 
    showValue = false, 
    showLabel = false,
    label,
    striped = false,
    indeterminate = false,
    ...props 
  }, ref) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100)
    
    return (
      <div className="w-full">
        {(showLabel || label) && (
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">
              {label || "Fortschritt"}
            </span>
            {showValue && (
              <span className="text-sm text-muted-foreground">
                {Math.round(percentage)}%
              </span>
            )}
          </div>
        )}
        <div
          ref={ref}
          className={cn(progressVariants({ variant, size, animated }), className)}
          {...props}
        >
          <div
            className={cn(
              progressBarVariants({ variant, striped }),
              indeterminate && "animate-pulse bg-gradient-to-r from-transparent via-current to-transparent",
              !indeterminate && "transition-all duration-300 ease-in-out"
            )}
            style={!indeterminate ? { width: `${percentage}%` } : undefined}
          />
        </div>
      </div>
    )
  }
)
Progress.displayName = "Progress"

// Progress Circle Component
interface ProgressCircleProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof progressVariants> {
  value?: number
  max?: number
  size?: number
  strokeWidth?: number
  showValue?: boolean
  children?: React.ReactNode
}

const ProgressCircle = React.forwardRef<HTMLDivElement, ProgressCircleProps>(
  ({ 
    className, 
    variant = "default", 
    value = 0, 
    max = 100, 
    size = 120, 
    strokeWidth = 8, 
    showValue = false,
    children,
    ...props 
  }, ref) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100)
    const radius = (size - strokeWidth) / 2
    const circumference = radius * 2 * Math.PI
    const strokeDasharray = circumference
    const strokeDashoffset = circumference - (percentage / 100) * circumference
    
    const variantColors = {
      default: "stroke-primary",
      prismora: "stroke-prismora-500",
      success: "stroke-green-500",
      warning: "stroke-yellow-500",
      destructive: "stroke-red-500",
    }
    
    return (
      <div
        ref={ref}
        className={cn("relative inline-flex items-center justify-center", className)}
        style={{ width: size, height: size }}
        {...props}
      >
        <svg
          className="transform -rotate-90"
          width={size}
          height={size}
        >
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="transparent"
            className="text-muted"
          />
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className={cn("transition-all duration-300 ease-in-out", variantColors[variant])}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          {showValue ? (
            <span className="text-sm font-medium">
              {Math.round(percentage)}%
            </span>
          ) : (
            children
          )}
        </div>
      </div>
    )
  }
)
ProgressCircle.displayName = "ProgressCircle"

// Progress Steps Component
interface ProgressStep {
  id: string
  label: string
  status: "pending" | "active" | "completed" | "error"
  description?: string
}

interface ProgressStepsProps
  extends React.HTMLAttributes<HTMLDivElement> {
  steps: ProgressStep[]
  currentStep?: number
  orientation?: "horizontal" | "vertical"
  showLabels?: boolean
  showDescriptions?: boolean
}

const ProgressSteps = React.forwardRef<HTMLDivElement, ProgressStepsProps>(
  ({ 
    className, 
    steps, 
    currentStep = 0, 
    orientation = "horizontal",
    showLabels = true,
    showDescriptions = false,
    ...props 
  }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex",
          orientation === "horizontal" ? "flex-row" : "flex-col",
          className
        )}
        {...props}
      >
        {steps.map((step, index) => {
          const isActive = index === currentStep
          const isCompleted = index < currentStep
          const isPending = index > currentStep
          
          return (
            <div
              key={step.id}
              className={cn(
                "flex items-center",
                orientation === "horizontal" ? "flex-1" : "mb-4"
              )}
            >
              <div className="flex items-center">
                {/* Step indicator */}
                <div
                  className={cn(
                    "flex items-center justify-center rounded-full border-2 transition-colors",
                    "w-8 h-8 text-sm font-medium",
                    isCompleted && "bg-primary border-primary text-primary-foreground",
                    isActive && "bg-primary border-primary text-primary-foreground",
                    isPending && "bg-background border-muted text-muted-foreground"
                  )}
                >
                  {isCompleted ? (
                    "✓"
                  ) : (
                    index + 1
                  )}
                </div>
                
                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div
                    className={cn(
                      "flex-1 transition-colors",
                      orientation === "horizontal" ? "h-0.5 mx-2" : "w-0.5 mx-4 h-8",
                      isCompleted ? "bg-primary" : "bg-muted"
                    )}
                  />
                )}
              </div>
              
              {/* Step content */}
              {(showLabels || showDescriptions) && (
                <div className={cn(
                  "ml-3",
                  orientation === "horizontal" ? "text-center" : "text-left"
                )}>
                  {showLabels && (
                    <div className="text-sm font-medium text-foreground">
                      {step.label}
                    </div>
                  )}
                  {showDescriptions && step.description && (
                    <div className="text-xs text-muted-foreground mt-1">
                      {step.description}
                    </div>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>
    )
  }
)
ProgressSteps.displayName = "ProgressSteps"

export { Progress, ProgressCircle, ProgressSteps, progressVariants, progressBarVariants }
