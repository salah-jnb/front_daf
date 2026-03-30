# Testing Guide - Dashboard Integration

## ✅ Pre-requisites

- Node.js 16+ installed
- Java 17+ installed
- PostgreSQL or Supabase database configured
- Git for version control

---

## 🧪 Step-by-Step Testing

### Step 1: Setup Environment

#### 1a. Frontend Environment
```bash
cd prism-voyage-tech-main

# Create .env.local
cat > .env.local << EOF
VITE_API_URL=http://localhost:9090
EOF
```

#### 1b. Backend Environment
See `JavBackend-main/` for PostgreSQL and Supabase configuration

---

### Step 2: Start Backend

```bash
cd JavBackend-main

# Check Java version
java -version  # Should be 17+

# Run with Maven
mvn spring-boot:run

# Or build and run JAR
mvn clean package
java -jar target/admin-0.0.1-SNAPSHOT.jar
```

✅ Backend should be running on `http://localhost:9090`

**Verify:**
```bash
curl http://localhost:9090/contacts
# Should return: [] or list of contacts
```

---

### Step 3: Start Frontend

```bash
cd prism-voyage-tech-main

# Install dependencies (first time)
npm install

# Start development server
npm run dev

# Should output:
# VITE v4... ready in 234 ms
# ➜  Local:   http://localhost:5173/
# ➜  press h to show help
```

✅ Frontend should be running on `http://localhost:5173`

---

### Step 4: Test Dashboard Access

#### 4a. Access Dashboard
Open browser: `http://localhost:5173/da`

**Expected:** Dashboard login page or admin interface

#### 4b. Click Login
- If no credentials configured, clicking "Login" should grant access
- Dashboard should now be visible

---

### Step 5: Test Each Dashboard Page

#### 5a. Contacts Page (`/da/contacts`)
```
✓ Page loads
✓ "Total Contacts" stat displays
✓ Contact list appears (or "No contacts yet")
✓ Search box works
✓ Can view contact details
✓ Can delete contacts
```

**Test:**
```bash
# Add test contact via API
curl -X POST http://localhost:9090/contacts \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "originCity": "Paris",
    "distnationCity": "London",
    "date": "2024-01-01"
  }'

# Refresh dashboard - should see contact
```

#### 5b. Offices Page (`/da/offices`)
```
✓ Page loads
✓ "Total Offices" stat displays
✓ Office list appears
✓ "New Office" button works
✓ Can create office (modal opens)
✓ Can edit office
✓ Can delete office (with confirmation)
```

**Test:**
```bash
# Create office via dashboard
# 1. Click "New Office" button
# 2. Enter office name: "Paris Office"
# 3. Click "Create"
# 4. Should see success toast
# 5. Office appears in list
```

#### 5c. General Info Page (`/da/general-info`)
```
✓ Page loads
✓ Form fields populate (or are empty)
✓ Can edit all fields
✓ "Save Changes" button works
✓ Success message appears
```

**Test:**
```bash
# Fill in information
# 1. Enter "Professional Movement" text
# 2. Enter "Storage Solution" text
# 3. Enter "Years of Experience": 10
# 4. Fill contact info (email, phone)
# 5. Click "Save Changes"
# 6. Refresh page - data persists
```

#### 5d. Sponsors Page (`/da/sponsors`)
```
✓ Page loads
✓ Upload area visible (drag & drop)
✓ Can select image file
✓ Image uploads (progress shows)
✓ Sponsor appears in grid
✓ Can delete sponsor
```

**Test:**
```bash
# 1. Prepare small image file (logo.png)
# 2. Drag & drop on upload area OR click to select
# 3. Watch for upload spinner
# 4. Image should appear in grid
# 5. Hover over image - delete button appears
# 6. Click delete - confirmation appears
# 7. Confirm deletion
```

#### 5e. Content Blocks Page (`/da/content-blocks`)
```
✓ Page loads
✓ Block stats display
✓ "New Block" button works (on desktop)
✓ Can create block with title, description, image
✓ Block appears in grid with preview
✓ Can edit block
✓ Can delete block
✓ Image upload works (drag & drop)
```

**Test:**
```bash
# 1. Click "New Block" button
# 2. Enter Title: "My Content Block"
# 3. Enter Description: "This is a test block"
# 4. Upload image (drag/drop)
# 5. Click "Create"
# 6. Block appears in grid with preview
# 7. Try "Edit" button
# 8. Try "Delete" button
```

---

### Step 6: Test API Integration

#### 6a. Test API Client in Website
Edit `src/pages/Index.tsx` and add:

```typescript
import { apiClient } from '@/lib/api';
import { useEffect, useState } from 'react';

export default function Index() {
  const [sponsors, setSponsors] = useState([]);

  useEffect(() => {
    // Test API call
    apiClient.sponsors.getAll()
      .then(data => {
        console.log('Sponsors:', data);
        setSponsors(data);
      })
      .catch(err => console.error('Error:', err));
  }, []);

  return (
    <>
      {/* Existing content... */}
      <div>
        <h2>Sponsors from Dashboard:</h2>
        <ul>
          {sponsors.map(s => (
            <li key={s.id}>{s.id}: {JSON.stringify(s)}</li>
          ))}
        </ul>
      </div>
    </>
  );
}
```

**Test:**
1. Visit `http://localhost:5173`
2. Open browser DevTools (F12)
3. Console should log: `Sponsors: [...]`
4. Sponsors should render on page

---

### Step 7: Test Toast Notifications

#### 7a. Success Toast
- Navigate to Offices page
- Click "New Office"
- Enter office name
- Click "Create"
- Bottom-right should show green success toast

#### 7b. Error Toast
- In browser console, stop backend server
- Try to load contacts
- Bottom-right should show red error toast

---

### Step 8: Test Theme Switching

1. Click theme button in sidebar footer
2. UI should switch from dark to light (or vice versa)
3. Refresh page - theme should persist

---

## 🔍 Debugging Tips

### Check Browser Console
```javascript
// In browser DevTools console:

// Test API client
await window.__API__.contacts.getAll()
// Should return array of contacts

// Check environment
console.log(import.meta.env.VITE_API_URL)
// Should show: http://localhost:9090
```

### Check Backend Logs
```bash
# If running with Maven
mvn spring-boot:run  # Watch output for errors

# Check if backend is listening
curl http://localhost:9090/contacts  # Should work
```

### Network Requests
DevTools → Network tab
- Filter by "Fetch/XHR"
- Make a dashboard action
- Check request URL and response

### Common Issues

**Issue: "Failed to load contacts: Network error"**
- Solution: Verify backend is running on port 9090
- Solution: Check `VITE_API_URL` environment variable

**Issue: Form doesn't save**
- Solution: Check browser console for errors
- Solution: Verify backend database connection
- Solution: Check network request in DevTools

**Issue: Images don't upload**
- Solution: Check file size (< 15MB)
- Solution: Verify Supabase configuration
- Solution: Check backend logs for errors

---

## 📊 Test Results Checklist

- [ ] Backend starts successfully
- [ ] Frontend builds without errors
- [ ] Dashboard login works
- [ ] Contacts page loads and displays
- [ ] Offices CRUD operations work
- [ ] General info saves
- [ ] Sponsors upload works
- [ ] Content blocks upload works
- [ ] Toast notifications appear
- [ ] Theme switching works
- [ ] API data displays in website
- [ ] Search/filter works
- [ ] Delete confirmations work
- [ ] Responsive design works on mobile

---

## 🎯 Performance Testing

### Lighthouse Score
```bash
npm run build  # Build for production
# Use Chrome DevTools → Lighthouse for audit
```

### Load Testing (Optional)
- Dashboard should support 100+ simultaneous connections
- API responses < 200ms
- Image uploads < 5 seconds

---

## ✨ Next Steps After Testing

1. ✅ Verify all features work
2. 🔐 Implement production authentication
3. 📱 Test on mobile devices
4. 🌍 Deploy to staging server
5. 📊 Setup monitoring and logging
6. 🔄 Setup CI/CD pipeline

---

## 📞 Support

If tests fail:
1. Check error messages in console
2. Verify backend is running: `http://localhost:9090`
3. Verify frontend is running: `http://localhost:5173`
4. Check `.env.local` has correct API URL
5. Review backend logs for database errors
6. Check network requests in DevTools

---

**Testing Status:** Ready ✅  
**Last Updated:** March 2026
