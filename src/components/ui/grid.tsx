import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const gridVariants = cva(
  "grid",
  {
    variants: {
      cols: {
        1: "grid-cols-1",
        2: "grid-cols-2",
        3: "grid-cols-3",
        4: "grid-cols-4",
        5: "grid-cols-5",
        6: "grid-cols-6",
        7: "grid-cols-7",
        8: "grid-cols-8",
        9: "grid-cols-9",
        10: "grid-cols-10",
        11: "grid-cols-11",
        12: "grid-cols-12",
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
      gapX: {
        none: "gap-x-0",
        xs: "gap-x-1",
        sm: "gap-x-2",
        md: "gap-x-4",
        lg: "gap-x-6",
        xl: "gap-x-8",
        "2xl": "gap-x-12",
      },
      gapY: {
        none: "gap-y-0",
        xs: "gap-y-1",
        sm: "gap-y-2",
        md: "gap-y-4",
        lg: "gap-y-6",
        xl: "gap-y-8",
        "2xl": "gap-y-12",
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
      responsive: {
        mobile: "grid-cols-1",
        tablet: "sm:grid-cols-2 md:grid-cols-3",
        desktop: "lg:grid-cols-4 xl:grid-cols-6",
        auto: "grid-cols-auto",
      },
    },
    defaultVariants: {
      cols: 1,
      gap: "md",
      align: "start",
      justify: "start",
    },
  }
)

export interface GridProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof gridVariants> {
  asChild?: boolean
}

const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  ({ className, cols, gap, gapX, gapY, align, justify, responsive, asChild = false, ...props }, ref) => {
    const Comp = asChild ? React.Fragment : "div"
    return (
      <Comp
        className={cn(gridVariants({ cols, gap, gapX, gapY, align, justify, responsive }), className)}
        ref={ref}
        {...props}
      />
    )
  }
)
Grid.displayName = "Grid"

// Grid Item Component
const gridItemVariants = cva(
  "",
  {
    variants: {
      span: {
        1: "col-span-1",
        2: "col-span-2",
        3: "col-span-3",
        4: "col-span-4",
        5: "col-span-5",
        6: "col-span-6",
        7: "col-span-7",
        8: "col-span-8",
        9: "col-span-9",
        10: "col-span-10",
        11: "col-span-11",
        12: "col-span-12",
        full: "col-span-full",
      },
      start: {
        1: "col-start-1",
        2: "col-start-2",
        3: "col-start-3",
        4: "col-start-4",
        5: "col-start-5",
        6: "col-start-6",
        7: "col-start-7",
        8: "col-start-8",
        9: "col-start-9",
        10: "col-start-10",
        11: "col-start-11",
        12: "col-start-12",
        auto: "col-start-auto",
      },
      align: {
        start: "self-start",
        center: "self-center",
        end: "self-end",
        stretch: "self-stretch",
        baseline: "self-baseline",
      },
    },
    defaultVariants: {
      span: 1,
      align: "stretch",
    },
  }
)

export interface GridItemProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof gridItemVariants> {
  asChild?: boolean
}

const GridItem = React.forwardRef<HTMLDivElement, GridItemProps>(
  ({ className, span, start, align, asChild = false, ...props }, ref) => {
    const Comp = asChild ? React.Fragment : "div"
    return (
      <Comp
        className={cn(gridItemVariants({ span, start, align }), className)}
        ref={ref}
        {...props}
      />
    )
  }
)
GridItem.displayName = "GridItem"

export { Grid, GridItem, gridVariants, gridItemVariants }
