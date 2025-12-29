# Password Vault — Password Generator + Secure Storage

**Stack:** MERN (MongoDB Atlas, Express, React+Vite, Node.js)  
**Security:** AES-256-GCM encryption for passwords at rest, bcrypt for user passwords, JWT sessions  
**UI:** Tailwind CSS with glassmorphism design, React Hook Form validation

---

## Quick Start

### 1. Backend (port 5000)
```bash
cd backend
cp .env.example .env  # Create .env from template
# Edit .env with your MongoDB URI, JWT secret, and encryption key
npm install
npm run dev
```

**Required Environment Variables:**
- `MONGODB_URI` - MongoDB Atlas connection string
- `JWT_SECRET` - Random string ≥32 chars for JWT signing
- `VAULT_ENCRYPTION_KEY` - Exactly 32 characters for AES-256 encryption
- `PORT` - Server port (default: 5000)

### 2. Frontend (port 5173/5174)
```bash
cd frontend
cp .env.example .env  # Create .env from template (optional for local dev)
npm install
npm run dev
# Open http://localhost:5174/
```

---

## Working Features

### Authentication
- **Signup:** Create account with email validation and password confirmation
  - Email must be valid format
  - Password must be at least 6 characters
  - Confirm password must match
  - Form validation with React Hook Form
- **Login:** Authenticate with email and password
  - Validates email format and required fields
  - Returns JWT token stored in localStorage
- **Protected Routes:** Vault requires authentication, redirects to login if not authenticated

### Password Generation (Public - No Login Required)
- **Generate:** Customizable password generation with:
  - Length slider (6-64 characters)
  - Character type toggles (uppercase, lowercase, numbers, symbols)
  - Real-time generation via `POST /api/password/generate`
- **Copy:** Copy generated password to clipboard
- **Save:** Save to vault (requires login, redirects to login if not authenticated)

### Vault Management (Authenticated Users Only)
- **Save:** Store passwords with label and username/identifier
  - Form validation ensures all fields are required
  - Passwords encrypted with AES-256-GCM before storage
  - Unique constraint on (userId + label + username)
- **List:** View all saved passwords with search/filter
  - Real-time search by label or username
  - Skeleton loading states
- **Reveal:** View decrypted password in modal (FIXED)
  - Opens modal with large, readable password display
  - Copy button included in modal
  - Much better UX than previous toast-only display
- **Copy:** Copy password to clipboard directly
- **Replace:** Generate new password with custom options
  - Opens modal with generation controls
  - Preview new password before saving
  - Customizable length and character types
- **Delete:** Remove password entry from vault

### Smart Landing Page
- **Adapts to Login State:**
  - Logged out: Shows "Get Started for Free" and "Create Your Vault"
  - Logged in: Shows "Open My Vault" and "Generate Password"
  - Bottom CTA changes based on authentication status
- **Professional UX:** No confusing signup prompts for logged-in users

---

## UI/UX Features

### Design System
- **Dark Theme:** Zinc-950 background with grid pattern
- **Glassmorphism:** Frosted glass cards with backdrop blur
- **Emerald Accent:** Primary action color (rgb(34, 197, 94))
- **110% Base Font Size:** Larger, more comfortable default text
- **Animations:** Smooth transitions with reduced-motion support

### Form Validation (React Hook Form)
- **Login Form:**
  - Email validation (required, pattern matching)
  - Password validation (required)
  - Inline error messages below fields
- **Signup Form:**
  - Email validation (required, pattern matching)
  - Password validation (required, min 6 characters)
  - Confirm password validation (must match)
  - Inline error messages
- **Generator Form:**
  - Label validation (required)
  - Username validation (required)
  - Form auto-clears after successful save

### Interactive Elements
- **Skeleton Loaders:** Pulsing placeholders while data loads
- **Toast Notifications:** Bottom-center toasts for quick feedback
- **Modals:** 
  - Reveal modal: Large, readable password display
  - Replace modal: Custom password generation options
- **Responsive Design:** Mobile-friendly layout

---

## Dashboard Stats (Vault Page)

- **Total Passwords:** Count of saved entries
- **Vault Integrity:** Always 100% (encryption status)
- Removed: "Secured Data" and "Threats Blocked" (not implemented)

---

## Security Features

### Encryption
- **Password Storage:** AES-256-GCM encryption at rest
  - Each password has unique IV (initialization vector)
  - Authentication tag for integrity verification
  - Passwords never stored in plain text
- **User Passwords:** Bcrypt hashing with 10 salt rounds
- **JWT Tokens:** Signed with secret key, 7-day expiration

### Best Practices
- Environment variables for sensitive data
- CORS enabled for cross-origin requests
- Per-user vault scoping (unique constraint)
- Token-based authentication
- Input validation on all forms
- Password requirements enforced

---

## API Endpoints

### Authentication
- `POST /api/auth/register` - Create new user account
- `POST /api/auth/login` - Authenticate user

### Password Generation (Public)
- `POST /api/password/generate` - Generate random password (no auth required)

### Vault Management (Protected)
- `POST /api/passwords/save` - Save encrypted password
- `GET /api/passwords` - List all user passwords
- `GET /api/passwords/:id` - Get decrypted password
- `PUT /api/passwords/:id` - Update password
- `DELETE /api/passwords/:id` - Delete password

All protected endpoints require `Authorization: Bearer <token>` header.

---

## Project Structure

```
backend/
  ├── config/          # Database configuration
  ├── controllers/     # Business logic
  ├── middleware/      # Auth middleware
  ├── models/          # Mongoose schemas
  ├── routes/          # API routes
  ├── utils/           # Encryption utilities
  └── server.js        # Express app entry

frontend/
  ├── src/
  │   ├── components/  # Reusable UI components
  │   ├── pages/       # Route pages
  │   ├── lib/         # API client, auth helpers
  │   └── styles/      # Global CSS
  └── public/          # Static assets
```

---

## Recent Updates ✨

### Form Validation (React Hook Form)
- All forms now use React Hook Form with proper validation
- Inline error messages for better UX
- Email pattern validation
- Password strength requirements
- Confirm password matching

### Reveal Button Fix
- Changed from small toast notification to large modal
- Password displayed in readable, selectable format
- Copy button included in modal
- Much better user experience

### Landing Page Authentication
- Smart CTAs that adapt to login state
- Logged-in users see "Open My Vault" instead of "Get Started"
- No confusing signup prompts for authenticated users
- Professional, context-aware experience

### Deployment Ready
- Comprehensive deployment documentation (DEPLOYMENT.md)
- Environment variable templates (.env.example)
- Netlify configuration files
- Production-ready checklist (PRODUCTION_READY.md)

---

## Documentation

- **DEPLOYMENT.md** - Full deployment guide for production
- **PRODUCTION_READY.md** - Pre-deployment checklist and feature summary
- **FIXES_SUMMARY.md** - Detailed changelog of recent improvements
- **FUNCTIONALITY_CHECK.md** - Complete testing guide
- **LANDING_PAGE_AUTH_FIX.md** - Landing page authentication improvements

---

## Development

### Run Tests
```bash
# Backend
cd backend
npm run dev  # Starts with nodemon for hot reload

# Frontend
cd frontend
npm run dev  # Starts Vite dev server
```

### Build for Production
```bash
# Frontend
cd frontend
npm run build  # Creates dist/ folder
npm run preview  # Preview production build
```

---

## Tech Stack Details

- **Backend:** Node.js 18+, Express 5, Mongoose 9
- **Frontend:** React 19, Vite 7, React Router 7
- **Forms:** React Hook Form 7.69
- **Styling:** Tailwind CSS 3.4.19, PostCSS
- **HTTP Client:** Axios 1.13
- **Database:** MongoDB Atlas
- **Auth:** JWT (jsonwebtoken), bcrypt
- **Encryption:** Node.js Crypto (AES-256-GCM)

---

## License

ISC

---

## Notes

- Generator is public (no auth) for UX — users can try before signing up
- Vault operations require login and auto-redirect if not authenticated
- Passwords encrypted with AES-256-GCM before database write
- User passwords hashed with bcrypt (salt rounds 10)
- JWT tokens expire in 7 days (configurable via `JWT_EXPIRES_IN`)
- Form validation happens on blur for better UX
- Landing page adapts to authentication state for professional experience
