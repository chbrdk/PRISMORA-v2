import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Icon } from "@/components/ui/icon"

const alertVariants = cva(
  "relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        destructive: "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
        success: "border-green-500/50 text-green-700 dark:text-green-400 [&>svg]:text-green-600 dark:[&>svg]:text-green-400",
        warning: "border-yellow-500/50 text-yellow-700 dark:text-yellow-400 [&>svg]:text-yellow-600 dark:[&>svg]:text-yellow-400",
        info: "border-blue-500/50 text-blue-700 dark:text-blue-400 [&>svg]:text-blue-600 dark:[&>svg]:text-blue-400",
        prismora: "border-prismora-500/50 text-prismora-700 dark:text-prismora-400 [&>svg]:text-prismora-600 dark:[&>svg]:text-prismora-400",
      },
      size: {
        sm: "p-3 text-sm",
        default: "p-4 text-base",
        lg: "p-6 text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, size, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn(alertVariants({ variant, size }), className)}
    {...props}
  />
))
Alert.displayName = "Alert"

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("mb-1 font-medium leading-none tracking-tight", className)}
    {...props}
  />
))
AlertTitle.displayName = "AlertTitle"

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm [&_p]:leading-relaxed", className)}
    {...props}
  />
))
AlertDescription.displayName = "AlertDescription"

// Icon mapping for different variants
const alertIcons: Record<string, string> = {
  default: "Info",
  destructive: "XCircle",
  success: "CheckCircle",
  warning: "AlertCircle",
  info: "Info",
  prismora: "Info",
}

// Alert with Icon Component
interface AlertWithIconProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  title?: string
  description?: string
  icon?: string
  dismissible?: boolean
  onDismiss?: () => void
}

const AlertWithIcon = React.forwardRef<HTMLDivElement, AlertWithIconProps>(
  ({ className, variant = "default", size, title, description, icon, dismissible, onDismiss, children, ...props }, ref) => {
    const iconName = icon || alertIcons[variant || "default"]
    
    return (
      <Alert ref={ref} variant={variant} size={size} className={cn("relative", className)} {...props}>
        <Icon name={iconName as any} size="sm" />
        {dismissible && (
          <button
            onClick={onDismiss}
            className="absolute right-2 top-2 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          >
            <Icon name="X" size="sm" />
            <span className="sr-only">Schließen</span>
          </button>
        )}
        {title && <AlertTitle>{title}</AlertTitle>}
        {description && <AlertDescription>{description}</AlertDescription>}
        {children}
      </Alert>
    )
  }
)
AlertWithIcon.displayName = "AlertWithIcon"

export { Alert, AlertTitle, AlertDescription, AlertWithIcon, alertVariants }
