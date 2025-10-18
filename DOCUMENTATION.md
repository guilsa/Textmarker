# Application Architecture

This document provides a high-level overview of the application's architecture, including the data flow and UI component hierarchy.

## Data Flow

The following diagram illustrates how data flows through the application:

```mermaid
graph TD
    subgraph Browser
        A[Browser Action]
        F[Content Scripts]
    end
    subgraph Background
        B{background/main.js}
    end
    subgraph Data
        C{utils/store.js}
        D[Local Storage]
        E[Sync Storage]
    end

    A --> B;
    F --> B;
    B --> C;
    C --> D;
    C --> E;
```

## UI Component Hierarchy

The following diagram illustrates the UI component hierarchy:

```mermaid
graph TD
    subgraph "UI Entry Points"
        A[Browser Action Popup]
        B[Sidebar]
        C[Options UI]
        D[Detail View]
    end
```
