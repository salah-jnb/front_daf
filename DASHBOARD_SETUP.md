# Admin Dashboard Integration Guide

## 📋 Overview

The admin dashboard has been integrated into the prism-voyage-tech project at the route `/da`. It allows management of:

- **Contacts** - Manage incoming contact requests
- **Offices** - CRUD operations for offices/branches
- **General Info** - Manage company information and contact details
- **Sponsors** - Upload and manage sponsor logos
- **Content Blocks** - Create and manage content blocks with images

## 🚀 Quick Start

### 1. Setup Environment Variables

Create a `.env` file in the root of `prism-voyage-tech-main`:

```env
VITE_API_URL=http://localhost:9090
```

The default value is `http://localhost:9090`, which is the Spring Boot backend port.

### 2. Start the Backend (Spring Boot)

From `JavBackend-main/`:

```bash
mvn spring-boot:run
```

Or build and run:

```bash
mvn clean build
java -jar target/admin-0.0.1-SNAPSHOT.jar
```

Verify it's running at `http://localhost:9090`

### 3. Start the Frontend

From `prism-voyage-tech-main/`:

```bash
npm install
npm run dev
```

### 4. Access the Dashboard

Open `http://localhost:5173/da` in your browser.

## 🔐 Authentication

The dashboard has a simple authentication layer:

- No credentials configured by default
- Click "Login" button to access the dashboard
- Session is stored in `localStorage` under `dash_authenticated`

For production, you should implement proper JWT authentication or OAuth2 integration with the backend.

## 📱 Dashboard Pages

### Contacts (`/da/contacts`)
- View all incoming contacts
- Search by name, email, or city
- View contact details
- Delete contacts

**Backend API**: `GET /contacts`, `DELETE /contacts/{id}`

### Offices (`/da/offices`)
- List all offices
- Create new office
- Edit office name
- Delete office

**Backend APIs**:
- `GET /offices`
- `POST /offices`
- `PUT /offices/{id}`
- `DELETE /offices/{id}`

### General Info (`/da/general-info`)
- Edit company professional movement
- Edit storage solution description
- Manage years of experience
- Update contact information (email, phone)

**Backend APIs**:
- `GET /informations/{id}`
- `PUT /informations/{id}`

### Sponsors (`/da/sponsors`)
- Upload sponsor logos (drag & drop or click)
- View all sponsor logos
- Delete sponsors

**Backend APIs**:
- `GET /sponsors`
- `DELETE /sponsors/{id}`
- `POST /informations/{id}/sponsors/upload` (File upload)

### Content Blocks (`/da/content-blocks`)
- Create content blocks with title, description, and image
- Edit existing blocks
- Delete blocks
- Image upload support

**Backend APIs**:
- `GET /blocks`
- `POST /blocks` (Multipart form data)
- `PUT /blocks/{id}` (Multipart form data)
- `DELETE /blocks/{id}`

## 🔀 Dynamic Display in Frontend

All data managed through the dashboard is automatically available via APIs:

```typescript
import { apiClient } from '@/lib/api';

// Get contacts
const contacts = await apiClient.contacts.getAll();

// Get sponsors
const sponsors = await apiClient.sponsors.getAll();

// Get content blocks
const blocks = await apiClient.blocks.getAll();

// Get general information
const info = await apiClient.information.getById(1);
```

Use these API calls in your main website pages to display dashboard-managed data dynamically.

## 🎨 Styling

The dashboard uses **Tailwind CSS** for styling, matching the main project's design system. Components are built with:

- Custom Tailwind classes
- Responsive grid layouts
- Dark/light theme support
- Modal dialogs
- Toast notifications

## 📁 Project Structure

```
src/dashboard/
├── Dashboard.tsx              # Main dashboard layout
├── DashboardContext.tsx       # Global state management
├── DashboardToast.tsx         # Toast notification component
├── Sidebar.tsx                # Navigation sidebar
├── Topbar.tsx                 # Top navigation bar
└── pages/
    ├── ContactsPage.tsx       # Contacts management
    ├── OfficesPage.tsx        # Offices management
    ├── GeneralInfoPage.tsx    # General info management
    ├── SponsorsPage.tsx       # Sponsors management
    └── ContentBlocksPage.tsx  # Content blocks management

src/lib/
└── api.ts                     # API client for backend calls
```

## 🔧 Customization

### Change Dashboard Route

To change the route from `/da` to something else, edit `src/App.tsx`:

```typescript
// Change from:
<Route path="/da/*" element={<Dashboard />} />

// To your preferred route:
<Route path="/admin/*" element={<Dashboard />} />
```

### Add New Dashboard Pages

1. Create a new page component in `src/dashboard/pages/`
2. Add the API endpoints in `src/lib/api.ts`
3. Add the route in `src/dashboard/Dashboard.tsx`
4. Add the navigation link in `src/dashboard/Sidebar.tsx`

### Backend API Configuration

If your backend is running on a different host/port, update the `VITE_API_URL` environment variable:

```env
VITE_API_URL=https://api.example.com
```

## 🐛 Troubleshooting

### "Failed to load contacts" error
- Ensure the Spring Boot backend is running on the configured port
- Check the `VITE_API_URL` environment variable
- Verify CORS is enabled in the backend (if needed)

### Images not uploading to Sponsors
- Ensure the Supabase storage bucket is configured correctly in the backend
- Check that `SUPABASE_SERVICE_ROLE_KEY` is set in the backend's environment

### Theme not persisting
- Theme preference is stored in `localStorage` under `dash_theme`
- Check browser's local storage settings

## 📚 Related Files

- Backend: `JavBackend-main/src/main/java/backend/admin/`
- API Configuration: `src/lib/api.ts`
- Dashboard Context: `src/dashboard/DashboardContext.tsx`

## 🔗 API Documentation

For more details about backend endpoints, see `JavBackend-main/README.md`

---

**Note**: The dashboard data (contacts, offices, sponsors, blocks, general info) can be fetched and displayed dynamically throughout your website using the `apiClient` utilities.
