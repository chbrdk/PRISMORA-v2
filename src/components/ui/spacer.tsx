import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const spacerVariants = cva(
  "",
  {
    variants: {
      size: {
        none: "w-0 h-0",
        xs: "w-1 h-1",
        sm: "w-2 h-2",
        md: "w-4 h-4",
        lg: "w-6 h-6",
        xl: "w-8 h-8",
        "2xl": "w-12 h-12",
        "3xl": "w-16 h-16",
        "4xl": "w-20 h-20",
        "5xl": "w-24 h-24",
      },
      axis: {
        x: "h-full w-auto",
        y: "w-full h-auto",
        both: "w-full h-full",
      },
      responsive: {
        mobile: "w-2 h-2 sm:w-4 sm:h-4",
        tablet: "w-4 h-4 md:w-6 md:h-6",
        desktop: "w-6 h-6 lg:w-8 lg:h-8",
      },
    },
    defaultVariants: {
      size: "md",
      axis: "both",
    },
  }
)

export interface SpacerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof spacerVariants> {
  asChild?: boolean
  width?: string | number
  height?: string | number
}

const Spacer = React.forwardRef<HTMLDivElement, SpacerProps>(
  ({ className, size, axis, responsive, asChild = false, width, height, style, ...props }, ref) => {
    const Comp = asChild ? React.Fragment : "div"
    
    // Custom dimensions override variants
    const customStyle = {
      width: width ? (typeof width === 'number' ? `${width}px` : width) : undefined,
      height: height ? (typeof height === 'number' ? `${height}px` : height) : undefined,
      ...style,
    }
    
    return (
      <Comp
        className={cn(
          spacerVariants({ size, axis, responsive }),
          className
        )}
        style={customStyle}
        ref={ref}
        {...props}
      />
    )
  }
)
Spacer.displayName = "Spacer"

export { Spacer, spacerVariants }
