import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const iconVariants = cva(
  "inline-block flex-shrink-0 leading-none align-middle",
  {
    variants: {
      size: {
        xs: "h-3 w-3",
        sm: "h-4 w-4",
        md: "h-5 w-5",
        lg: "h-6 w-6",
        xl: "h-8 w-8",
        "2xl": "h-10 w-10",
        "3xl": "h-12 w-12",
      },
      color: {
        default: "text-foreground",
        muted: "text-muted-foreground",
        primary: "text-primary",
        prismora: "text-primary",
        success: "text-green-600",
        warning: "text-yellow-600",
        destructive: "text-red-600",
        info: "text-blue-600",
      },
      weight: {
        thin: "stroke-[1]",
        light: "stroke-[1.5]",
        normal: "stroke-[2]",
        medium: "stroke-[2.5]",
        bold: "stroke-[3]",
      },
    },
    defaultVariants: {
      size: "md",
      color: "default",
      weight: "normal",
    },
  }
)

export interface IconProps
  extends Omit<React.SVGAttributes<SVGSVGElement>, 'color'>,
    VariantProps<typeof iconVariants> {
  name: string
  asChild?: boolean
}

// Simple SVG Icons as components
const ClockIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12,6 12,12 16,14" />
  </svg>
)

const ArrowPathIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
  </svg>
)

const EllipsisHorizontalIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <circle cx="12" cy="12" r="1" />
    <circle cx="19" cy="12" r="1" />
    <circle cx="5" cy="12" r="1" />
  </svg>
)

const BoltIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
  </svg>
)

const CogIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
)

const UserIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
  </svg>
)

const HomeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
  </svg>
)

const PlusIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
  </svg>
)

const MinusIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
  </svg>
)

const XMarkIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
)

const CheckIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
  </svg>
)

const MagnifyingGlassIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
  </svg>
)

const HeartIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
  </svg>
)

const StarIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.562.562 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
  </svg>
)

const EnvelopeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
  </svg>
)

const PhoneIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
  </svg>
)

const Bars3Icon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
  </svg>
)

const ArrowRightIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
  </svg>
)

const ArrowLeftIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
  </svg>
)

const ChevronDownIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
  </svg>
)

const ChevronUpIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
  </svg>
)

const ChevronRightIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
  </svg>
)

const ChevronLeftIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
  </svg>
)

// Added minimal icons used by PrismionToolbar
const BranchIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <circle cx="6" cy="6" r="2" />
    <circle cx="18" cy="6" r="2" />
    <circle cx="12" cy="18" r="2" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 6c0 4 8 4 8 8M12 18V10" />
  </svg>
)

const LockClosedIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <rect x="5" y="10" width="14" height="10" rx="2" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 10V8a4 4 0 118 0v2" />
  </svg>
)

const LockOpenIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <rect x="5" y="10" width="14" height="10" rx="2" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 10V8a4 4 0 117.5-1" />
  </svg>
)

const ArchiveBoxIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <rect x="3" y="7" width="18" height="14" rx="2" />
    <rect x="5" y="3" width="14" height="4" rx="1" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6" />
  </svg>
)

const TrashIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 7h12M9 7V5a2 2 0 012-2h2a2 2 0 012 2v2m-8 0l1 12a2 2 0 002 2h4a2 2 0 002-2l1-12" />
  </svg>
)

// Additional icons for Prismion kinds
const DocumentTextIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M7 3h7l5 5v13a1 1 0 01-1 1H7a1 1 0 01-1-1V4a1 1 0 011-1z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M14 3v6h6" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 13h8M8 17h5" />
  </svg>
)

const PhotoIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <circle cx="8" cy="10" r="2" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 16l-5-5-4 4-2-2-5 5" />
  </svg>
)

const PlayIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <polygon points="8,5 19,12 8,19" />
  </svg>
)

const LinkIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M10 13a5 5 0 007.07 0l2.12-2.12a5 5 0 10-7.07-7.07L10.5 5.43" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M14 11a5 5 0 01-7.07 0L4.81 8.88a5 5 0 017.07-7.07l1.41 1.41" />
  </svg>
)

// Icon mapping
const iconComponents: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  ClockIcon,
  ArrowPathIcon,
  EllipsisHorizontalIcon,
  BoltIcon,
  CogIcon,
  UserIcon,
  HomeIcon,
  PlusIcon,
  MinusIcon,
  XMarkIcon,
  CheckIcon,
  MagnifyingGlassIcon,
  HeartIcon,
  StarIcon,
  EnvelopeIcon,
  PhoneIcon,
  Bars3Icon,
  ArrowRightIcon,
  ArrowLeftIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
  DocumentTextIcon,
  PhotoIcon,
  PlayIcon,
  LinkIcon,
  BranchIcon,
  LockClosedIcon,
  LockOpenIcon,
  ArchiveBoxIcon,
  TrashIcon,
}

const Icon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ className, name, size, color, weight, asChild = false, ...props }, ref) => {
    const IconComponent = iconComponents[name]
    
    if (!IconComponent) {
      console.warn(`Icon "${name}" not found`)
      return null
    }

    const Comp = asChild ? React.Fragment : "svg"
    
    return (
      <Comp
        ref={ref}
        className={cn(iconVariants({ size, color, weight }), className)}
        style={{ 
          display: 'inline-block',
          verticalAlign: 'middle',
          ...props.style 
        }}
        {...props}
      >
        <IconComponent />
      </Comp>
    )
  }
)
Icon.displayName = "Icon"

// Icon Group Component
interface IconGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  spacing?: "none" | "xs" | "sm" | "md" | "lg" | "xl"
  direction?: "horizontal" | "vertical"
}

const IconGroup = React.forwardRef<HTMLDivElement, IconGroupProps>(
  ({ className, children, spacing = "md", direction = "horizontal", ...props }, ref) => {
    const spacingClasses = {
      none: "",
      xs: direction === "horizontal" ? "space-x-1" : "space-y-1",
      sm: direction === "horizontal" ? "space-x-2" : "space-y-2",
      md: direction === "horizontal" ? "space-x-3" : "space-y-3",
      lg: direction === "horizontal" ? "space-x-4" : "space-y-4",
      xl: direction === "horizontal" ? "space-x-6" : "space-y-6",
    }

    return (
      <div
        ref={ref}
        className={cn(
          "flex",
          direction === "vertical" && "flex-col",
          spacingClasses[spacing],
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)
IconGroup.displayName = "IconGroup"

// Icon with Label Component
interface IconWithLabelProps extends React.HTMLAttributes<HTMLDivElement> {
  icon: string
  label: string
  iconSize?: "xs" | "sm" | "md" | "lg" | "xl"
  labelSize?: "xs" | "sm" | "md" | "lg" | "xl"
  iconColor?: "default" | "muted" | "primary" | "prismora" | "success" | "warning" | "destructive" | "info"
  direction?: "horizontal" | "vertical"
}

const IconWithLabel = React.forwardRef<HTMLDivElement, IconWithLabelProps>(
  ({ 
    className, 
    icon, 
    label, 
    iconSize = "md",
    labelSize = "md",
    iconColor = "default",
    direction = "horizontal",
    ...props 
  }, ref) => {
    const labelSizeClasses = {
      xs: "text-xs",
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
      xl: "text-xl",
    }

    const spacingClasses = {
      none: "",
      xs: direction === "horizontal" ? "gap-1" : "gap-1",
      sm: direction === "horizontal" ? "gap-2" : "gap-2",
      md: direction === "horizontal" ? "gap-3" : "gap-3",
      lg: direction === "horizontal" ? "gap-4" : "gap-4",
      xl: direction === "horizontal" ? "gap-6" : "gap-6",
    }

    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center",
          direction === "vertical" && "flex-col",
          spacingClasses[labelSize],
          className
        )}
        {...props}
      >
        <Icon name={icon} size={iconSize} color={iconColor} />
        <span className={cn("font-medium", labelSizeClasses[labelSize])}>
          {label}
        </span>
      </div>
    )
  }
)
IconWithLabel.displayName = "IconWithLabel"

// Icon Button Component
interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: string
  size?: "xs" | "sm" | "md" | "lg" | "xl"
  variant?: "default" | "outline" | "ghost" | "destructive" | "prismora"
  iconColor?: "default" | "muted" | "primary" | "prismora" | "success" | "warning" | "destructive" | "info"
}

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ 
    className, 
    icon, 
    size = "md", 
    variant = "default",
    iconColor = "default",
    ...props 
  }, ref) => {
    const sizeClasses = {
      xs: "h-6 w-6 p-1",
      sm: "h-8 w-8 p-1.5",
      md: "h-10 w-10 p-2",
      lg: "h-12 w-12 p-2.5",
      xl: "h-14 w-14 p-3",
    }

    const variantClasses = {
      default: "bg-primary text-primary-foreground hover:bg-primary/90",
      outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
      ghost: "hover:bg-accent hover:text-accent-foreground",
      destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
      prismora: "bg-primary text-white hover:bg-primary/90",
    }

    const iconSizeMap: Record<string, "xs" | "sm" | "md" | "lg" | "xl"> = {
      xs: "xs",
      sm: "sm",
      md: "md",
      lg: "lg",
      xl: "xl",
    }

    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background",
          sizeClasses[size],
          variantClasses[variant],
          className
        )}
        {...props}
      >
        <Icon name={icon} size={iconSizeMap[size]} color={iconColor} />
      </button>
    )
  }
)
IconButton.displayName = "IconButton"

// Export all available icon names for type safety
export const iconNames = Object.keys(iconComponents) as Array<string>

export { Icon, IconGroup, IconWithLabel, IconButton, iconVariants }
