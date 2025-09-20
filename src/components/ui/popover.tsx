import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Icon } from "@/components/ui/icon"
import { Button } from "@/components/ui/button"

const popoverVariants = cva(
  "relative",
  {
    variants: {
      variant: {
        default: "",
        card: "",
        tooltip: "",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const popoverContentVariants = cva(
  "z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none",
  {
    variants: {
      variant: {
        default: "",
        card: "shadow-xl border-0",
        tooltip: "bg-foreground text-foreground shadow-lg",
      },
      size: {
        sm: "w-48",
        md: "w-72",
        lg: "w-96",
        xl: "w-[28rem]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
)

const popoverTriggerVariants = cva(
  "inline-flex items-center justify-center",
  {
    variants: {
      variant: {
        default: "",
        button: "rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background hover:bg-accent hover:text-accent-foreground",
        icon: "rounded-full p-2 hover:bg-accent",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface PopoverProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof popoverVariants> {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
}

const Popover = React.forwardRef<HTMLDivElement, PopoverProps>(
  ({ className, variant, open = false, onOpenChange, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(popoverVariants({ variant }), className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)
Popover.displayName = "Popover"

// Popover Trigger Component
interface PopoverTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  variant?: "default" | "button" | "icon"
  icon?: string
  iconSize?: "sm" | "md" | "lg"
  asChild?: boolean
}

const PopoverTrigger = React.forwardRef<HTMLButtonElement, PopoverTriggerProps>(
  ({ className, variant = "default", icon, iconSize = "md", asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? React.Fragment : "button"
    
    if (icon && variant === "icon") {
      return (
        <Button
          ref={ref}
          variant="ghost"
          size="sm"
          className={cn(popoverTriggerVariants({ variant }), className)}
          {...props}
        >
          <Icon name={icon as any} size={iconSize} />
          <span className="sr-only">Popover öffnen</span>
        </Button>
      )
    }

    return (
      <Comp
        ref={ref}
        className={cn(popoverTriggerVariants({ variant }), className)}
        {...props}
      >
        {children}
      </Comp>
    )
  }
)
PopoverTrigger.displayName = "PopoverTrigger"

// Popover Content Component
interface PopoverContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  variant?: "default" | "card" | "tooltip"
  size?: "sm" | "md" | "lg" | "xl"
  side?: "top" | "right" | "bottom" | "left"
  align?: "start" | "center" | "end"
  sideOffset?: number
  alignOffset?: number
}

const PopoverContent = React.forwardRef<HTMLDivElement, PopoverContentProps>(
  ({ 
    className, 
    variant = "default", 
    size = "md",
    side = "bottom",
    align = "center",
    sideOffset = 4,
    alignOffset = 0,
    children, 
    ...props 
  }, ref) => {
    const sideClasses = {
      top: "bottom-full mb-2",
      right: "left-full ml-2",
      bottom: "top-full mt-2",
      left: "right-full mr-2",
    }

    const alignClasses = {
      start: "",
      center: "left-1/2 transform -translate-x-1/2",
      end: "right-0",
    }

    return (
      <div
        ref={ref}
        className={cn(
          popoverContentVariants({ variant, size }),
          sideClasses[side],
          alignClasses[align],
          "absolute",
          className
        )}
        style={{
          marginTop: side === "bottom" ? sideOffset : undefined,
          marginBottom: side === "top" ? sideOffset : undefined,
          marginLeft: side === "right" ? sideOffset : undefined,
          marginRight: side === "left" ? sideOffset : undefined,
          transform: align === "center" ? "translateX(-50%)" : undefined,
        }}
        {...props}
      >
        {children}
      </div>
    )
  }
)
PopoverContent.displayName = "PopoverContent"

// Popover Header Component
interface PopoverHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  description?: string
  showCloseButton?: boolean
  onClose?: () => void
}

const PopoverHeader = React.forwardRef<HTMLDivElement, PopoverHeaderProps>(
  ({ className, title, description, showCloseButton = false, onClose, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex items-start justify-between pb-3", className)}
        {...props}
      >
        <div className="flex-1">
          {title && (
            <h3 className="text-sm font-semibold leading-none tracking-tight">
              {title}
            </h3>
          )}
          {description && (
            <p className="text-xs text-muted-foreground mt-1">
              {description}
            </p>
          )}
        </div>
        {showCloseButton && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-6 w-6 p-0 ml-2"
          >
            <Icon name="X" size="sm" />
            <span className="sr-only">Schließen</span>
          </Button>
        )}
      </div>
    )
  }
)
PopoverHeader.displayName = "PopoverHeader"

// Popover Body Component
const PopoverBody = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("", className)}
        {...props}
      />
    )
  }
)
PopoverBody.displayName = "PopoverBody"

// Popover Footer Component
interface PopoverFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  align?: "left" | "center" | "right"
}

const PopoverFooter = React.forwardRef<HTMLDivElement, PopoverFooterProps>(
  ({ className, children, align = "right", ...props }, ref) => {
    const alignClasses = {
      left: "justify-start",
      center: "justify-center",
      right: "justify-end",
    }

    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center gap-2 pt-3",
          alignClasses[align],
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)
PopoverFooter.displayName = "PopoverFooter"

// Info Popover Component
interface InfoPopoverProps {
  trigger?: React.ReactNode
  title?: string
  content?: string
  variant?: "default" | "card" | "tooltip"
  icon?: string
  actions?: React.ReactNode
}

const InfoPopover = React.forwardRef<HTMLDivElement, InfoPopoverProps>(
  ({ 
    trigger, 
    title = "Information", 
    content,
    variant = "default",
    icon = "Info",
    actions,
    ...props 
  }, ref) => {
    const [open, setOpen] = React.useState(false)

    return (
      <Popover ref={ref} open={open} onOpenChange={setOpen} {...props}>
        <PopoverTrigger asChild>
          {trigger || (
            <Button variant="ghost" size="sm">
              <Icon name={icon === "Info" ? "BoltIcon" : icon as any} size="sm" />
            </Button>
          )}
        </PopoverTrigger>
        <PopoverContent variant={variant}>
          <PopoverHeader title={title} />
          <PopoverBody>
            {content && (
              <p className="text-sm text-muted-foreground">
                {content}
              </p>
            )}
          </PopoverBody>
          {actions && (
            <PopoverFooter>
              {actions}
            </PopoverFooter>
          )}
        </PopoverContent>
      </Popover>
    )
  }
)
InfoPopover.displayName = "InfoPopover"

// Menu Popover Component
interface MenuPopoverProps {
  trigger?: React.ReactNode
  children: React.ReactNode
  variant?: "default" | "card"
  align?: "start" | "center" | "end"
}

const MenuPopover = React.forwardRef<HTMLDivElement, MenuPopoverProps>(
  ({ 
    trigger, 
    children,
    variant = "default",
    align = "start",
    ...props 
  }, ref) => {
    const [open, setOpen] = React.useState(false)

    return (
      <Popover ref={ref} open={open} onOpenChange={setOpen} {...props}>
        <PopoverTrigger asChild>
          {trigger || (
            <Button variant="outline" size="sm">
              <Icon name="EllipsisHorizontalIcon" size="sm" />
            </Button>
          )}
        </PopoverTrigger>
        <PopoverContent variant={variant} align={align}>
          {children}
        </PopoverContent>
      </Popover>
    )
  }
)
MenuPopover.displayName = "MenuPopover"

export { 
  Popover, 
  PopoverTrigger, 
  PopoverContent, 
  PopoverHeader, 
  PopoverBody, 
  PopoverFooter,
  InfoPopover,
  MenuPopover,
  popoverVariants,
  popoverContentVariants,
  popoverTriggerVariants
}
