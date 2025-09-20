import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const tabsVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-transparent text-muted-foreground hover:text-foreground data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
        prismora: "bg-transparent text-muted-foreground hover:text-prismora-600 data-[state=active]:bg-prismora-50 data-[state=active]:text-prismora-600 data-[state=active]:shadow-sm",
        outline: "border border-input bg-transparent hover:bg-accent hover:text-accent-foreground data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
        filled: "bg-muted text-muted-foreground hover:bg-muted/80 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
      },
      size: {
        sm: "h-8 px-3 text-xs",
        default: "h-10 px-4",
        lg: "h-12 px-6 text-base",
      },
      orientation: {
        horizontal: "border-b-2 border-transparent data-[state=active]:border-primary",
        vertical: "border-l-2 border-transparent data-[state=active]:border-primary",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      orientation: "horizontal",
    },
  }
)

const Tabs = TabsPrimitive.Root

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> & VariantProps<typeof tabsVariants>
>(({ className, variant, size, orientation, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
      orientation === "vertical" && "flex-col h-auto w-40",
      className
    )}
    {...props}
  />
))
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> & VariantProps<typeof tabsVariants>
>(({ className, variant, size, orientation, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(tabsVariants({ variant, size, orientation }), className)}
    {...props}
  />
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    )}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

// Enhanced Tabs Component with Icons
interface TabsWithIconsProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root> {
  tabs: Array<{
    value: string
    label: string
    icon?: React.ComponentType<{ className?: string }>
    content: React.ReactNode
    disabled?: boolean
  }>
  variant?: VariantProps<typeof tabsVariants>["variant"]
  size?: VariantProps<typeof tabsVariants>["size"]
  orientation?: VariantProps<typeof tabsVariants>["orientation"]
  className?: string
}

const TabsWithIcons = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Root>,
  TabsWithIconsProps
>(({ tabs, variant = "default", size = "default", orientation = "horizontal", className, ...props }, ref) => {
  return (
    <Tabs ref={ref} className={cn("w-full", className)} {...props}>
      <TabsList variant={variant} size={size} orientation={orientation}>
        {tabs.map((tab) => {
          const IconComponent = tab.icon
          return (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              variant={variant}
              size={size}
              orientation={orientation}
              disabled={tab.disabled}
            >
              {IconComponent && <IconComponent className="mr-2 h-4 w-4" />}
              {tab.label}
            </TabsTrigger>
          )
        })}
      </TabsList>
      {tabs.map((tab) => (
        <TabsContent key={tab.value} value={tab.value}>
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  )
})
TabsWithIcons.displayName = "TabsWithIcons"

export { Tabs, TabsList, TabsTrigger, TabsContent, TabsWithIcons, tabsVariants }
