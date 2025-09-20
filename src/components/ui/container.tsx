import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const containerVariants = cva(
  "mx-auto w-full",
  {
    variants: {
      variant: {
        default: "px-4",
        fluid: "px-0",
        narrow: "px-4 max-w-4xl",
        wide: "px-4 max-w-7xl",
        full: "px-0 max-w-none",
      },
      size: {
        sm: "max-w-sm",
        md: "max-w-md",
        lg: "max-w-lg",
        xl: "max-w-xl",
        "2xl": "max-w-2xl",
        "3xl": "max-w-3xl",
        "4xl": "max-w-4xl",
        "5xl": "max-w-5xl",
        "6xl": "max-w-6xl",
        "7xl": "max-w-7xl",
      },
      padding: {
        none: "px-0",
        sm: "px-2",
        md: "px-4",
        lg: "px-6",
        xl: "px-8",
        "2xl": "px-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "7xl",
      padding: "md",
    },
  }
)

export interface ContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {
  asChild?: boolean
}

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, variant, size, padding, asChild = false, ...props }, ref) => {
    const Comp = asChild ? React.Fragment : "div"
    return (
      <Comp
        className={cn(containerVariants({ variant, size, padding }), className)}
        ref={ref}
        {...props}
      />
    )
  }
)
Container.displayName = "Container"

export { Container, containerVariants }
