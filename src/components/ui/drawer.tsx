import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Icon } from "@/components/ui/icon"
import { Button } from "@/components/ui/button"

const drawerVariants = cva(
  "fixed inset-0 z-50 flex",
  {
    variants: {
      variant: {
        default: "",
        left: "items-start justify-start",
        right: "items-start justify-end",
        top: "items-start justify-center",
        bottom: "items-end justify-center",
      },
      size: {
        sm: "",
        md: "",
        lg: "",
        xl: "",
        full: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
)

const drawerContentVariants = cva(
  "relative bg-background border shadow-lg",
  {
    variants: {
      variant: {
        default: "rounded-lg",
        left: "h-full rounded-r-lg",
        right: "h-full rounded-l-lg",
        top: "w-full rounded-b-lg",
        bottom: "w-full rounded-t-lg",
      },
      size: {
        sm: "max-w-sm",
        md: "max-w-md",
        lg: "max-w-lg",
        xl: "max-w-xl",
        full: "max-w-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
)

const drawerOverlayVariants = cva(
  "fixed inset-0 z-40 bg-background/80 backdrop-blur-sm",
  {
    variants: {
      variant: {
        default: "",
        left: "",
        right: "",
        top: "",
        bottom: "",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface DrawerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof drawerVariants> {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
}

const Drawer = React.forwardRef<HTMLDivElement, DrawerProps>(
  ({ className, variant, size, open = false, onOpenChange, children, ...props }, ref) => {
    const handleBackdropClick = (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) {
        onOpenChange?.(false)
      }
    }

    if (!open) return null

    return (
      <div
        ref={ref}
        className={cn(drawerVariants({ variant, size }), className)}
        {...props}
      >
        <div
          className={cn(drawerOverlayVariants({ variant }))}
          onClick={handleBackdropClick}
        />
        <div className={cn(drawerContentVariants({ variant, size }))}>
          {children}
        </div>
      </div>
    )
  }
)
Drawer.displayName = "Drawer"

// Drawer Header Component
interface DrawerHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  description?: string
  showCloseButton?: boolean
  onClose?: () => void
}

const DrawerHeader = React.forwardRef<HTMLDivElement, DrawerHeaderProps>(
  ({ className, title, description, showCloseButton = true, onClose, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex items-start justify-between p-6 pb-0", className)}
        {...props}
      >
        <div className="flex-1">
          {title && (
            <h2 className="text-lg font-semibold leading-none tracking-tight">
              {title}
            </h2>
          )}
          {description && (
            <p className="text-sm text-muted-foreground mt-1">
              {description}
            </p>
          )}
        </div>
        {showCloseButton && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0 ml-2"
          >
            <Icon name="X" size="sm" />
            <span className="sr-only">Schließen</span>
          </Button>
        )}
      </div>
    )
  }
)
DrawerHeader.displayName = "DrawerHeader"

// Drawer Content Component
const DrawerContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("p-6 pt-0", className)}
        {...props}
      />
    )
  }
)
DrawerContent.displayName = "DrawerContent"

// Drawer Footer Component
interface DrawerFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  align?: "left" | "center" | "right"
}

const DrawerFooter = React.forwardRef<HTMLDivElement, DrawerFooterProps>(
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
          "flex items-center gap-2 p-6 pt-0",
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
DrawerFooter.displayName = "DrawerFooter"

// Drawer Trigger Component
interface DrawerTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  asChild?: boolean
}

const DrawerTrigger = React.forwardRef<HTMLButtonElement, DrawerTriggerProps>(
  ({ className, asChild = false, ...props }, ref) => {
    const Comp = asChild ? React.Fragment : "button"
    return (
      <Comp
        ref={ref}
        className={cn(className)}
        {...props}
      />
    )
  }
)
DrawerTrigger.displayName = "DrawerTrigger"

// Side Drawer Component (Left/Right)
interface SideDrawerProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  side?: "left" | "right"
  size?: "sm" | "md" | "lg" | "xl" | "full"
  title?: string
  description?: string
  children: React.ReactNode
  onClose?: () => void
}

const SideDrawer = React.forwardRef<HTMLDivElement, SideDrawerProps>(
  ({ 
    open = false, 
    onOpenChange, 
    side = "right",
    size = "md",
    title,
    description,
    children,
    onClose,
    ...props 
  }, ref) => {
    const handleClose = () => {
      onClose?.()
      onOpenChange?.(false)
    }

    return (
      <Drawer 
        ref={ref} 
        open={open} 
        onOpenChange={onOpenChange} 
        variant={side}
        size={size}
        {...props}
      >
        <DrawerHeader
          title={title}
          description={description}
          onClose={handleClose}
        />
        <DrawerContent>
          {children}
        </DrawerContent>
      </Drawer>
    )
  }
)
SideDrawer.displayName = "SideDrawer"

// Bottom Drawer Component (Mobile)
interface BottomDrawerProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  size?: "sm" | "md" | "lg" | "xl" | "full"
  title?: string
  description?: string
  children: React.ReactNode
  onClose?: () => void
}

const BottomDrawer = React.forwardRef<HTMLDivElement, BottomDrawerProps>(
  ({ 
    open = false, 
    onOpenChange, 
    size = "md",
    title,
    description,
    children,
    onClose,
    ...props 
  }, ref) => {
    const handleClose = () => {
      onClose?.()
      onOpenChange?.(false)
    }

    return (
      <Drawer 
        ref={ref} 
        open={open} 
        onOpenChange={onOpenChange} 
        variant="bottom"
        size={size}
        {...props}
      >
        <DrawerHeader
          title={title}
          description={description}
          onClose={handleClose}
        />
        <DrawerContent>
          {children}
        </DrawerContent>
      </Drawer>
    )
  }
)
BottomDrawer.displayName = "BottomDrawer"

// Navigation Drawer Component
interface NavigationDrawerProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  side?: "left" | "right"
  size?: "sm" | "md" | "lg" | "xl" | "full"
  title?: string
  children: React.ReactNode
  onClose?: () => void
}

const NavigationDrawer = React.forwardRef<HTMLDivElement, NavigationDrawerProps>(
  ({ 
    open = false, 
    onOpenChange, 
    side = "left",
    size = "md",
    title = "Navigation",
    children,
    onClose,
    ...props 
  }, ref) => {
    const handleClose = () => {
      onClose?.()
      onOpenChange?.(false)
    }

    return (
      <Drawer 
        ref={ref} 
        open={open} 
        onOpenChange={onOpenChange} 
        variant={side}
        size={size}
        {...props}
      >
        <DrawerHeader
          title={title}
          onClose={handleClose}
        />
        <DrawerContent>
          <nav className="space-y-2">
            {children}
          </nav>
        </DrawerContent>
      </Drawer>
    )
  }
)
NavigationDrawer.displayName = "NavigationDrawer"

// Settings Drawer Component
interface SettingsDrawerProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  side?: "left" | "right"
  size?: "sm" | "md" | "lg" | "xl" | "full"
  title?: string
  children: React.ReactNode
  onClose?: () => void
}

const SettingsDrawer = React.forwardRef<HTMLDivElement, SettingsDrawerProps>(
  ({ 
    open = false, 
    onOpenChange, 
    side = "right",
    size = "md",
    title = "Einstellungen",
    children,
    onClose,
    ...props 
  }, ref) => {
    const handleClose = () => {
      onClose?.()
      onOpenChange?.(false)
    }

    return (
      <Drawer 
        ref={ref} 
        open={open} 
        onOpenChange={onOpenChange} 
        variant={side}
        size={size}
        {...props}
      >
        <DrawerHeader
          title={title}
          onClose={handleClose}
        />
        <DrawerContent>
          <div className="space-y-6">
            {children}
          </div>
        </DrawerContent>
      </Drawer>
    )
  }
)
SettingsDrawer.displayName = "SettingsDrawer"

export { 
  Drawer, 
  DrawerHeader, 
  DrawerContent, 
  DrawerFooter, 
  DrawerTrigger,
  SideDrawer,
  BottomDrawer,
  NavigationDrawer,
  SettingsDrawer,
  drawerVariants,
  drawerContentVariants,
  drawerOverlayVariants
}
