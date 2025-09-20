import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const stackVariants = cva(
  "flex",
  {
    variants: {
      direction: {
        vertical: "flex-col",
        horizontal: "flex-row",
        verticalReverse: "flex-col-reverse",
        horizontalReverse: "flex-row-reverse",
      },
      align: {
        start: "items-start",
        center: "items-center",
        end: "items-end",
        stretch: "items-stretch",
        baseline: "items-baseline",
      },
      justify: {
        start: "justify-start",
        center: "justify-center",
        end: "justify-end",
        between: "justify-between",
        around: "justify-around",
        evenly: "justify-evenly",
      },
      gap: {
        none: "gap-0",
        xs: "gap-1",
        sm: "gap-2",
        md: "gap-4",
        lg: "gap-6",
        xl: "gap-8",
        "2xl": "gap-12",
      },
      wrap: {
        none: "flex-nowrap",
        wrap: "flex-wrap",
        wrapReverse: "flex-wrap-reverse",
      },
      spacing: {
        none: "space-y-0 space-x-0",
        xs: "space-y-1 space-x-1",
        sm: "space-y-2 space-x-2",
        md: "space-y-4 space-x-4",
        lg: "space-y-6 space-x-6",
        xl: "space-y-8 space-x-8",
        "2xl": "space-y-12 space-x-12",
      },
    },
    defaultVariants: {
      direction: "vertical",
      align: "start",
      justify: "start",
      gap: "md",
      wrap: "none",
    },
  }
)

export interface StackProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof stackVariants> {
  asChild?: boolean
  divider?: React.ReactNode
}

const Stack = React.forwardRef<HTMLDivElement, StackProps>(
  ({ className, direction, align, justify, gap, wrap, spacing, divider, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? React.Fragment : "div"
    
    // If using spacing instead of gap, apply appropriate spacing classes
    const spacingClass = spacing && spacing !== "none" ? 
      (direction === "vertical" || direction === "verticalReverse" ? 
        `space-y-${spacing === "xs" ? "1" : spacing === "sm" ? "2" : spacing === "md" ? "4" : spacing === "lg" ? "6" : spacing === "xl" ? "8" : "12"}` :
        `space-x-${spacing === "xs" ? "1" : spacing === "sm" ? "2" : spacing === "md" ? "4" : spacing === "lg" ? "6" : spacing === "xl" ? "8" : "12"}`
      ) : ""
    
    // If using gap, don't apply spacing
    const gapClass = spacing === "none" ? gap : "gap-0"
    
    return (
      <Comp
        className={cn(
          stackVariants({ direction, align, justify, gap: gapClass, wrap }),
          spacingClass,
          className
        )}
        ref={ref}
        {...props}
      >
        {divider && direction === "vertical" ? (
          React.Children.map(children, (child, index) => (
            <React.Fragment key={index}>
              {child}
              {index < React.Children.count(children) - 1 && (
                <div className="flex-shrink-0">{divider}</div>
              )}
            </React.Fragment>
          ))
        ) : divider && direction === "horizontal" ? (
          React.Children.map(children, (child, index) => (
            <React.Fragment key={index}>
              {child}
              {index < React.Children.count(children) - 1 && (
                <div className="flex-shrink-0">{divider}</div>
              )}
            </React.Fragment>
          ))
        ) : (
          children
        )}
      </Comp>
    )
  }
)
Stack.displayName = "Stack"

export { Stack, stackVariants }
