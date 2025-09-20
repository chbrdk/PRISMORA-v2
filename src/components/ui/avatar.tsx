import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const avatarVariants = cva(
  "relative flex shrink-0 overflow-hidden rounded-full",
  {
    variants: {
      variant: {
        default: "",
        prismora: "ring-2 ring-prismora-200",
        outline: "ring-2 ring-border",
        solid: "",
      },
      size: {
        xs: "h-6 w-6",
        sm: "h-8 w-8",
        default: "h-10 w-10",
        lg: "h-12 w-12",
        xl: "h-16 w-16",
        "2xl": "h-20 w-20",
        "3xl": "h-24 w-24",
      },
      shape: {
        circle: "rounded-full",
        square: "rounded-md",
        rounded: "rounded-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      shape: "circle",
    },
  }
)

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root> & VariantProps<typeof avatarVariants>
>(({ className, variant, size, shape, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(avatarVariants({ variant, size, shape }), className)}
    {...props}
  />
))
Avatar.displayName = AvatarPrimitive.Root.displayName

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full", className)}
    {...props}
  />
))
AvatarImage.displayName = AvatarPrimitive.Image.displayName

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted",
      className
    )}
    {...props}
  />
))
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName

// Enhanced Avatar Components
interface AvatarWithFallbackProps
  extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>,
    VariantProps<typeof avatarVariants> {
  src?: string
  alt?: string
  fallback?: string
  fallbackIcon?: React.ComponentType<{ className?: string }>
  status?: 'online' | 'offline' | 'away' | 'busy'
  showStatus?: boolean
}

const AvatarWithFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  AvatarWithFallbackProps
>(({ 
  src, 
  alt, 
  fallback, 
  fallbackIcon: FallbackIcon,
  status,
  showStatus = false,
  variant = "default",
  size = "default",
  shape = "circle",
  className,
  ...props 
}, ref) => {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500'
      case 'offline': return 'bg-gray-400'
      case 'away': return 'bg-yellow-500'
      case 'busy': return 'bg-red-500'
      default: return 'bg-gray-400'
    }
  }

  return (
    <div className="relative inline-block">
      <Avatar
        ref={ref}
        variant={variant}
        size={size}
        shape={shape}
        className={className}
        {...props}
      >
        <AvatarImage src={src} alt={alt} />
        <AvatarFallback>
          {FallbackIcon ? (
            <FallbackIcon className="h-1/2 w-1/2" />
          ) : fallback ? (
            <span className="text-sm font-medium text-muted-foreground">
              {getInitials(fallback)}
            </span>
          ) : (
            <span className="text-sm font-medium text-muted-foreground">
              ?
            </span>
          )}
        </AvatarFallback>
      </Avatar>
      {showStatus && status && (
        <span
          className={cn(
            "absolute bottom-0 right-0 block h-3 w-3 rounded-full ring-2 ring-white",
            getStatusColor(status)
          )}
        />
      )}
    </div>
  )
})
AvatarWithFallback.displayName = "AvatarWithFallback"

// Avatar Group Component
interface AvatarGroupProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof avatarVariants> {
  avatars: Array<{
    src?: string
    alt?: string
    fallback?: string
    fallbackIcon?: React.ComponentType<{ className?: string }>
  }>
  max?: number
  spacing?: 'tight' | 'default' | 'loose'
  size?: VariantProps<typeof avatarVariants>["size"]
  variant?: VariantProps<typeof avatarVariants>["variant"]
  shape?: VariantProps<typeof avatarVariants>["shape"]
}

const AvatarGroup = React.forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ 
    avatars, 
    max = 5, 
    spacing = "default",
    size = "default",
    variant = "default",
    shape = "circle",
    className,
    ...props 
  }, ref) => {
    const spacingClasses = {
      tight: "-ml-1",
      default: "-ml-2",
      loose: "-ml-3",
    }

    const visibleAvatars = avatars.slice(0, max)
    const hiddenCount = avatars.length - max

    return (
      <div
        ref={ref}
        className={cn("flex items-center", className)}
        {...props}
      >
        {visibleAvatars.map((avatar, index) => (
          <AvatarWithFallback
            key={index}
            src={avatar.src}
            alt={avatar.alt}
            fallback={avatar.fallback}
            fallbackIcon={avatar.fallbackIcon}
            size={size}
            variant={variant}
            shape={shape}
            className={cn(
              spacingClasses[spacing],
              index === 0 && "ml-0"
            )}
          />
        ))}
        {hiddenCount > 0 && (
          <div
            className={cn(
              "flex items-center justify-center rounded-full bg-muted text-xs font-medium text-muted-foreground border-2 border-background",
              spacingClasses[spacing],
              size === "xs" && "h-6 w-6",
              size === "sm" && "h-8 w-8",
              size === "default" && "h-10 w-10",
              size === "lg" && "h-12 w-12",
              size === "xl" && "h-16 w-16",
              size === "2xl" && "h-20 w-20",
              size === "3xl" && "h-24 w-24",
            )}
          >
            +{hiddenCount}
          </div>
        )}
      </div>
    )
  }
)
AvatarGroup.displayName = "AvatarGroup"

export {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarWithFallback,
  AvatarGroup,
  avatarVariants,
}
