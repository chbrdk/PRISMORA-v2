import type { Meta, StoryObj } from '@storybook/react';
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableFooter, 
  TableHead, 
  TableRow, 
  TableCell, 
  TableCaption,
  DataTable 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarWithFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, Eye } from 'lucide-react';
import React from 'react';

const meta: Meta<typeof Table> = {
  title: 'Data Display/Table',
  component: Table,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Tabellen-Komponenten für strukturierte Daten-Darstellung mit Sortierung, Auswahl und verschiedenen Varianten.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'prismora', 'striped', 'bordered', 'compact'],
      description: 'Die visuelle Variante der Tabelle',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'default', 'lg'],
      description: 'Die Größe der Tabelle',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample data
const users = [
  {
    id: 1,
    name: "Max Mustermann",
    email: "max@example.com",
    role: "Admin",
    status: "active",
    lastLogin: "2024-01-15",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: 2,
    name: "Anna Schmidt",
    email: "anna@example.com",
    role: "User",
    status: "inactive",
    lastLogin: "2024-01-10",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: 3,
    name: "Tom Weber",
    email: "tom@example.com",
    role: "Editor",
    status: "active",
    lastLogin: "2024-01-14",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: 4,
    name: "Lisa Müller",
    email: "lisa@example.com",
    role: "User",
    status: "pending",
    lastLogin: "2024-01-08",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: 5,
    name: "Paul Fischer",
    email: "paul@example.com",
    role: "Admin",
    status: "active",
    lastLogin: "2024-01-12",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
  },
];

const products = [
  {
    id: 1,
    name: "Laptop Pro",
    category: "Electronics",
    price: 1299.99,
    stock: 45,
    status: "in-stock",
  },
  {
    id: 2,
    name: "Wireless Headphones",
    category: "Audio",
    price: 199.99,
    stock: 0,
    status: "out-of-stock",
  },
  {
    id: 3,
    name: "Smartphone X",
    category: "Electronics",
    price: 899.99,
    stock: 12,
    status: "low-stock",
  },
  {
    id: 4,
    name: "Coffee Maker",
    category: "Home",
    price: 89.99,
    stock: 78,
    status: "in-stock",
  },
];

export const Default: Story = {
  render: () => (
    <Table>
      <TableCaption>Eine Liste aller Benutzer.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Rolle</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Letzter Login</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell className="font-medium">{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.role}</TableCell>
            <TableCell>
              <Badge variant={user.status === 'active' ? 'success' : 'secondary'}>
                {user.status}
              </Badge>
            </TableCell>
            <TableCell>{user.lastLogin}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};

export const WithAvatars: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Benutzer</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Rolle</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Aktionen</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell>
              <div className="flex items-center gap-3">
                <AvatarWithFallback
                  src={user.avatar}
                  alt={user.name}
                  fallback={user.name}
                  size="sm"
                />
                <div>
                  <div className="font-medium">{user.name}</div>
                  <div className="text-sm text-muted-foreground">ID: {user.id}</div>
                </div>
              </div>
            </TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>
              <Badge variant="outline">{user.role}</Badge>
            </TableCell>
            <TableCell>
              <Badge variant={user.status === 'active' ? 'success' : 'secondary'}>
                {user.status}
              </Badge>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <Button size="sm" variant="ghost">
                  <Eye className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="ghost">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="ghost" className="text-destructive">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Default Variant</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.slice(0, 3).map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Badge variant={user.status === 'active' ? 'success' : 'secondary'}>
                    {user.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">PRISMORA Variant</h3>
        <Table variant="prismora">
          <TableHeader>
            <TableRow variant="prismora">
              <TableHead variant="prismora">Name</TableHead>
              <TableHead variant="prismora">Email</TableHead>
              <TableHead variant="prismora">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.slice(0, 3).map((user) => (
              <TableRow key={user.id} variant="prismora">
                <TableCell variant="prismora" className="font-medium">{user.name}</TableCell>
                <TableCell variant="prismora">{user.email}</TableCell>
                <TableCell variant="prismora">
                  <Badge variant={user.status === 'active' ? 'success' : 'secondary'}>
                    {user.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">Striped Variant</h3>
        <Table variant="striped">
          <TableHeader>
            <TableRow variant="striped">
              <TableHead variant="striped">Name</TableHead>
              <TableHead variant="striped">Email</TableHead>
              <TableHead variant="striped">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.slice(0, 3).map((user) => (
              <TableRow key={user.id} variant="striped">
                <TableCell variant="striped" className="font-medium">{user.name}</TableCell>
                <TableCell variant="striped">{user.email}</TableCell>
                <TableCell variant="striped">
                  <Badge variant={user.status === 'active' ? 'success' : 'secondary'}>
                    {user.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">Bordered Variant</h3>
        <Table variant="bordered">
          <TableHeader>
            <TableRow variant="bordered">
              <TableHead variant="bordered">Name</TableHead>
              <TableHead variant="bordered">Email</TableHead>
              <TableHead variant="bordered">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.slice(0, 3).map((user) => (
              <TableRow key={user.id} variant="bordered">
                <TableCell variant="bordered" className="font-medium">{user.name}</TableCell>
                <TableCell variant="bordered">{user.email}</TableCell>
                <TableCell variant="bordered">
                  <Badge variant={user.status === 'active' ? 'success' : 'secondary'}>
                    {user.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Small Size</h3>
        <Table size="sm">
          <TableHeader>
            <TableRow size="sm">
              <TableHead size="sm">Name</TableHead>
              <TableHead size="sm">Email</TableHead>
              <TableHead size="sm">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.slice(0, 3).map((user) => (
              <TableRow key={user.id} size="sm">
                <TableCell size="sm" className="font-medium">{user.name}</TableCell>
                <TableCell size="sm">{user.email}</TableCell>
                <TableCell size="sm">
                  <Badge variant={user.status === 'active' ? 'success' : 'secondary'} size="sm">
                    {user.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">Default Size</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.slice(0, 3).map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Badge variant={user.status === 'active' ? 'success' : 'secondary'}>
                    {user.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">Large Size</h3>
        <Table size="lg">
          <TableHeader>
            <TableRow size="lg">
              <TableHead size="lg">Name</TableHead>
              <TableHead size="lg">Email</TableHead>
              <TableHead size="lg">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.slice(0, 3).map((user) => (
              <TableRow key={user.id} size="lg">
                <TableCell size="lg" className="font-medium">{user.name}</TableCell>
                <TableCell size="lg">{user.email}</TableCell>
                <TableCell size="lg">
                  <Badge variant={user.status === 'active' ? 'success' : 'secondary'} size="lg">
                    {user.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  ),
};

export const DataTableExample: Story = {
  render: () => {
    const columns = [
      {
        key: 'name',
        header: 'Name',
        sortable: true,
      },
      {
        key: 'category',
        header: 'Kategorie',
        sortable: true,
      },
      {
        key: 'price',
        header: 'Preis',
        sortable: true,
        render: (value: number) => `€${value.toFixed(2)}`,
      },
      {
        key: 'stock',
        header: 'Lagerbestand',
        sortable: true,
        render: (value: number) => (
          <span className={value === 0 ? 'text-red-500' : value < 20 ? 'text-yellow-500' : 'text-green-500'}>
            {value}
          </span>
        ),
      },
      {
        key: 'status',
        header: 'Status',
        sortable: true,
        render: (value: string) => (
          <Badge variant={value === 'in-stock' ? 'success' : value === 'out-of-stock' ? 'destructive' : 'warning'}>
            {value === 'in-stock' ? 'Verfügbar' : value === 'out-of-stock' ? 'Nicht verfügbar' : 'Niedrig'}
          </Badge>
        ),
      },
    ];

    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Produkt-Tabelle mit Sortierung</h3>
        <DataTable
          data={products}
          columns={columns}
          variant="default"
          size="default"
          selectable={true}
          onRowClick={(row) => console.log('Clicked row:', row)}
        />
      </div>
    );
  },
};

export const WithFooter: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Rolle</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell className="font-medium">{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.role}</TableCell>
            <TableCell>
              <Badge variant={user.status === 'active' ? 'success' : 'secondary'}>
                {user.status}
              </Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={4} className="text-center">
            Gesamt: {users.length} Benutzer
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  ),
};

export const InteractiveExample: Story = {
  render: () => {
    const [selectedRows, setSelectedRows] = React.useState<any[]>([]);
    
    const columns = [
      {
        key: 'name',
        header: 'Name',
        sortable: true,
      },
      {
        key: 'email',
        header: 'Email',
        sortable: true,
      },
      {
        key: 'role',
        header: 'Rolle',
        sortable: true,
      },
      {
        key: 'status',
        header: 'Status',
        sortable: true,
        render: (value: string) => (
          <Badge variant={value === 'active' ? 'success' : 'secondary'}>
            {value}
          </Badge>
        ),
      },
    ];

    return (
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">
            Ausgewählte Zeilen: {selectedRows.length}
          </span>
          {selectedRows.length > 0 && (
            <Button
              size="sm"
              variant="destructive"
              onClick={() => setSelectedRows([])}
            >
              Auswahl löschen
            </Button>
          )}
        </div>
        
        <DataTable
          data={users}
          columns={columns}
          selectable={true}
          selectedRows={selectedRows}
          onSelectionChange={setSelectedRows}
          onRowClick={(row) => console.log('Clicked row:', row)}
        />
      </div>
    );
  },
};
