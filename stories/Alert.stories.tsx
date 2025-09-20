import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Alert, AlertTitle, AlertDescription, AlertWithIcon } from '@/components/ui/alert';
import { AlertCircle, CheckCircle, Info as InfoIcon, XCircle, X } from 'lucide-react';

const meta: Meta<typeof Alert> = {
  title: 'Feedback/Alert',
  component: Alert,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Alert-Komponenten für Benachrichtigungen und Feedback mit verschiedenen Varianten, Größen und Icons.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'destructive', 'success', 'warning', 'info', 'prismora'],
      description: 'Die visuelle Variante der Alert',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'default', 'lg'],
      description: 'Die Größe der Alert',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Alert>
      <AlertTitle>Standard Alert</AlertTitle>
      <AlertDescription>
        Dies ist eine Standard-Alert mit Titel und Beschreibung.
      </AlertDescription>
    </Alert>
  ),
};

export const Success: Story = {
  render: () => (
    <Alert variant="success">
      <CheckCircle className="h-4 w-4" />
      <AlertTitle>Erfolgreich!</AlertTitle>
      <AlertDescription>
        Ihre Aktion wurde erfolgreich ausgeführt.
      </AlertDescription>
    </Alert>
  ),
};

export const Warning: Story = {
  render: () => (
    <Alert variant="warning">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Warnung</AlertTitle>
      <AlertDescription>
        Bitte überprüfen Sie Ihre Eingaben bevor Sie fortfahren.
      </AlertDescription>
    </Alert>
  ),
};

export const Destructive: Story = {
  render: () => (
    <Alert variant="destructive">
      <XCircle className="h-4 w-4" />
      <AlertTitle>Fehler</AlertTitle>
      <AlertDescription>
        Es ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.
      </AlertDescription>
    </Alert>
  ),
};

export const Info: Story = {
  render: () => (
    <Alert variant="info">
      <InfoIcon className="h-4 w-4" />
      <AlertTitle>Information</AlertTitle>
      <AlertDescription>
        Hier finden Sie wichtige Informationen zu diesem Feature.
      </AlertDescription>
    </Alert>
  ),
};

export const Prismora: Story = {
  render: () => (
    <Alert variant="prismora">
      <InfoIcon className="h-4 w-4" />
      <AlertTitle>PRISMORA Brand</AlertTitle>
      <AlertDescription>
        Dies ist eine Alert mit der PRISMORA Brand-Farbe.
      </AlertDescription>
    </Alert>
  ),
};

export const Dismissible: Story = {
  render: () => (
    <AlertWithIcon
      variant="info"
      title="Schließbare Alert"
      description="Diese Alert kann durch Klicken auf das X-Symbol geschlossen werden."
      dismissible
      onDismiss={() => alert('Alert wurde geschlossen!')}
    />
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4">
      <Alert size="sm">
        <AlertTitle>Kleine Alert</AlertTitle>
        <AlertDescription>Kompakte Darstellung für weniger wichtige Nachrichten.</AlertDescription>
      </Alert>
      
      <Alert size="default">
        <AlertTitle>Standard Alert</AlertTitle>
        <AlertDescription>Normale Größe für die meisten Anwendungsfälle.</AlertDescription>
      </Alert>
      
      <Alert size="lg">
        <AlertTitle>Große Alert</AlertTitle>
        <AlertDescription>Hervorgehobene Darstellung für wichtige Nachrichten.</AlertDescription>
      </Alert>
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <Alert variant="default">
        <AlertTitle>Default</AlertTitle>
        <AlertDescription>Standard-Alert ohne spezielle Bedeutung.</AlertDescription>
      </Alert>
      
      <Alert variant="success">
        <CheckCircle className="h-4 w-4" />
        <AlertTitle>Success</AlertTitle>
        <AlertDescription>Erfolgreiche Aktion oder positive Rückmeldung.</AlertDescription>
      </Alert>
      
      <Alert variant="warning">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Warning</AlertTitle>
        <AlertDescription>Warnung oder Hinweis auf mögliche Probleme.</AlertDescription>
      </Alert>
      
      <Alert variant="destructive">
        <XCircle className="h-4 w-4" />
        <AlertTitle>Destructive</AlertTitle>
        <AlertDescription>Fehler oder kritische Probleme.</AlertDescription>
      </Alert>
      
      <Alert variant="info">
        <InfoIcon className="h-4 w-4" />
        <AlertTitle>Info</AlertTitle>
        <AlertDescription>Informative Nachrichten oder Hinweise.</AlertDescription>
      </Alert>
      
      <Alert variant="prismora">
        <InfoIcon className="h-4 w-4" />
        <AlertTitle>PRISMORA</AlertTitle>
        <AlertDescription>Brand-spezifische Nachrichten.</AlertDescription>
      </Alert>
    </div>
  ),
};

export const WithCustomIcon: Story = {
  render: () => (
    <div className="space-y-4">
      <AlertWithIcon
        variant="success"
        title="Custom Icon"
        description="Alert mit einem benutzerdefinierten Icon."
        icon={CheckCircle}
      />
      
      <AlertWithIcon
        variant="warning"
        title="Another Custom Icon"
        description="Weitere Alert mit benutzerdefiniertem Icon."
        icon={AlertCircle}
      />
    </div>
  ),
};

export const WithoutIcon: Story = {
  render: () => (
    <Alert>
      <AlertTitle>Ohne Icon</AlertTitle>
      <AlertDescription>
        Diese Alert hat kein Icon und verwendet nur Text.
      </AlertDescription>
    </Alert>
  ),
};

export const LongContent: Story = {
  render: () => (
    <Alert variant="info">
      <InfoIcon className="h-4 w-4" />
      <AlertTitle>Längerer Titel für Demonstration</AlertTitle>
      <AlertDescription>
        Dies ist eine sehr lange Beschreibung, die zeigt, wie sich die Alert-Komponente 
        bei umfangreicherem Inhalt verhält. Der Text kann mehrere Zeilen umfassen und 
        die Komponente passt sich entsprechend an.
      </AlertDescription>
    </Alert>
  ),
};

export const InteractiveExample: Story = {
  render: () => {
    const [alerts, setAlerts] = useState([
      { id: 1, variant: 'success', title: 'Erfolgreich', description: 'Aktion abgeschlossen' },
      { id: 2, variant: 'warning', title: 'Warnung', description: 'Bitte überprüfen Sie die Eingaben' },
      { id: 3, variant: 'info', title: 'Info', description: 'Neue Funktionen verfügbar' },
    ]);

    const removeAlert = (id: number) => {
      setAlerts(alerts.filter(alert => alert.id !== id));
    };

    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold mb-4">Interaktive Alerts</h3>
        {alerts.map((alert) => (
          <AlertWithIcon
            key={alert.id}
            variant={alert.variant as any}
            title={alert.title}
            description={alert.description}
            dismissible
            onDismiss={() => removeAlert(alert.id)}
          />
        ))}
        {alerts.length === 0 && (
          <p className="text-muted-foreground text-center">Alle Alerts wurden geschlossen</p>
        )}
      </div>
    );
  },
};
