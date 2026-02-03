# Admin Panel Development Plan

## Overview
Create a dedicated administrative interface to manage the content and bookings of the Travel Agency application. This will allow dynamic updates to mocking data (in a real app, this would connect to a backend).

## 1. Architecture
- **Route Namespace**: `/admin`
- **Layout**: Dedicated `AdminLayout` (differing from public site).
    - **Sidebar**: Navigation (Dashboard, Flights, Hotels, etc.).
    - **TopBar**: User profile (Admin), Logout.
- **State Management**: Use React Context (`AdminContext`) to manage the "database" of items, initialized from `mockData.js`.

## 2. Folder Structure
```text
src/
  admin/
    components/      # Admin-specific components (Sidebar, Tables, Forms)
    context/         # Admin state context
    layouts/         # AdminLayout
    pages/           # Admin pages
```

## 3. Features & Pages

### Authentication
- **Login Page** (`/admin/login`): Simple hardcoded credential check (e.g., admin/admin).
- **Protected Route Wrapper**: Redirect to login if not authenticated.

### Core Pages
1.  **Dashboard** (`/admin/dashboard`)
    -   Summary Stats (Total Bookings, Revenue, Active Flights).
    -   Quick Actions.
2.  **Manage Flights** (`/admin/flights`)
    -   List existing flight offers.
    -   Add/Edit/Delete flights.
3.  **Manage Hotels** (`/admin/hotels`)
    -   List hotels.
    -   Add/Edit/Delete hotels.
4.  **Manage Bookings** (`/admin/bookings`)
    -   List simulated user bookings.
    -   Update status (Pending -> Confirmed).
5.  **Settings** (`/admin/settings`)
    -   Toggle global site settings.

## 4. Implementation Steps

### Phase 1: Foundation
- [ ] Create `AdminLayout` and sidebar structure.
- [ ] Configure specialized routes in `App.jsx`.
- [ ] Create placeholder pages for Dashboard and Login.

### Phase 2: Data Context
- [ ] Create `AdminProvider` to hold state for flights, hotels, bookings.
- [ ] Replace direct mock data usage in admin components with this Context.

### Phase 3: CRUD Interfaces
- [ ] Build reusable `AdminTable` component.
- [ ] Implement Flight Management (List + Add Form).
- [ ] Implement Hotel Management.

### Phase 4: Integration
- [ ] Link "My Bookings" on client side to data modified in Admin.

### Agent Note
    do not create the admin panel in the frontend folder, create a new app called admin panel. Must follow the styling system and folder structure of the main app.