# ERP BLANCO Frontend

Vue 3 frontend for the ERP BLANCO platform. This SPA provides the public landing experience, staff login flow, and the authenticated ERP dashboard for orders, inventory, customers, users, invoices, warehouses, and reporting views.

## Overview

The frontend is built as a Vue 3 + TypeScript application with a dashboard-style UI powered by Vuetify.

Core stack:

- Vue 3
- TypeScript
- Vite
- Vue Router
- Pinia
- Vuetify
- Axios

## Implemented Features

### Public experience

- Marketing-style landing page
- CTA navigation into the login screen
- Feature cards highlighting core ERP capabilities
- Smooth scrolling sections for features and contact CTA

### Authentication

- Login screen connected to backend auth API
- Guest/admin demo login shortcut
- Token persistence in `localStorage`
- Route guards for protected pages
- Automatic current-user fetch on app load

### App shell and navigation

- Shared dashboard layout with:
  - permanent sidebar
  - top bar
  - routed page content
- Sectioned sidebar navigation for:
  - main dashboard
  - inventory and sales
  - relationships
  - insights and finance
  - system pages
- Dynamic page titles from route metadata
- User name, role, and avatar initials in top bar

### Dashboard

- Dashboard overview page
- KPI stat cards sourced from backend dashboard API
- Manual refresh action
- Summary cards for:
  - orders
  - stock movements
  - invoices
  - customers

### Orders

- Orders listing table
- Order filters via quick chips:
  - all
  - pending
  - approved
  - today
  - bulk quantity
- Create order dialog
- Order approval flow
- Order deletion confirmation flow
- Locale-aware formatting for amounts and dates

### Products

- Product listing table
- Product creation dialog
- Product form with:
  - name
  - price
  - stock quantity
  - category
  - unit

### Stock movements

- Stock movement listing table
- Quick filters for:
  - all
  - stock in
  - stock out
  - adjustment
  - today
  - large quantity
- Stock movement creation dialog
- Product, warehouse, quantity, type, note, and reference fields

### Warehouses

- Warehouse listing table
- Warehouse creation dialog
- Warehouse product drill-down dialog
- Per-warehouse product inventory display

### Customers

- Customer listing table
- Customer creation dialog
- Customer deletion with confirmation dialog
- Display of:
  - contact info
  - company
  - status
  - order totals
  - spending totals

### Users

- User listing table
- User creation dialog
- Role loading before user creation
- Display of assigned roles and verification status

### Invoices

- Invoice listing table
- Filter chips for:
  - all
  - pending
  - paid
  - today
  - high total
- Invoice state badges
- Payment status badges
- Date and currency formatting

### Localization

- Built-in localization messages
- Supported locales:
  - English
  - Arabic
  - French
- Automatic `dir` and `lang` updates on the document
- RTL layout support for Arabic-oriented UI flow
- Localized labels across navigation, forms, dialogs, and views

### Settings

- Language switching UI
- RTL/LTR-aware settings layout
- Theme selection UI for light/dark mode

## Current Frontend Scope

The frontend is already connected to backend APIs for:

- authentication
- current user profile
- users and roles
- customers
- products
- orders
- invoices
- stock movements
- warehouses
- dashboard metrics

The following areas currently appear present but partial:

- Reporting page currently uses placeholder table rows rather than live backend export/report data
- Sidebar includes Payments and Support entries, but there are no dedicated routes/views for them yet
- Theme selection UI exists in Settings, but theme persistence/application is not fully wired

## Pages and Routes

Defined application routes:

- `/home` - public landing page
- `/login` - login page
- `/` - dashboard
- `/orders` - orders
- `/stock-movement` - stock movements
- `/invoices` - invoices
- `/products` - products
- `/warehouses` - warehouses
- `/customers` - customers
- `/users` - users
- `/reporting` - reporting
- `/settings` - settings

## API Integration

The app uses Axios with a shared HTTP client:

- Base URL: `http://localhost:8000/api`
- JSON request headers by default
- Bearer token automatically injected from `localStorage`

Frontend endpoint usage currently includes:

- `/login`
- `/me`
- `/roles`
- `/orders`
- `/orders/{id}/approve`
- `/customers`
- `/users`
- `/products`
- `/stock-movements`
- `/invoices`
- `/warehouses`
- `/productwarehouses/{id}`
- `/reports/dashboard`

## State Management

Pinia stores are used for feature-level state:

- `authStore`
- `dashboardStore`
- `orderStore`
- `productStore`
- `invoiceStore`
- `stockMovementStore`
- `warehouseStore`
- `customerStore`
- `userStore`
- `categoryStore`
- `unitStore`
- `localeStore`

The project also uses:

- services for API access
- composables as view-facing abstractions
- reusable dialogs/forms/table cards for shared UI patterns

## Project Structure

```text
src/
  api/
  components/
    dashboard/
    dialogs/
    filters/
    forms/
    landing/
    layout/
    tables/
  composables/
  localization/
  plugins/
  routes/
  services/
  stores/
  types/
  views/
public/
```

## Getting Started

### Requirements

- Node.js `^20.19.0 || >=22.12.0`
- npm

### Install

```bash
npm install
```

### Development

```bash
npm run dev
```

### Production build

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

### Type check

```bash
npm run type-check
```

## Environment and Backend Notes

The frontend currently expects the backend API at:

```text
http://localhost:8000/api
```

If the backend base URL changes, update:

- `src/api/http.ts`
- `src/api/endpoints.ts`

## Notes

- Auth state is restored from `localStorage` and validated with a `/me` request on startup.
- Locale settings are persisted in the browser and applied to both `document.lang` and `document.dir`.
- The dashboard and management screens are built around reusable table, dialog, and form components.
- The frontend README is based on the implemented code under `Frontend/erp_blanco`.
