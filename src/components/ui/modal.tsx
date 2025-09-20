import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Icon } from "@/components/ui/icon"
import { Button } from "@/components/ui/button"

const modalVariants = cva(
  "fixed inset-0 z-50 flex items-center justify-center",
  {
    variants: {
      variant: {
        default: "",
        centered: "p-4",
        fullscreen: "p-0",
        bottom: "items-end justify-center",
        top: "items-start justify-center",
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

const modalContentVariants = cva(
  "relative bg-background border border-border shadow-lg",
  {
    variants: {
      variant: {
        default: "rounded-lg",
        centered: "rounded-lg max-w-md w-full",
        fullscreen: "w-full h-full rounded-none",
        bottom: "rounded-t-lg w-full max-w-md",
        top: "rounded-b-lg w-full max-w-md",
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

const modalOverlayVariants = cva(
  "fixed inset-0 z-40 bg-background/80 backdrop-blur-sm",
  {
    variants: {
      variant: {
        default: "",
        centered: "",
        fullscreen: "",
        bottom: "bg-background/60",
        top: "bg-background/60",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface ModalProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof modalVariants> {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
}

const Modal = React.forwardRef<HTMLDivElement, ModalProps>(
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
        className={cn(modalVariants({ variant, size }), className)}
        {...props}
      >
        <div
          className={cn(modalOverlayVariants({ variant }))}
          onClick={handleBackdropClick}
        />
        <div className={cn(modalContentVariants({ variant, size }))}>
          {children}
        </div>
      </div>
    )
  }
)
Modal.displayName = "Modal"

// Modal Header Component
interface ModalHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  description?: string
  showCloseButton?: boolean
  onClose?: () => void
}

const ModalHeader = React.forwardRef<HTMLDivElement, ModalHeaderProps>(
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
ModalHeader.displayName = "ModalHeader"

// Modal Content Component
const ModalContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
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
ModalContent.displayName = "ModalContent"

// Modal Footer Component
interface ModalFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  align?: "left" | "center" | "right"
}

const ModalFooter = React.forwardRef<HTMLDivElement, ModalFooterProps>(
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
ModalFooter.displayName = "ModalFooter"

// Modal Trigger Component
interface ModalTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  asChild?: boolean
}

const ModalTrigger = React.forwardRef<HTMLButtonElement, ModalTriggerProps>(
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
ModalTrigger.displayName = "ModalTrigger"

// Confirmation Modal Component
interface ConfirmationModalProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  title?: string
  description?: string
  confirmText?: string
  cancelText?: string
  variant?: "default" | "destructive" | "warning"
  onConfirm?: () => void
  onCancel?: () => void
  icon?: string
}

const ConfirmationModal = React.forwardRef<HTMLDivElement, ConfirmationModalProps>(
  ({ 
    open = false, 
    onOpenChange, 
    title = "Bestätigung", 
    description = "Sind Sie sicher, dass Sie fortfahren möchten?",
    confirmText = "Bestätigen",
    cancelText = "Abbrechen",
    variant = "default",
    onConfirm,
    onCancel,
    icon = "AlertCircle",
    ...props 
  }, ref) => {
    const handleConfirm = () => {
      onConfirm?.()
      onOpenChange?.(false)
    }

    const handleCancel = () => {
      onCancel?.()
      onOpenChange?.(false)
    }

    const iconColors = {
      default: "info",
      destructive: "destructive",
      warning: "warning",
    }

    return (
      <Modal ref={ref} open={open} onOpenChange={onOpenChange} {...props}>
        <ModalHeader
          title={title}
          description={description}
          onClose={handleCancel}
        />
        <ModalContent>
          <div className="flex items-center gap-3">
            <Icon 
              name={icon as any} 
              size="lg" 
              color={iconColors[variant]} 
            />
            <div className="flex-1">
              <p className="text-sm text-muted-foreground">
                {description}
              </p>
            </div>
          </div>
        </ModalContent>
        <ModalFooter>
          <Button variant="outline" onClick={handleCancel}>
            {cancelText}
          </Button>
          <Button 
            variant={variant === "destructive" ? "destructive" : "default"}
            onClick={handleConfirm}
          >
            {confirmText}
          </Button>
        </ModalFooter>
      </Modal>
    )
  }
)
ConfirmationModal.displayName = "ConfirmationModal"

// Alert Modal Component
interface AlertModalProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  title?: string
  description?: string
  variant?: "default" | "success" | "warning" | "destructive" | "info"
  icon?: string
  actions?: React.ReactNode
}

const AlertModal = React.forwardRef<HTMLDivElement, AlertModalProps>(
  ({ 
    open = false, 
    onOpenChange, 
    title = "Information", 
    description,
    variant = "default",
    icon,
    actions,
    ...props 
  }, ref) => {
    const defaultIcons = {
      default: "Info",
      success: "CheckCircle",
      warning: "AlertTriangle",
      destructive: "XCircle",
      info: "Info",
    }

    const iconColors = {
      default: "info",
      success: "success",
      warning: "warning",
      destructive: "destructive",
      info: "info",
    }

    const modalIcon = icon || defaultIcons[variant]

    return (
      <Modal ref={ref} open={open} onOpenChange={onOpenChange} {...props}>
        <ModalHeader
          title={title}
          onClose={() => onOpenChange?.(false)}
        />
        <ModalContent>
          <div className="flex items-start gap-3">
            <Icon 
              name={modalIcon as any} 
              size="lg" 
              color={iconColors[variant]} 
              className="mt-0.5"
            />
            <div className="flex-1">
              {description && (
                <p className="text-sm text-muted-foreground">
                  {description}
                </p>
              )}
            </div>
          </div>
        </ModalContent>
        {actions && (
          <ModalFooter>
            {actions}
          </ModalFooter>
        )}
      </Modal>
    )
  }
)
AlertModal.displayName = "AlertModal"

export { 
  Modal, 
  ModalHeader, 
  ModalContent, 
  ModalFooter, 
  ModalTrigger,
  ConfirmationModal,
  AlertModal,
  modalVariants,
  modalContentVariants,
  modalOverlayVariants
}
