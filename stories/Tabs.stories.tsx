import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent, TabsWithIcons } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Settings, User, Bell, Home, FileText, Image, Video, Music } from 'lucide-react';

const meta: Meta<typeof Tabs> = {
  title: 'Navigation/Tabs',
  component: Tabs,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Tab-Komponenten für Navigation und Inhaltsorganisation mit verschiedenen Varianten und Orientierungen.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'prismora', 'outline', 'filled'],
      description: 'Die visuelle Variante der Tabs',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'default', 'lg'],
      description: 'Die Größe der Tabs',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Account-Einstellungen und Informationen.</p>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="password">
        <Card>
          <CardHeader>
            <CardTitle>Password</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Passwort-Einstellungen und Sicherheit.</p>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="settings">
        <Card>
          <CardHeader>
            <CardTitle>Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Allgemeine Einstellungen und Konfiguration.</p>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <TabsWithIcons
      tabs={[
        {
          value: "home",
          label: "Home",
          icon: Home,
          content: (
            <Card>
              <CardContent className="pt-6">
                <p>Willkommen auf der Startseite!</p>
              </CardContent>
            </Card>
          ),
        },
        {
          value: "profile",
          label: "Profile",
          icon: User,
          content: (
            <Card>
              <CardContent className="pt-6">
                <p>Benutzerprofil und Einstellungen.</p>
              </CardContent>
            </Card>
          ),
        },
        {
          value: "notifications",
          label: "Notifications",
          icon: Bell,
          content: (
            <Card>
              <CardContent className="pt-6">
                <p>Benachrichtigungen und Alerts.</p>
              </CardContent>
            </Card>
          ),
        },
        {
          value: "settings",
          label: "Settings",
          icon: Settings,
          content: (
            <Card>
              <CardContent className="pt-6">
                <p>System-Einstellungen und Konfiguration.</p>
              </CardContent>
            </Card>
          ),
        },
      ]}
    />
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Default Variant</h3>
        <Tabs defaultValue="tab1" className="w-[400px]">
          <TabsList>
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
            <TabsTrigger value="tab2">Tab 2</TabsTrigger>
            <TabsTrigger value="tab3">Tab 3</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">
            <Card>
              <CardContent className="pt-6">
                <p>Default Tab Inhalt</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="tab2">
            <Card>
              <CardContent className="pt-6">
                <p>Zweiter Tab Inhalt</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="tab3">
            <Card>
              <CardContent className="pt-6">
                <p>Dritter Tab Inhalt</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">PRISMORA Variant</h3>
        <Tabs defaultValue="tab1" className="w-[400px]">
          <TabsList variant="prismora">
            <TabsTrigger value="tab1" variant="prismora">Tab 1</TabsTrigger>
            <TabsTrigger value="tab2" variant="prismora">Tab 2</TabsTrigger>
            <TabsTrigger value="tab3" variant="prismora">Tab 3</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">
            <Card>
              <CardContent className="pt-6">
                <p>PRISMORA Tab Inhalt</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="tab2">
            <Card>
              <CardContent className="pt-6">
                <p>Zweiter PRISMORA Tab</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="tab3">
            <Card>
              <CardContent className="pt-6">
                <p>Dritter PRISMORA Tab</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">Outline Variant</h3>
        <Tabs defaultValue="tab1" className="w-[400px]">
          <TabsList variant="outline">
            <TabsTrigger value="tab1" variant="outline">Tab 1</TabsTrigger>
            <TabsTrigger value="tab2" variant="outline">Tab 2</TabsTrigger>
            <TabsTrigger value="tab3" variant="outline">Tab 3</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">
            <Card>
              <CardContent className="pt-6">
                <p>Outline Tab Inhalt</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="tab2">
            <Card>
              <CardContent className="pt-6">
                <p>Zweiter Outline Tab</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="tab3">
            <Card>
              <CardContent className="pt-6">
                <p>Dritter Outline Tab</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Small Size</h3>
        <Tabs defaultValue="tab1" className="w-[400px]">
          <TabsList size="sm">
            <TabsTrigger value="tab1" size="sm">Tab 1</TabsTrigger>
            <TabsTrigger value="tab2" size="sm">Tab 2</TabsTrigger>
            <TabsTrigger value="tab3" size="sm">Tab 3</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">
            <Card>
              <CardContent className="pt-6">
                <p>Small Tab Inhalt</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">Default Size</h3>
        <Tabs defaultValue="tab1" className="w-[400px]">
          <TabsList>
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
            <TabsTrigger value="tab2">Tab 2</TabsTrigger>
            <TabsTrigger value="tab3">Tab 3</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">
            <Card>
              <CardContent className="pt-6">
                <p>Default Tab Inhalt</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">Large Size</h3>
        <Tabs defaultValue="tab1" className="w-[400px]">
          <TabsList size="lg">
            <TabsTrigger value="tab1" size="lg">Tab 1</TabsTrigger>
            <TabsTrigger value="tab2" size="lg">Tab 2</TabsTrigger>
            <TabsTrigger value="tab3" size="lg">Tab 3</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">
            <Card>
              <CardContent className="pt-6">
                <p>Large Tab Inhalt</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  ),
};

export const VerticalTabs: Story = {
  render: () => (
    <Tabs defaultValue="account" orientation="vertical" className="w-[600px]">
      <TabsList orientation="vertical">
        <TabsTrigger value="account" orientation="vertical">Account</TabsTrigger>
        <TabsTrigger value="password" orientation="vertical">Password</TabsTrigger>
        <TabsTrigger value="settings" orientation="vertical">Settings</TabsTrigger>
        <TabsTrigger value="notifications" orientation="vertical">Notifications</TabsTrigger>
      </TabsList>
      <TabsContent value="account" className="ml-6">
        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Account-Einstellungen und Benutzerinformationen.</p>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="password" className="ml-6">
        <Card>
          <CardHeader>
            <CardTitle>Password</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Passwort-Einstellungen und Sicherheitsoptionen.</p>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="settings" className="ml-6">
        <Card>
          <CardHeader>
            <CardTitle>Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Allgemeine Einstellungen und Konfiguration.</p>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="notifications" className="ml-6">
        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Benachrichtigungseinstellungen und Alerts.</p>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  ),
};

export const DisabledTabs: Story = {
  render: () => (
    <Tabs defaultValue="active" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="active">Active</TabsTrigger>
        <TabsTrigger value="disabled" disabled>Disabled</TabsTrigger>
        <TabsTrigger value="another">Another</TabsTrigger>
      </TabsList>
      <TabsContent value="active">
        <Card>
          <CardContent className="pt-6">
            <p>Dieser Tab ist aktiv und funktional.</p>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="disabled">
        <Card>
          <CardContent className="pt-6">
            <p>Dieser Tab ist deaktiviert.</p>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="another">
        <Card>
          <CardContent className="pt-6">
            <p>Ein weiterer aktiver Tab.</p>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  ),
};

export const MediaTabs: Story = {
  render: () => (
    <TabsWithIcons
      tabs={[
        {
          value: "images",
          label: "Images",
          icon: Image,
          content: (
            <div className="grid grid-cols-2 gap-4">
              <div className="h-32 bg-gray-200 rounded flex items-center justify-center">Image 1</div>
              <div className="h-32 bg-gray-200 rounded flex items-center justify-center">Image 2</div>
              <div className="h-32 bg-gray-200 rounded flex items-center justify-center">Image 3</div>
              <div className="h-32 bg-gray-200 rounded flex items-center justify-center">Image 4</div>
            </div>
          ),
        },
        {
          value: "videos",
          label: "Videos",
          icon: Video,
          content: (
            <div className="space-y-4">
              <div className="h-24 bg-gray-200 rounded flex items-center justify-center">Video 1</div>
              <div className="h-24 bg-gray-200 rounded flex items-center justify-center">Video 2</div>
              <div className="h-24 bg-gray-200 rounded flex items-center justify-center">Video 3</div>
            </div>
          ),
        },
        {
          value: "documents",
          label: "Documents",
          icon: FileText,
          content: (
            <div className="space-y-2">
              <div className="p-3 border rounded">Document 1.pdf</div>
              <div className="p-3 border rounded">Document 2.docx</div>
              <div className="p-3 border rounded">Document 3.txt</div>
            </div>
          ),
        },
        {
          value: "music",
          label: "Music",
          icon: Music,
          content: (
            <div className="space-y-2">
              <div className="p-3 border rounded">Song 1.mp3</div>
              <div className="p-3 border rounded">Song 2.wav</div>
              <div className="p-3 border rounded">Song 3.flac</div>
            </div>
          ),
        },
      ]}
    />
  ),
};

export const InteractiveExample: Story = {
  render: () => {
    const [activeTab, setActiveTab] = React.useState("tab1");
    
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">
            Aktiver Tab: {activeTab}
          </span>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-[400px]">
          <TabsList>
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
            <TabsTrigger value="tab2">Tab 2</TabsTrigger>
            <TabsTrigger value="tab3">Tab 3</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">
            <Card>
              <CardContent className="pt-6">
                <p>Inhalt von Tab 1</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Dieser Tab wurde programmatisch gesteuert.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="tab2">
            <Card>
              <CardContent className="pt-6">
                <p>Inhalt von Tab 2</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Der aktive Tab wird extern verwaltet.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="tab3">
            <Card>
              <CardContent className="pt-6">
                <p>Inhalt von Tab 3</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Vollständige Kontrolle über den Tab-Zustand.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    );
  },
};
