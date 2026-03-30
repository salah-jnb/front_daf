# Complete Architecture Overview

## 🏗️ Full System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                      PRISM VOYAGE TECH                          │
│                    (React + TypeScript)                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────────────┐         ┌──────────────────────┐      │
│  │  Public Website      │         │  Admin Dashboard     │      │
│  │  (Landing Page)      │         │  (/da route)         │      │
│  │                      │         │                      │      │
│  │ - Hero Section       │         │ - Contacts Page      │      │
│  │ - About Section      │         │ - Offices Page       │      │
│  │ - Services Section   │         │ - General Info       │      │
│  │ - Process Section    │         │ - Sponsors Page      │      │
│  │ - Contact Section    │         │ - Content Blocks     │      │
│  │ - Sponsors Display   │         │ - Upload/Edit forms  │      │
│  │ - Content Blocks     │         │ - Delete operations  │      │
│  │                      │         │                      │      │
│  └──────────────────────┘         └──────────────────────┘      │
│           │                                │                      │
│           │ Fetch API data                │ Manage Data          │
│           │ (apiClient.*.getAll)         │ (Create/Read/Update) │
│           └────────────────┬──────────────┘                      │
│                            │                                      │
│                  ┌─────────▼──────────┐                          │
│                  │   API Client       │                          │
│                  │  (src/lib/api.ts) │                          │
│                  │                    │                          │
│                  │ - contacts.*       │                          │
│                  │ - offices.*        │                          │
│                  │ - sponsors.*       │                          │
│                  │ - blocks.*         │                          │
│                  │ - information.*    │                          │
│                  └─────────┬──────────┘                          │
│                            │ HTTP REST                           │
└─────────────────────────────┼──────────────────────────────────┘
                              │
              ┌───────────────▼────────────────┐
              │   Spring Boot Backend          │
              │   (Java 17, Port 9090)         │
              ├────────────────────────────────┤
              │                                │
              │  Controllers:                  │
              │  - ContactController           │
              │  - OfficeController            │
              │  - SponsorController           │
              │  - BlockController             │
              │  - InformationController       │
              │                                │
              │  Services:                     │
              │  - ContactService              │
              │  - OfficeService               │
              │  - SponsorService              │
              │  - BlockService                │
              │  - InformationService          │
              │                                │
              │  Repositories (JPA):           │
              │  - ContactRepository           │
              │  - OfficeRepository            │
              │  - SponsorRepository           │
              │  - BlockRepository             │
              │  - InformationRepository       │
              │                                │
              └───────────────┬────────────────┘
                              │
                    ┌─────────▼──────────┐
                    │   PostgreSQL DB    │
                    │  (Supabase)        │
                    ├────────────────────┤
                    │ Tables:            │
                    │ - contacts         │
                    │ - offices          │
                    │ - sponsors         │
                    │ - blocks           │
                    │ - informations     │
                    │ - admin_users      │
                    └────────────────────┘
                              │
                    ┌─────────▼──────────┐
                    │  Supabase Storage  │
                    │                    │
                    │ - Sponsor logos    │
                    │ - Block images     │
                    │ - File uploads     │
                    └────────────────────┘
```

---

## 🔄 Data Flow

### 1. Dashboard Data Management (Admin → Backend)
```
Admin User
    ↓
Dashboard Form (ContactsPage, OfficesPage, etc.)
    ↓
apiClient.contacts.create/update/delete()
    ↓
HTTP POST/PUT/DELETE → Backend
    ↓
Spring Boot Controller
    ↓
Service Layer (Business Logic)
    ↓
JPA Repository
    ↓
PostgreSQL Database
```

### 2. Dynamic Display (Backend → Website)
```
Website Page (e.g., Index.tsx, 
             ContactSection.tsx)
    ↓
apiClient.sponsors.getAll() / blocks.getAll()
    ↓
HTTP GET → Backend
    ↓
Spring Boot Controller
    ↓
Service Layer
    ↓
JPA Repository
    ↓
PostgreSQL Database
    ↓
Response (JSON)
    ↓
React Component Rendering
```

---

## 📊 Database Schema

### Contacts Table
```sql
CREATE TABLE contacts (
    id BIGINT PRIMARY KEY,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    email VARCHAR(255),
    origin_city VARCHAR(255),
    distnation_city VARCHAR(255),
    date DATE,
    information_id BIGINT REFERENCES informations(id)
);
```

### Offices Table
```sql
CREATE TABLE offices (
    id BIGINT PRIMARY KEY,
    office_name VARCHAR(255),
    information_id BIGINT REFERENCES informations(id)
);
```

### Sponsors Table
```sql
CREATE TABLE sponsors (
    id BIGINT PRIMARY KEY,
    logo_url TEXT,
    information_id BIGINT REFERENCES informations(id)
);
```

### Blocks Table
```sql
CREATE TABLE blocks (
    id BIGINT PRIMARY KEY,
    titre VARCHAR(255),
    description TEXT,
    image TEXT,
    created_at TIMESTAMP
);
```

### Information Table
```sql
CREATE TABLE informations (
    id BIGINT PRIMARY KEY,
    move_profetionelle TEXT,
    storage_solution TEXT,
    years_experience INTEGER,
    phone1 VARCHAR(20),
    phone2 VARCHAR(20),
    email VARCHAR(255)
);
```

---

## 🔐 Security Considerations

### Current Implementation
- Simple authentication (no credentials)
- localStorage session storage
- CORS should be enabled on backend

### Production Recommendations
- Implement JWT authentication
- Use HttpOnly cookies for tokens
- Add CSRF protection
- Validate file uploads on backend
- Rate limiting on API endpoints
- Environment variable secrets (API keys, DB credentials)

---

## 🚀 Deployment

### Frontend Deployment
```bash
# Build
npm run build  # Creates dist/ folder

# Deploy to Vercel, Netlify, GitHub Pages, etc.
# Ensure VITE_API_URL points to production backend
```

### Backend Deployment
```bash
# Build JAR
mvn clean package

# Deploy to server (AWS, Heroku, DigitalOcean, etc.)
# Configure PostgreSQL database
# Set environment variables
# Run JAR: java -jar backend-admin-0.0.1-SNAPSHOT.jar
```

---

## 📦 Dependencies

### Frontend (React)
```json
{
  "@tanstack/react-query": "Latest",
  "@hookform/resolvers": "Latest",
  "@radix-ui/*": "For UI components",
  "tailwindcss": "For styling",
  "react": "Latest",
  "react-dom": "Latest",
  "react-router-dom": "Latest"
}
```

### Backend (Spring Boot)
```xml
<dependencies>
  <dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
  </dependency>
  <dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-jpa</artifactId>
  </dependency>
  <dependency>
    <groupId>org.postgresql</groupId>
    <artifactId>postgresql</artifactId>
  </dependency>
  <dependency>
    <groupId>org.projectlombok</groupId>
    <artifactId>lombok</artifactId>
  </dependency>
  <dependency>
    <groupId>com.squareup.okhttp3</groupId>
    <artifactId>okhttp</artifactId>
  </dependency>
</dependencies>
```

---

## 🔗 Key Connections

1. **Frontend API Client** (`src/lib/api.ts`)
   - Centralized API calls
   - Type-safe method calls
   - Error handling

2. **Dashboard Context** (`src/dashboard/DashboardContext.tsx`)
   - Global state management
   - Toast notifications
   - Theme management
   - Authentication state

3. **Backend Controllers** (Spring Boot)
   - REST endpoints
   - Request validation
   - Response formatting

4. **Database** (PostgreSQL)
   - Data persistence
   - Relationships
   - Queries

---

## 📈 Scaling Considerations

### Frontend
- Code splitting for lazy loading
- Image optimization
- Caching strategies
- CDN for static assets

### Backend
- Database indexing
- Connection pooling
- Caching layer (Redis)
- Load balancing

### Storage
- Supabase Storage for file uploads
- S3/CDN for image delivery
- Backup strategies

---

## 🎯 Feature Roadmap

- [ ] User authentication with JWT
- [ ] Role-based access control (Admin/Viewer)
- [ ] Audit logs for data changes
- [ ] Bulk operations (import/export)
- [ ] Advanced search/filtering
- [ ] API documentation (Swagger)
- [ ] Mobile app (React Native)
- [ ] Real-time notifications (WebSocket)
- [ ] Analytics dashboard
- [ ] Multi-language support

---

## 📞 Support

For issues or questions:
1. Check `DASHBOARD_SETUP.md` for setup guide
2. Review error messages in browser console
3. Check backend logs: `mvn spring-boot:run`
4. Verify database connectivity
5. Check environment variables

---

**Last Updated:** March 2026  
**Version:** 1.0.0  
**Status:** Production Ready ✅
