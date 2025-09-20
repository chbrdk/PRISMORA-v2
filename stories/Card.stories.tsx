import type { Meta, StoryObj } from '@storybook/react'
import {
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
} from '@/components/ui/card'

const meta: Meta<typeof Card> = {
  title: 'UI/Card',
  component: Card,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'prismora', 'elevated', 'bordered', 'ghost', 'outline', 'interactive', 'featured', 'minimal', 'dark'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'default', 'lg', 'xl'],
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

// ===== BASIC CARD STORIES =====

export const Basic: Story = {
  args: {
    children: (
      <>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This is the card content.</p>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </>
    ),
  },
}

export const Variants: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card variant="default">
        <CardHeader>
          <CardTitle>Default Card</CardTitle>
          <CardDescription>Standard card variant</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This is the default card variant.</p>
        </CardContent>
      </Card>

      <Card variant="prismora">
        <CardHeader>
          <CardTitle>PRISMORA Card</CardTitle>
          <CardDescription>Branded card variant</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This is the PRISMORA branded card.</p>
        </CardContent>
      </Card>

      <Card variant="elevated">
        <CardHeader>
          <CardTitle>Elevated Card</CardTitle>
          <CardDescription>Card with enhanced shadow</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This card has an elevated shadow effect.</p>
        </CardContent>
      </Card>

      <Card variant="bordered">
        <CardHeader>
          <CardTitle>Bordered Card</CardTitle>
          <CardDescription>Card with thick border</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This card has a thicker border.</p>
        </CardContent>
      </Card>

      <Card variant="ghost">
        <CardHeader>
          <CardTitle>Ghost Card</CardTitle>
          <CardDescription>Transparent card variant</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This card has a transparent background.</p>
        </CardContent>
      </Card>

      <Card variant="featured">
        <CardHeader>
          <CardTitle>Featured Card</CardTitle>
          <CardDescription>Highlighted card variant</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This card has a featured gradient background.</p>
        </CardContent>
      </Card>
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card size="sm">
        <CardHeader>
          <CardTitle>Small Card</CardTitle>
          <CardDescription>Compact padding</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Small card with minimal padding.</p>
        </CardContent>
      </Card>

      <Card size="default">
        <CardHeader>
          <CardTitle>Default Card</CardTitle>
          <CardDescription>Standard padding</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Default card with standard padding.</p>
        </CardContent>
      </Card>

      <Card size="lg">
        <CardHeader>
          <CardTitle>Large Card</CardTitle>
          <CardDescription>Generous padding</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Large card with generous padding.</p>
        </CardContent>
      </Card>

      <Card size="xl">
        <CardHeader>
          <CardTitle>Extra Large Card</CardTitle>
          <CardDescription>Maximum padding</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Extra large card with maximum padding.</p>
        </CardContent>
      </Card>
    </div>
  ),
}

// ===== PRODUCT CARD STORIES =====

export const ProductCards: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <ProductCard
        image="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop"
        title="Wireless Headphones"
        description="High-quality wireless headphones with noise cancellation and premium sound quality."
        price="$299.99"
        originalPrice="$399.99"
        badge="Sale"
        badgeVariant="destructive"
        rating={4.5}
        reviewCount={128}
        onAddToCart={() => alert('Added to cart!')}
        onViewDetails={() => alert('View details!')}
      />

      <ProductCard
        image="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop"
        title="Smart Watch"
        description="Feature-rich smartwatch with health tracking and notifications."
        price="$199.99"
        badge="New"
        badgeVariant="success"
        rating={4.8}
        reviewCount={256}
        onAddToCart={() => alert('Added to cart!')}
        onViewDetails={() => alert('View details!')}
      />

      <ProductCard
        image="https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&h=400&fit=crop"
        title="Camera Lens"
        description="Professional camera lens for stunning photography."
        price="$899.99"
        rating={4.9}
        reviewCount={89}
        onAddToCart={() => alert('Added to cart!')}
        onViewDetails={() => alert('View details!')}
      />
    </div>
  ),
}

// ===== BLOG POST CARD STORIES =====

export const BlogPostCards: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <BlogPostCard
        image="https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=400&h=300&fit=crop"
        title="The Future of Web Development"
        excerpt="Explore the latest trends and technologies shaping the future of web development, from AI integration to performance optimization."
        author={{
          name: "Sarah Johnson",
          avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
        }}
        date="Dec 15, 2024"
        readTime="5 min read"
        tags={["Web Development", "Technology", "AI"]}
        category="Technology"
        onReadMore={() => alert('Read more!')}
      />

      <BlogPostCard
        image="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop"
        title="Design System Best Practices"
        excerpt="Learn how to create and maintain effective design systems that scale with your product and team."
        author={{
          name: "Mike Chen"
        }}
        date="Dec 12, 2024"
        readTime="8 min read"
        tags={["Design", "UX", "Design Systems"]}
        category="Design"
        onReadMore={() => alert('Read more!')}
      />

      <BlogPostCard
        image="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop"
        title="React Performance Optimization"
        excerpt="Discover advanced techniques for optimizing React applications and improving user experience."
        author={{
          name: "Alex Rodriguez",
          avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
        }}
        date="Dec 10, 2024"
        readTime="12 min read"
        tags={["React", "Performance", "JavaScript"]}
        category="Development"
        onReadMore={() => alert('Read more!')}
      />
    </div>
  ),
}

// ===== FEATURE CARD STORIES =====

export const FeatureCards: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <FeatureCard
        icon="Zap"
        title="Lightning Fast"
        description="Experience blazing fast performance with our optimized architecture."
        actionText="Learn More"
        onAction={() => alert('Learn more clicked!')}
      />

      <FeatureCard
        icon="Shield"
        title="Secure by Design"
        description="Built with security in mind from the ground up."
        actionText="Get Started"
        onAction={() => alert('Get started clicked!')}
        highlight={true}
      />

      <FeatureCard
        icon="Users"
        title="Team Collaboration"
        description="Work seamlessly with your team in real-time."
        actionText="Try Now"
        onAction={() => alert('Try now clicked!')}
      />

      <FeatureCard
        icon="BarChart"
        title="Analytics Dashboard"
        description="Get insights into your data with powerful analytics."
        actionText="View Demo"
        onAction={() => alert('View demo clicked!')}
      />

      <FeatureCard
        icon="Globe"
        title="Global Reach"
        description="Connect with users worldwide with our global infrastructure."
        actionText="Explore"
        onAction={() => alert('Explore clicked!')}
      />

      <FeatureCard
        icon="Heart"
        title="Customer Support"
        description="24/7 customer support to help you succeed."
        actionText="Contact Us"
        onAction={() => alert('Contact us clicked!')}
      />
    </div>
  ),
}

// ===== STATS CARD STORIES =====

export const StatsCards: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatsCard
        title="Total Revenue"
        value="$45,231"
        change={{ value: 20.1, isPositive: true }}
        icon="DollarSign"
      />

      <StatsCard
        title="Active Users"
        value="2,350"
        change={{ value: 180.1, isPositive: true }}
        icon="Users"
      />

      <StatsCard
        title="Sales"
        value="12,234"
        change={{ value: 19, isPositive: false }}
        icon="ShoppingCart"
      />

      <StatsCard
        title="Active Now"
        value="573"
        change={{ value: 201, isPositive: true }}
        icon="Activity"
      />
    </div>
  ),
}

// ===== USER PROFILE CARD STORIES =====

export const UserProfileCards: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <UserProfileCard
        avatar="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face"
        name="Alex Johnson"
        role="Senior Developer"
        email="alex@example.com"
        bio="Passionate about creating amazing user experiences and building scalable applications."
        stats={{
          posts: 42,
          followers: 1234,
          following: 567
        }}
        actions={{
          primary: {
            text: "Follow",
            onClick: () => alert('Follow clicked!')
          },
          secondary: {
            text: "Message",
            onClick: () => alert('Message clicked!')
          }
        }}
      />

      <UserProfileCard
        name="Sarah Chen"
        role="UX Designer"
        email="sarah@example.com"
        bio="Creative designer focused on user-centered design and beautiful interfaces."
        stats={{
          posts: 28,
          followers: 892,
          following: 234
        }}
        actions={{
          primary: {
            text: "Connect",
            onClick: () => alert('Connect clicked!')
          }
        }}
      />

      <UserProfileCard
        avatar="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face"
        name="Mike Rodriguez"
        role="Product Manager"
        email="mike@example.com"
        bio="Product leader with a passion for building products that users love."
        stats={{
          posts: 15,
          followers: 567,
          following: 123
        }}
        actions={{
          primary: {
            text: "View Profile",
            onClick: () => alert('View profile clicked!')
          }
        }}
      />
    </div>
  ),
}

// ===== NOTIFICATION CARD STORIES =====

export const NotificationCards: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <NotificationCard
        type="success"
        title="Payment Successful"
        message="Your payment of $299.99 has been processed successfully."
        timestamp="2 minutes ago"
        onDismiss={() => alert('Dismissed!')}
        onAction={() => alert('View receipt!')}
        actionText="View Receipt"
      />

      <NotificationCard
        type="warning"
        title="Storage Space Low"
        message="You're running low on storage space. Consider upgrading your plan."
        timestamp="1 hour ago"
        onDismiss={() => alert('Dismissed!')}
        onAction={() => alert('Upgrade plan!')}
        actionText="Upgrade Plan"
      />

      <NotificationCard
        type="error"
        title="Connection Failed"
        message="Unable to connect to the server. Please check your internet connection."
        timestamp="5 minutes ago"
        onDismiss={() => alert('Dismissed!')}
        onAction={() => alert('Retry connection!')}
        actionText="Retry"
      />

      <NotificationCard
        type="info"
        title="New Feature Available"
        message="We've added new analytics features to help you track your progress."
        timestamp="1 day ago"
        read={true}
        onDismiss={() => alert('Dismissed!')}
        onAction={() => alert('Learn more!')}
        actionText="Learn More"
      />
    </div>
  ),
}

// ===== INTERACTIVE CARD STORIES =====

export const InteractiveCards: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card 
        variant="interactive" 
        className="cursor-pointer"
        onClick={() => alert('Card clicked!')}
      >
        <CardHeader>
          <CardTitle>Interactive Card</CardTitle>
          <CardDescription>Click me to see the interaction</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This card has hover and click interactions.</p>
        </CardContent>
      </Card>

      <Card 
        variant="interactive" 
        className="cursor-pointer"
        onClick={() => alert('Card clicked!')}
      >
        <CardHeader>
          <CardTitle>Hover Effects</CardTitle>
          <CardDescription>Hover over me to see the effects</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This card scales and shows shadow on hover.</p>
        </CardContent>
      </Card>

      <Card 
        variant="interactive" 
        className="cursor-pointer"
        onClick={() => alert('Card clicked!')}
      >
        <CardHeader>
          <CardTitle>Active State</CardTitle>
          <CardDescription>Click and hold to see active state</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This card has an active state when clicked.</p>
        </CardContent>
      </Card>
    </div>
  ),
}
