import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Icon } from "@/components/ui/icon"

const tooltipVariants = cva(
  "relative inline-block",
  {
    variants: {
      variant: {
        default: "",
        info: "",
        help: "",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const tooltipContentVariants = cva(
  "z-50 overflow-hidden rounded-md px-3 py-1.5 text-xs text-popover-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
  {
    variants: {
      variant: {
        default: "bg-popover border border-border shadow-md",
        info: "bg-blue-600 text-white shadow-lg",
        help: "bg-foreground text-background shadow-lg",
      },
      size: {
        sm: "text-xs px-2 py-1",
        md: "text-sm px-3 py-1.5",
        lg: "text-base px-4 py-2",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
)

const tooltipTriggerVariants = cva(
  "inline-flex items-center justify-center",
  {
    variants: {
      variant: {
        default: "",
        icon: "rounded-full p-1 hover:bg-accent",
        text: "underline decoration-dotted underline-offset-2",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface TooltipProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof tooltipVariants> {
  children: React.ReactNode
  content?: string
  side?: "top" | "right" | "bottom" | "left"
  align?: "start" | "center" | "end"
  sideOffset?: number
  alignOffset?: number
  delayDuration?: number
  skipDelayDuration?: number
}

const Tooltip = React.forwardRef<HTMLDivElement, TooltipProps>(
  ({ 
    className, 
    variant = "default",
    children, 
    content,
    side = "top",
    align = "center",
    sideOffset = 4,
    alignOffset = 0,
    delayDuration = 300,
    skipDelayDuration = 300,
    ...props 
  }, ref) => {
    const [isVisible, setIsVisible] = React.useState(false)
    const timeoutRef = React.useRef<NodeJS.Timeout | null>(null)

    const showTooltip = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      timeoutRef.current = setTimeout(() => {
        setIsVisible(true)
      }, delayDuration)
    }

    const hideTooltip = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      setIsVisible(false)
    }

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
        className={cn(tooltipVariants({ variant }), className)}
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        onFocus={showTooltip}
        onBlur={hideTooltip}
        {...props}
      >
        {children}
        {isVisible && content && (
          <div
            className={cn(
              tooltipContentVariants({ variant }),
              sideClasses[side],
              alignClasses[align],
              "absolute z-50 whitespace-nowrap"
            )}
            style={{
              marginTop: side === "bottom" ? sideOffset : undefined,
              marginBottom: side === "top" ? sideOffset : undefined,
              marginLeft: side === "right" ? sideOffset : undefined,
              marginRight: side === "left" ? sideOffset : undefined,
              transform: align === "center" ? "translateX(-50%)" : undefined,
            }}
          >
            {content}
          </div>
        )}
      </div>
    )
  }
)
Tooltip.displayName = "Tooltip"

// Tooltip Trigger Component
interface TooltipTriggerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  variant?: "default" | "icon" | "text"
  icon?: string
  iconSize?: "sm" | "md" | "lg"
  asChild?: boolean
}

const TooltipTrigger = React.forwardRef<HTMLDivElement, TooltipTriggerProps>(
  ({ className, variant = "default", icon, iconSize = "md", asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? React.Fragment : "div"
    
    if (icon && variant === "icon") {
      return (
        <div
          ref={ref}
          className={cn(tooltipTriggerVariants({ variant }), className)}
          {...props}
        >
          <Icon name={icon as any} size={iconSize} />
        </div>
      )
    }

    return (
      <Comp
        ref={ref}
        className={cn(tooltipTriggerVariants({ variant }), className)}
        {...props}
      >
        {children}
      </Comp>
    )
  }
)
TooltipTrigger.displayName = "TooltipTrigger"

// Tooltip Content Component
interface TooltipContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  variant?: "default" | "info" | "help"
  size?: "sm" | "md" | "lg"
  side?: "top" | "right" | "bottom" | "left"
  align?: "start" | "center" | "end"
  sideOffset?: number
  alignOffset?: number
}

const TooltipContent = React.forwardRef<HTMLDivElement, TooltipContentProps>(
  ({ 
    className, 
    variant = "default", 
    size = "md",
    side = "top",
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
          tooltipContentVariants({ variant, size }),
          sideClasses[side],
          alignClasses[align],
          "absolute z-50 whitespace-nowrap",
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
TooltipContent.displayName = "TooltipContent"

// Info Tooltip Component
interface InfoTooltipProps {
  trigger?: React.ReactNode
  content?: string
  variant?: "default" | "info" | "help"
  size?: "sm" | "md" | "lg"
  icon?: string
  iconSize?: "sm" | "md" | "lg"
}

const InfoTooltip = React.forwardRef<HTMLDivElement, InfoTooltipProps>(
  ({ 
    trigger, 
    content,
    variant = "info",
    size = "md",
    icon = "BoltIcon",
    iconSize = "sm",
    ...props 
  }, ref) => {
    return (
      <Tooltip ref={ref} variant={variant} content={content} {...props}>
        {trigger || (
          <TooltipTrigger variant="icon" icon={icon} iconSize={iconSize}>
            <Icon name={icon as any} size={iconSize} />
          </TooltipTrigger>
        )}
      </Tooltip>
    )
  }
)
InfoTooltip.displayName = "InfoTooltip"

// Help Tooltip Component
interface HelpTooltipProps {
  trigger?: React.ReactNode
  content?: string
  size?: "sm" | "md" | "lg"
  icon?: string
  iconSize?: "sm" | "md" | "lg"
}

const HelpTooltip = React.forwardRef<HTMLDivElement, HelpTooltipProps>(
  ({ 
    trigger, 
    content,
    size = "md",
    icon = "BoltIcon",
    iconSize = "sm",
    ...props 
  }, ref) => {
    return (
      <Tooltip ref={ref} variant="help" content={content} {...props}>
        {trigger || (
          <TooltipTrigger variant="icon" icon={icon} iconSize={iconSize}>
            <Icon name={icon as any} size={iconSize} />
          </TooltipTrigger>
        )}
      </Tooltip>
    )
  }
)
HelpTooltip.displayName = "HelpTooltip"

// Text Tooltip Component
interface TextTooltipProps {
  children: React.ReactNode
  content?: string
  variant?: "default" | "info" | "help"
  size?: "sm" | "md" | "lg"
  side?: "top" | "right" | "bottom" | "left"
  align?: "start" | "center" | "end"
}

const TextTooltip = React.forwardRef<HTMLDivElement, TextTooltipProps>(
  ({ 
    children, 
    content,
    variant = "default",
    size = "md",
    side = "top",
    align = "center",
    ...props 
  }, ref) => {
    return (
      <Tooltip 
        ref={ref} 
        variant={variant} 
        content={content}
        side={side}
        align={align}
        {...props}
      >
        <TooltipTrigger variant="text">
          {children}
        </TooltipTrigger>
      </Tooltip>
    )
  }
)
TextTooltip.displayName = "TextTooltip"

// Icon Tooltip Component
interface IconTooltipProps {
  icon?: string
  content?: string
  variant?: "default" | "info" | "help"
  size?: "sm" | "md" | "lg"
  iconSize?: "sm" | "md" | "lg"
  side?: "top" | "right" | "bottom" | "left"
  align?: "start" | "center" | "end"
}

const IconTooltip = React.forwardRef<HTMLDivElement, IconTooltipProps>(
  ({ 
    icon = "BoltIcon",
    content,
    variant = "default",
    size = "md",
    iconSize = "sm",
    side = "top",
    align = "center",
    ...props 
  }, ref) => {
    return (
      <Tooltip 
        ref={ref} 
        variant={variant} 
        content={content}
        side={side}
        align={align}
        {...props}
      >
        <TooltipTrigger variant="icon" icon={icon} iconSize={iconSize}>
          <Icon name={icon as any} size={iconSize} />
        </TooltipTrigger>
      </Tooltip>
    )
  }
)
IconTooltip.displayName = "IconTooltip"

export { 
  Tooltip, 
  TooltipTrigger, 
  TooltipContent,
  InfoTooltip,
  HelpTooltip,
  TextTooltip,
  IconTooltip,
  tooltipVariants,
  tooltipContentVariants,
  tooltipTriggerVariants
}
