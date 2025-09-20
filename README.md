# PRISMORA v2 - Standalone Storybook

Eine vollständig unabhängige Storybook-Instanz mit allen PRISMORA-Komponenten, losgelöst vom Hauptprojekt.

## 🎯 Was ist PRISMORA v2?

PRISMORA v2 ist eine eigenständige Version des PRISMORA Design Systems, die ausschließlich als Storybook-Komponenten-Bibliothek fungiert. Sie enthält alle UI-Komponenten und Board-Komponenten aus dem Hauptprojekt, ist aber vollständig unabhängig und kann separat entwickelt und deployed werden.

## ✨ Features

- **🎨 Vollständiges Design System** - Alle UI-Komponenten aus PRISMORA
- **🖼️ Board-Komponenten** - PrismionCard, ConnectorEdge, BoardCanvas etc.
- **📚 Storybook 8.6.14** - Modernste Komponenten-Dokumentation mit Vite
- **🎭 Dark Mode Support** - Vollständige Theme-Unterstützung
- **🔧 TypeScript** - Vollständige Typisierung
- **🎨 Tailwind CSS** - PRISMORA Brand Design
- **🐳 Docker Support** - Containerisierte Entwicklung

## 🚀 Quick Start

### Lokale Entwicklung

```bash
# Dependencies installieren
npm install

# Storybook starten (Port 8006)
npm run storybook

# Oder mit Docker
docker-compose up -d
```

### Verfügbare URLs

- **Storybook (Lokal)**: http://localhost:8006
- **Storybook (Docker)**: http://localhost:8006

## 📦 Enthaltene Komponenten

### UI-Komponenten
- **Basic**: Button, Input, Textarea, Select, Checkbox, Radio, Switch
- **Layout**: Container, Grid, Stack, Divider, Spacer, Card
- **Navigation**: Tabs, Breadcrumb, Pagination
- **Feedback**: Alert, Badge, Progress, Toast
- **Data Display**: Table, Avatar, Tag
- **Overlays**: Modal, Popover, Tooltip, Drawer
- **Form**: Label, all input variants
- **Sliders**: Slider, RangeSlider, Slider2D, ZoomSlider

### Board-Komponenten
- **BoardCanvas**: Hauptcanvas mit Pan/Zoom
- **PrismionCard**: Intelligente Karten mit Custom Drag & Drop
- **ConnectorEdge**: Pathfinding-basierte Verbindungen
- **BoardToolbar**: Board-Aktionen
- **UserToolbar**: User-Management
- **PresenceLayer**: Echtzeit-Kollaboration (UI)
- **UserBadge**: Avatar-System

### Icon-System
- **Vollständig standardisiert**: Alle Icons mit "Icon" Suffix
- **Custom SVG Icons**: Keine externen Dependencies
- **TypeScript Integration**: Vollständige Typisierung

## 🛠️ Development

### Scripts

```bash
# Storybook starten
npm run storybook

# Storybook bauen
npm run build-storybook

# Linting
npm run lint

# Type-Checking
npm run type-check
```

### Docker Commands

```bash
# Container starten
docker-compose up -d

# Container stoppen
docker-compose down

# Logs anzeigen
docker-compose logs -f

# Rebuild
docker-compose up -d --build
```

## 🎨 Design System

### Brand Colors
- **Primary**: #ff432e (PRISMORA Brand Red)
- **Typography**: Poppins (UI), JetBrains Mono (Code)
- **Design**: Super Flat Design mit minimalen Schatten

### CSS Variables
Alle Design-Token sind über CSS-Variablen verfügbar und unterstützen Dark Mode automatisch.

## 📁 Projektstruktur

```
PRISMORA-v2/
├── .storybook/              # Storybook-Konfiguration
├── src/
│   ├── components/
│   │   ├── ui/             # UI-Komponenten
│   │   └── board/          # Board-Komponenten
│   ├── lib/                # Utilities
│   ├── styles/             # Globale Styles
│   ├── types/              # TypeScript-Typen
│   └── stores/             # Zustand Stores
├── stories/                # Storybook Stories
├── docker-compose.yml      # Docker-Konfiguration
└── package.json           # Dependencies
```

## 🔧 Technische Details

### Dependencies
- **Storybook**: 8.6.14 (Latest Stable)
- **React**: 18.2.0
- **TypeScript**: 5.2.0
- **Tailwind CSS**: 3.3.0
- **Vite**: 5.0.0 (für Storybook-Framework)

### Port
- **8006**: Storybook (sowohl lokal als auch Docker)

## 🎯 Unterschiede zum Hauptprojekt

### Was ist enthalten?
- ✅ Alle UI-Komponenten
- ✅ Alle Board-Komponenten  
- ✅ Vollständiges Design System
- ✅ Storybook-Dokumentation
- ✅ TypeScript-Typen
- ✅ Utilities und Stores

### Was ist NICHT enthalten?
- ❌ Next.js App (verwendet Vite + Storybook)
- ❌ API Routes
- ❌ Datenbank-Integration
- ❌ Authentication
- ❌ Server-seitige Logik

## 🚀 Deployment

### Storybook bauen
```bash
npm run build-storybook
```

Die statischen Dateien werden in `storybook-static/` erstellt und können auf jedem Static-Hosting-Service deployed werden.

### Docker Production
```bash
docker build -t prismora-v2:latest .
docker run -p 8006:8006 prismora-v2:latest
```

## 🤝 Contributing

1. **Komponente ändern**: Bearbeite Dateien in `src/components/`
2. **Story aktualisieren**: Entsprechende `.stories.tsx` Datei anpassen
3. **Storybook testen**: `npm run storybook`
4. **Build testen**: `npm run build-storybook`

### Guidelines
- **Alle Icon-Namen mit "Icon" Suffix**
- **TypeScript für alle Komponenten**
- **Storybook Stories für neue Komponenten**
- **PRISMORA Design System befolgen**

## 📄 Lizenz

Dieses Projekt ist Teil der PRISMORA-Entwicklung der UDG.

---

**PRISMORA v2** - Standalone Component Library 🎨

**Version**: 2.0.0  
**Letzte Aktualisierung**: Dezember 2024  
**Status**: Vollständig unabhängig vom Hauptprojekt
