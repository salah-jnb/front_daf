# 🚀 Quick Start - Admin Dashboard

## One-Minute Setup

### 1️⃣ Backend
```bash
cd JavBackend-main
mvn spring-boot:run
# ✅ Backend ready on http://localhost:9090
```

### 2️⃣ Frontend
```bash
cd prism-voyage-tech-main
npm install && npm run dev
# ✅ Frontend ready on http://localhost:5173
```

### 3️⃣ Access Dashboard
Open: **`http://localhost:5173/da`**

**Done!** 🎉

---

## 📍 Dashboard Routes

| Link | Page |
|------|------|
| `/da/contacts` | View all incoming contacts |
| `/da/offices` | Manage offices (create, edit, delete) |
| `/da/general-info` | Edit company information |
| `/da/sponsors` | Upload sponsor logos |
| `/da/content-blocks` | Create content blocks with images |

---

## 💡 Use Dashboard Data in Website

```typescript
import { apiClient } from '@/lib/api';

// Get sponsors
const sponsors = await apiClient.sponsors.getAll();

// Get content blocks
const blocks = await apiClient.blocks.getAll();

// Get company info
const info = await apiClient.information.getById(1);
```

See `src/dashboard/EXAMPLES.tsx` for more examples.

---

## 📖 Full Documentation

- **Setup Guide:** `DASHBOARD_SETUP.md`
- **Quick Start:** `DASHBOARD_INTEGRATION.md`
- **Architecture:** `ARCHITECTURE.md`
- **Testing:** `TESTING.md`
- **Complete Summary:** `INTEGRATION_SUMMARY.md`

---

## ⚙️ Environment Setup (Optional)

Create `.env.local`:
```env
VITE_API_URL=http://localhost:9090
```

Default already works if backend is on port 9090.

---

## 🎯 What You Can Do

✅ Create/Edit/Delete offices  
✅ View and manage contacts  
✅ Upload sponsor logos  
✅ Create content blocks with images  
✅ Edit company information  
✅ Display all data on your website automatically  

---

**All data from dashboard displays dynamically on your website!**

→ Open `DASHBOARD_SETUP.md` for complete guide
