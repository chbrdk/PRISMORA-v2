import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { 
  Modal, ModalHeader, ModalContent, ModalFooter, ModalTrigger, ConfirmationModal, AlertModal
} from '@/components/ui/modal';
import {
  Popover, PopoverTrigger, PopoverContent, PopoverHeader, PopoverBody, PopoverFooter, InfoPopover, MenuPopover
} from '@/components/ui/popover';
import {
  Tooltip, InfoTooltip, HelpTooltip, TextTooltip, IconTooltip
} from '@/components/ui/tooltip';
import {
  Drawer, DrawerHeader, DrawerContent, DrawerFooter, SideDrawer, BottomDrawer, NavigationDrawer, SettingsDrawer
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { Icon, iconNames } from '@/components/ui/icon';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

const meta: Meta<typeof Modal> = {
  title: 'UI/Overlay Components',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Umfassende Overlay-Komponenten für Modals, Popovers, Tooltips und Drawers mit verschiedenen Varianten.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Modal Stories
export const BasicModal: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>
          Modal öffnen
        </Button>
        <Modal open={open} onOpenChange={setOpen}>
          <ModalHeader title="Beispiel Modal" description="Ein einfaches Modal mit Header und Content." />
          <ModalContent>
            <p>Dies ist der Inhalt des Modals. Hier können beliebige Komponenten platziert werden.</p>
          </ModalContent>
          <ModalFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Abbrechen
            </Button>
            <Button onClick={() => setOpen(false)}>
              Bestätigen
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  },
};

export const ModalSizes: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);
    const [size, setSize] = React.useState<'sm' | 'md' | 'lg' | 'xl' | 'full'>('md');

    return (
      <>
        <div className="flex gap-2">
          <Button onClick={() => { setSize('sm'); setOpen(true); }}>
            Small Modal
          </Button>
          <Button onClick={() => { setSize('md'); setOpen(true); }}>
            Medium Modal
          </Button>
          <Button onClick={() => { setSize('lg'); setOpen(true); }}>
            Large Modal
          </Button>
          <Button onClick={() => { setSize('xl'); setOpen(true); }}>
            Extra Large Modal
          </Button>
        </div>
        <Modal open={open} onOpenChange={setOpen} size={size}>
          <ModalHeader title={`${size.toUpperCase()} Modal`} />
          <ModalContent>
            <p>Dies ist ein {size} Modal mit angepasster Größe.</p>
          </ModalContent>
          <ModalFooter>
            <Button onClick={() => setOpen(false)}>
              Schließen
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  },
};

export const ConfirmationModalExample: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);

    return (
      <>
        <Button variant="destructive" onClick={() => setOpen(true)}>
          Element löschen
        </Button>
        <ConfirmationModal
          open={open}
          onOpenChange={setOpen}
          title="Element löschen"
          description="Sind Sie sicher, dass Sie dieses Element unwiderruflich löschen möchten?"
          confirmText="Löschen"
          cancelText="Abbrechen"
          variant="destructive"
          icon="Trash"
          onConfirm={() => {
            console.log('Element gelöscht');
            setOpen(false);
          }}
        />
      </>
    );
  },
};

export const AlertModalExample: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>
          Info anzeigen
        </Button>
        <AlertModal
          open={open}
          onOpenChange={setOpen}
          title="Neue Funktion verfügbar"
          description="Wir haben eine neue Funktion hinzugefügt, die Ihnen bei der Arbeit helfen wird."
          variant="info"
          icon="Info"
          actions={
            <>
              <Button variant="outline" onClick={() => setOpen(false)}>
                Später
              </Button>
              <Button onClick={() => setOpen(false)}>
                Verstanden
              </Button>
            </>
          }
        />
      </>
    );
  },
};

// Popover Stories
export const BasicPopover: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline">
            <Icon name="CogIcon" className="mr-2" />
            Einstellungen
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverHeader title="Einstellungen" />
          <PopoverBody>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="notifications">Benachrichtigungen</Label>
                <Switch id="notifications" />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="dark-mode">Dark Mode</Label>
                <Switch id="dark-mode" />
              </div>
            </div>
          </PopoverBody>
          <PopoverFooter>
            <Button size="sm" onClick={() => setOpen(false)}>
              Speichern
            </Button>
          </PopoverFooter>
        </PopoverContent>
      </Popover>
    );
  },
};

export const PopoverPositions: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);
    const [side, setSide] = React.useState<'top' | 'right' | 'bottom' | 'left'>('bottom');

    return (
      <>
        <div className="flex gap-2 mb-4">
          <Button onClick={() => setSide('top')}>Top</Button>
          <Button onClick={() => setSide('right')}>Right</Button>
          <Button onClick={() => setSide('bottom')}>Bottom</Button>
          <Button onClick={() => setSide('left')}>Left</Button>
        </div>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline">
              Popover öffnen ({side})
            </Button>
          </PopoverTrigger>
          <PopoverContent side={side}>
            <PopoverHeader title={`${side} Popover`} />
            <PopoverBody>
              <p>Dieser Popover erscheint auf der {side} Seite.</p>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </>
    );
  },
};

export const InfoPopoverExample: Story = {
  render: () => {
    return (
      <InfoPopover
        title="Hilfe"
        content="Dies ist ein hilfreicher Text, der zusätzliche Informationen bereitstellt."
        variant="card"
        actions={
          <Button size="sm">
            Mehr erfahren
          </Button>
        }
      />
    );
  },
};

export const MenuPopoverExample: Story = {
  render: () => {
    return (
      <MenuPopover>
        <div className="space-y-1">
          <Button variant="ghost" size="sm" className="w-full justify-start">
            <Icon name="CheckIcon" className="mr-2" />
            Bearbeiten
          </Button>
          <Button variant="ghost" size="sm" className="w-full justify-start">
            <Icon name="PlusIcon" className="mr-2" />
            Kopieren
          </Button>
          <Button variant="ghost" size="sm" className="w-full justify-start text-destructive">
            <Icon name="XMarkIcon" className="mr-2" />
            Löschen
          </Button>
        </div>
      </MenuPopover>
    );
  },
};

// Tooltip Stories
export const BasicTooltip: Story = {
  render: () => {
    return (
      <div className="flex gap-4">
        <Tooltip content="Dies ist ein einfacher Tooltip">
          <Button>Hover für Tooltip</Button>
        </Tooltip>
        <InfoTooltip content="Zusätzliche Informationen über dieses Element" />
        <HelpTooltip content="Hilfe und Anleitung für diese Funktion" />
      </div>
    );
  },
};

export const TooltipPositions: Story = {
  render: () => {
    return (
      <div className="grid grid-cols-2 gap-8">
        <div className="text-center">
          <Tooltip content="Top Tooltip" side="top">
            <Button>Top</Button>
          </Tooltip>
        </div>
        <div className="text-center">
          <Tooltip content="Right Tooltip" side="right">
            <Button>Right</Button>
          </Tooltip>
        </div>
        <div className="text-center">
          <Tooltip content="Bottom Tooltip" side="bottom">
            <Button>Bottom</Button>
          </Tooltip>
        </div>
        <div className="text-center">
          <Tooltip content="Left Tooltip" side="left">
            <Button>Left</Button>
          </Tooltip>
        </div>
      </div>
    );
  },
};

export const TextTooltipExample: Story = {
  render: () => {
    return (
      <div className="space-y-4">
        <TextTooltip content="Dies ist ein Tooltip für Text">
          <span className="text-blue-600 cursor-help">Hover für mehr Info</span>
        </TextTooltip>
        <br />
        <TextTooltip content="Ein weiterer Text-Tooltip" variant="info">
          <span className="text-green-600 cursor-help">Erfolgreich</span>
        </TextTooltip>
      </div>
    );
  },
};

export const IconTooltipExample: Story = {
  render: () => {
    return (
      <div className="flex gap-4">
        <IconTooltip 
          icon="Info" 
          content="Informations-Tooltip" 
          variant="info"
        />
        <IconTooltip 
          icon="HelpCircle" 
          content="Hilfe-Tooltip" 
          variant="help"
        />
        <IconTooltip 
          icon="AlertCircle" 
          content="Warnung-Tooltip" 
          variant="default"
        />
      </div>
    );
  },
};

// Drawer Stories
export const SideDrawerExample: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>
          Side Drawer öffnen
        </Button>
        <SideDrawer
          open={open}
          onOpenChange={setOpen}
          side="right"
          title="Seitenleiste"
          description="Eine Seitenleiste mit Inhalten"
        >
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Karte 1</CardTitle>
                <CardDescription>Beschreibung der ersten Karte</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Inhalt der ersten Karte</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Karte 2</CardTitle>
                <CardDescription>Beschreibung der zweiten Karte</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Inhalt der zweiten Karte</p>
              </CardContent>
            </Card>
          </div>
        </SideDrawer>
      </>
    );
  },
};

export const BottomDrawerExample: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>
          Bottom Drawer öffnen
        </Button>
        <BottomDrawer
          open={open}
          onOpenChange={setOpen}
          title="Mobile Menu"
          description="Ein mobiles Menü von unten"
        >
          <div className="space-y-4">
            <Button variant="ghost" className="w-full justify-start">
              <Icon name="HomeIcon" className="mr-2" />
              Startseite
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Icon name="UserIcon" className="mr-2" />
              Profil
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Icon name="CogIcon" className="mr-2" />
              Einstellungen
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Icon name="BoltIcon" className="mr-2" />
              Hilfe
            </Button>
          </div>
        </BottomDrawer>
      </>
    );
  },
};

export const NavigationDrawerExample: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>
          Navigation öffnen
        </Button>
        <NavigationDrawer
          open={open}
          onOpenChange={setOpen}
          side="left"
          title="Navigation"
        >
          <div className="space-y-2">
                                <Button variant="ghost" className="w-full justify-start">
                      <Icon name="HomeIcon" className="mr-2" />
                      Dashboard
                    </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Icon name="UserIcon" className="mr-2" />
              Benutzer
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Icon name="CheckIcon" className="mr-2" />
              Dokumente
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Icon name="StarIcon" className="mr-2" />
              Berichte
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Icon name="CogIcon" className="mr-2" />
              Einstellungen
            </Button>
          </div>
        </NavigationDrawer>
      </>
    );
  },
};

export const SettingsDrawerExample: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>
          Einstellungen öffnen
        </Button>
        <SettingsDrawer
          open={open}
          onOpenChange={setOpen}
          side="right"
        >
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="notifications">Benachrichtigungen</Label>
              <Switch id="notifications" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dark-mode">Dark Mode</Label>
              <Switch id="dark-mode" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="language">Sprache</Label>
              <Input id="language" placeholder="Deutsch" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="timezone">Zeitzone</Label>
              <Input id="timezone" placeholder="Europe/Berlin" />
            </div>
          </div>
        </SettingsDrawer>
      </>
    );
  },
};

// Interactive Examples
export const InteractiveOverlaySelector: Story = {
  render: () => {
    const [modalOpen, setModalOpen] = React.useState(false);
    const [popoverOpen, setPopoverOpen] = React.useState(false);
    const [drawerOpen, setDrawerOpen] = React.useState(false);

    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Overlay Komponenten Demo</CardTitle>
            <CardDescription>
              Testen Sie verschiedene Overlay-Komponenten und ihre Interaktionen.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4">
              <Button onClick={() => setModalOpen(true)}>
                <Icon name="CheckIcon" className="mr-2" />
                Modal
              </Button>
              <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
                <PopoverTrigger asChild>
                  <Button variant="outline">
                    <Icon name="EnvelopeIcon" className="mr-2" />
                    Popover
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <PopoverHeader title="Popover Demo" />
                  <PopoverBody>
                    <p>Dies ist ein interaktiver Popover mit Inhalten.</p>
                  </PopoverBody>
                </PopoverContent>
              </Popover>
              <Tooltip content="Ein Tooltip mit zusätzlichen Informationen">
                <Button variant="outline">
                  <Icon name="BoltIcon" className="mr-2" />
                  Tooltip
                </Button>
              </Tooltip>
              <Button onClick={() => setDrawerOpen(true)}>
                <Icon name="Bars3Icon" className="mr-2" />
                Drawer
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Modal */}
        <Modal open={modalOpen} onOpenChange={setModalOpen}>
          <ModalHeader title="Interaktives Modal" description="Ein Modal mit verschiedenen Inhalten." />
          <ModalContent>
            <div className="space-y-4">
              <p>Dies ist ein interaktives Modal mit verschiedenen Komponenten.</p>
              <Input placeholder="Eingabe im Modal" />
              <div className="flex items-center space-x-2">
                <Switch id="modal-switch" />
                <Label htmlFor="modal-switch">Option im Modal</Label>
              </div>
            </div>
          </ModalContent>
          <ModalFooter>
            <Button variant="outline" onClick={() => setModalOpen(false)}>
              Abbrechen
            </Button>
            <Button onClick={() => setModalOpen(false)}>
              Speichern
            </Button>
          </ModalFooter>
        </Modal>

        {/* Drawer */}
        <SideDrawer
          open={drawerOpen}
          onOpenChange={setDrawerOpen}
          side="right"
          title="Interaktiver Drawer"
          description="Ein Drawer mit verschiedenen Komponenten"
        >
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Karte im Drawer</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Dies ist eine Karte innerhalb des Drawers.</p>
              </CardContent>
            </Card>
            <div className="space-y-2">
              <Label htmlFor="drawer-input">Eingabe</Label>
              <Input id="drawer-input" placeholder="Text eingeben" />
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="drawer-switch" />
              <Label htmlFor="drawer-switch">Option</Label>
            </div>
          </div>
        </SideDrawer>
      </div>
    );
  },
};

export const OverlayGallery: Story = {
  render: () => {
    return (
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-semibold mb-4">Modal Varianten</h3>
          <div className="flex gap-2">
            <ConfirmationModal
              title="Bestätigung"
              description="Sind Sie sicher?"
              confirmText="Ja"
              cancelText="Nein"
              variant="default"
            />
            <ConfirmationModal
              title="Löschen"
              description="Element unwiderruflich löschen?"
              confirmText="Löschen"
              cancelText="Abbrechen"
              variant="destructive"
            />
            <ConfirmationModal
              title="Warnung"
              description="Diese Aktion kann nicht rückgängig gemacht werden."
              confirmText="Fortfahren"
              cancelText="Abbrechen"
              variant="warning"
            />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Tooltip Varianten</h3>
          <div className="flex gap-4">
            <InfoTooltip content="Informations-Tooltip" />
            <HelpTooltip content="Hilfe-Tooltip" />
            <TextTooltip content="Text-Tooltip">Hover Text</TextTooltip>
            <IconTooltip icon="AlertCircle" content="Warnung-Tooltip" />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Popover Varianten</h3>
          <div className="flex gap-4">
            <InfoPopover
              title="Info"
              content="Ein Informations-Popover"
              variant="default"
            />
            <MenuPopover variant="card">
              <div className="space-y-1">
                <Button variant="ghost" size="sm" className="w-full justify-start">
                  Option 1
                </Button>
                <Button variant="ghost" size="sm" className="w-full justify-start">
                  Option 2
                </Button>
              </div>
            </MenuPopover>
          </div>
        </div>
      </div>
    );
  },
};
