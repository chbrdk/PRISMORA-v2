import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Icon } from "@/components/ui/icon"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const cardVariants = cva(
  "rounded-lg border bg-card text-card-foreground shadow-sm transition-all duration-200",
  {
    variants: {
      variant: {
        default: "",
        prismora: "border-prismora-200 bg-prismora-50/50 hover:border-prismora-300",
        elevated: "shadow-md hover:shadow-lg",
        bordered: "border-2",
        ghost: "border-transparent bg-transparent shadow-none",
        outline: "bg-transparent",
        interactive: "cursor-pointer hover:shadow-md hover:scale-[1.02] active:scale-[0.98]",
        featured: "border-prismora-500 bg-gradient-to-br from-prismora-50 to-white",
        minimal: "border-gray-100 bg-white",
        dark: "border-gray-700 bg-gray-800 text-white",
      },
      size: {
        sm: "p-4",
        default: "p-6",
        lg: "p-8",
        xl: "p-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, size, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardVariants({ variant, size }), className)}
      {...props}
    />
  )
)
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

// ===== SPEZIALISIERTE TEASERBOX-KOMPONENTEN =====

// Product Card
interface ProductCardProps extends CardProps {
  image?: string
  title: string
  description?: string
  price?: string
  originalPrice?: string
  badge?: string
  badgeVariant?: "default" | "secondary" | "destructive" | "outline" | "success" | "warning" | "info" | "prismora"
  rating?: number
  reviewCount?: number
  onAddToCart?: () => void
  onViewDetails?: () => void
}

const ProductCard = React.forwardRef<HTMLDivElement, ProductCardProps>(
  ({ 
    className, 
    variant = "default",
    image, 
    title, 
    description, 
    price, 
    originalPrice, 
    badge,
    badgeVariant = "prismora",
    rating,
    reviewCount,
    onAddToCart,
    onViewDetails,
    ...props 
  }, ref) => {
    return (
      <Card ref={ref} variant={variant} className={cn("group", className)} {...props}>
        {image && (
          <div className="relative aspect-square overflow-hidden rounded-t-lg">
            <img 
              src={image} 
              alt={title}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            {badge && (
              <Badge 
                variant={badgeVariant} 
                className="absolute top-2 left-2"
              >
                {badge}
              </Badge>
            )}
          </div>
        )}
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">{title}</CardTitle>
          {description && (
            <CardDescription className="line-clamp-2">{description}</CardDescription>
          )}
        </CardHeader>
        <CardContent className="pt-0">
          {rating && (
            <div className="flex items-center gap-1 mb-3">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Icon 
                    key={i}
                    name={i < Math.floor(rating) ? "Star" : "Star"} 
                    size="sm"
                    className={cn(
                      "text-yellow-400",
                      i >= Math.floor(rating) && "text-gray-300"
                    )}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                ({reviewCount} reviews)
              </span>
            </div>
          )}
          <div className="flex items-center gap-2 mb-4">
            {price && (
              <span className="text-xl font-bold text-prismora-600">
                {price}
              </span>
            )}
            {originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                {originalPrice}
              </span>
            )}
          </div>
        </CardContent>
        <CardFooter className="pt-0">
          <div className="flex gap-2 w-full">
            {onViewDetails && (
              <Button variant="outline" className="flex-1" onClick={onViewDetails}>
                Details
              </Button>
            )}
            {onAddToCart && (
              <Button className="flex-1" onClick={onAddToCart}>
                <Icon name="ShoppingCart" size="sm" className="mr-2" />
                Add to Cart
              </Button>
            )}
          </div>
        </CardFooter>
      </Card>
    )
  }
)
ProductCard.displayName = "ProductCard"

// Blog Post Card
interface BlogPostCardProps extends CardProps {
  image?: string
  title: string
  excerpt?: string
  author?: {
    name: string
    avatar?: string
  }
  date?: string
  readTime?: string
  tags?: string[]
  category?: string
  onReadMore?: () => void
}

const BlogPostCard = React.forwardRef<HTMLDivElement, BlogPostCardProps>(
  ({ 
    className, 
    variant = "default",
    image, 
    title, 
    excerpt, 
    author, 
    date, 
    readTime,
    tags,
    category,
    onReadMore,
    ...props 
  }, ref) => {
    return (
      <Card ref={ref} variant={variant} className={cn("group", className)} {...props}>
        {image && (
          <div className="relative aspect-video overflow-hidden rounded-t-lg">
            <img 
              src={image} 
              alt={title}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            {category && (
              <Badge variant="secondary" className="absolute top-2 left-2">
                {category}
              </Badge>
            )}
          </div>
        )}
        <CardHeader className="pb-3">
          <CardTitle className="text-xl line-clamp-2">{title}</CardTitle>
          {excerpt && (
            <CardDescription className="line-clamp-3">{excerpt}</CardDescription>
          )}
        </CardHeader>
        <CardContent className="pt-0">
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-4">
              {tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {tags.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{tags.length - 3} more
                </Badge>
              )}
            </div>
          )}
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            {author && (
              <div className="flex items-center gap-2">
                {author.avatar ? (
                  <img 
                    src={author.avatar} 
                    alt={author.name}
                    className="w-6 h-6 rounded-full"
                  />
                ) : (
                  <Icon name="User" size="sm" />
                )}
                <span>{author.name}</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              {date && <span>{date}</span>}
              {readTime && (
                <>
                  <Icon name="Clock" size="xs" />
                  <span>{readTime}</span>
                </>
              )}
            </div>
          </div>
        </CardContent>
        {onReadMore && (
          <CardFooter className="pt-0">
            <Button variant="ghost" onClick={onReadMore} className="w-full">
              Read More
              <Icon name="ArrowRight" size="sm" className="ml-2" />
            </Button>
          </CardFooter>
        )}
      </Card>
    )
  }
)
BlogPostCard.displayName = "BlogPostCard"

// Feature Card
interface FeatureCardProps extends CardProps {
  icon?: string
  title: string
  description?: string
  actionText?: string
  onAction?: () => void
  highlight?: boolean
}

const FeatureCard = React.forwardRef<HTMLDivElement, FeatureCardProps>(
  ({ 
    className, 
    variant = "default",
    icon, 
    title, 
    description, 
    actionText,
    onAction,
    highlight = false,
    ...props 
  }, ref) => {
    return (
      <Card 
        ref={ref} 
        variant={highlight ? "featured" : variant} 
        className={cn("text-center", className)} 
        {...props}
      >
        <CardHeader className="pb-4">
          {icon && (
            <div className="mx-auto mb-4 w-12 h-12 rounded-full bg-prismora-100 flex items-center justify-center">
              <Icon name={icon} size="lg" color="prismora" />
            </div>
          )}
          <CardTitle className="text-xl">{title}</CardTitle>
          {description && (
            <CardDescription className="text-base">{description}</CardDescription>
          )}
        </CardHeader>
        {actionText && onAction && (
          <CardFooter className="pt-0">
            <Button variant="outline" onClick={onAction} className="w-full">
              {actionText}
            </Button>
          </CardFooter>
        )}
      </Card>
    )
  }
)
FeatureCard.displayName = "FeatureCard"

// Stats Card
interface StatsCardProps extends CardProps {
  title: string
  value: string | number
  change?: {
    value: number
    isPositive: boolean
  }
  icon?: string
  trend?: "up" | "down" | "neutral"
}

const StatsCard = React.forwardRef<HTMLDivElement, StatsCardProps>(
  ({ 
    className, 
    variant = "default",
    title, 
    value, 
    change,
    icon,
    trend,
    ...props 
  }, ref) => {
    return (
      <Card ref={ref} variant={variant} className={cn("", className)} {...props}>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {title}
            </CardTitle>
            {icon && (
              <Icon name={icon} size="sm" className="text-muted-foreground" />
            )}
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="text-2xl font-bold">{value}</div>
          {change && (
            <div className="flex items-center gap-1 mt-2">
              <Icon 
                name={change.isPositive ? "TrendingUp" : "TrendingDown"} 
                size="sm"
                className={cn(
                  change.isPositive ? "text-green-600" : "text-red-600"
                )}
              />
              <span 
                className={cn(
                  "text-sm font-medium",
                  change.isPositive ? "text-green-600" : "text-red-600"
                )}
              >
                {change.value > 0 ? "+" : ""}{change.value}%
              </span>
            </div>
          )}
        </CardContent>
      </Card>
    )
  }
)
StatsCard.displayName = "StatsCard"

// User Profile Card
interface UserProfileCardProps extends CardProps {
  avatar?: string
  name: string
  role?: string
  email?: string
  bio?: string
  stats?: {
    posts?: number
    followers?: number
    following?: number
  }
  actions?: {
    primary?: {
      text: string
      onClick: () => void
    }
    secondary?: {
      text: string
      onClick: () => void
    }
  }
}

const UserProfileCard = React.forwardRef<HTMLDivElement, UserProfileCardProps>(
  ({ 
    className, 
    variant = "default",
    avatar, 
    name, 
    role, 
    email, 
    bio,
    stats,
    actions,
    ...props 
  }, ref) => {
    return (
      <Card ref={ref} variant={variant} className={cn("text-center", className)} {...props}>
        <CardHeader className="pb-4">
          <div className="mx-auto mb-4 w-20 h-20 rounded-full overflow-hidden">
            {avatar ? (
              <img 
                src={avatar} 
                alt={name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-prismora-100 flex items-center justify-center">
                <Icon name="User" size="xl" color="prismora" />
              </div>
            )}
          </div>
          <CardTitle className="text-xl">{name}</CardTitle>
          {role && (
            <CardDescription className="text-base font-medium text-prismora-600">
              {role}
            </CardDescription>
          )}
          {email && (
            <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
              <Icon name="Mail" size="sm" />
              <span>{email}</span>
            </div>
          )}
        </CardHeader>
        {bio && (
          <CardContent className="pt-0">
            <p className="text-sm text-muted-foreground">{bio}</p>
          </CardContent>
        )}
        {stats && (
          <CardContent className="pt-0">
            <div className="grid grid-cols-3 gap-4 border-t pt-4">
              {stats.posts !== undefined && (
                <div>
                  <div className="text-xl font-bold">{stats.posts}</div>
                  <div className="text-xs text-muted-foreground">Posts</div>
                </div>
              )}
              {stats.followers !== undefined && (
                <div>
                  <div className="text-xl font-bold">{stats.followers}</div>
                  <div className="text-xs text-muted-foreground">Followers</div>
                </div>
              )}
              {stats.following !== undefined && (
                <div>
                  <div className="text-xl font-bold">{stats.following}</div>
                  <div className="text-xs text-muted-foreground">Following</div>
                </div>
              )}
            </div>
          </CardContent>
        )}
        {actions && (
          <CardFooter className="pt-0">
            <div className="flex gap-2 w-full">
              {actions.secondary && (
                <Button 
                  variant="outline" 
                  className="flex-1" 
                  onClick={actions.secondary.onClick}
                >
                  {actions.secondary.text}
                </Button>
              )}
              {actions.primary && (
                <Button 
                  className="flex-1" 
                  onClick={actions.primary.onClick}
                >
                  {actions.primary.text}
                </Button>
              )}
            </div>
          </CardFooter>
        )}
      </Card>
    )
  }
)
UserProfileCard.displayName = "UserProfileCard"

// Notification Card
interface NotificationCardProps extends CardProps {
  type?: "info" | "success" | "warning" | "error"
  title: string
  message?: string
  timestamp?: string
  read?: boolean
  onDismiss?: () => void
  onAction?: () => void
  actionText?: string
}

const NotificationCard = React.forwardRef<HTMLDivElement, NotificationCardProps>(
  ({ 
    className, 
    variant = "default",
    type = "info", 
    title, 
    message, 
    timestamp,
    read = false,
    onDismiss,
    onAction,
    actionText,
    ...props 
  }, ref) => {
    const iconMap = {
      info: "Info",
      success: "CheckCircle",
      warning: "AlertTriangle",
      error: "XCircle"
    }

    const variantMap = {
      info: "default",
      success: "default",
      warning: "default",
      error: "destructive"
    }

    return (
      <Card 
        ref={ref} 
        variant={variantMap[type] as any} 
        className={cn(
          "relative",
          read && "opacity-75",
          className
        )} 
        {...props}
      >
        <CardHeader className="pb-3">
          <div className="flex items-start gap-3">
            <Icon 
              name={iconMap[type]} 
              size="sm" 
              className={cn(
                "mt-1",
                type === "success" && "text-green-600",
                type === "warning" && "text-yellow-600",
                type === "error" && "text-red-600",
                type === "info" && "text-blue-600"
              )}
            />
            <div className="flex-1">
              <CardTitle className="text-base">{title}</CardTitle>
              {message && (
                <CardDescription className="mt-1">{message}</CardDescription>
              )}
              {timestamp && (
                <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                  <Icon name="Clock" size="xs" />
                  <span>{timestamp}</span>
                </div>
              )}
            </div>
            {onDismiss && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={onDismiss}
                className="h-6 w-6 p-0"
              >
                <Icon name="X" size="xs" />
              </Button>
            )}
          </div>
        </CardHeader>
        {onAction && actionText && (
          <CardFooter className="pt-0">
            <Button variant="outline" size="sm" onClick={onAction}>
              {actionText}
            </Button>
          </CardFooter>
        )}
      </Card>
    )
  }
)
NotificationCard.displayName = "NotificationCard"

export { 
  Card, 
  CardHeader, 
  CardFooter, 
  CardTitle, 
  CardDescription, 
  CardContent,
  ProductCard,
  BlogPostCard,
  FeatureCard,
  StatsCard,
  UserProfileCard,
  NotificationCard
}
