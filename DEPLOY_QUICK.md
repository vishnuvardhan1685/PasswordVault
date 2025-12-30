# 🎯 QUICK START - Netlify Deployment

## Copy-Paste These Values Into Netlify Form

### Build Settings

| Field | Value |
|-------|-------|
| **Base directory** | *(leave empty)* |
| **Build command** | `npm install && cd frontend && npm install && npm run build` |
| **Publish directory** | `frontend/dist` |
| **Functions directory** | `netlify/functions` |

### Environment Variables

Add these 4 variables in Netlify:

```bash
# 1. MongoDB Connection String (replace with yours)
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/passwordvault?retryWrites=true&w=majority

# 2. JWT Secret (generate 32+ characters)
JWT_SECRET=your-super-secret-jwt-key-at-least-32-characters-long-change-this

# 3. Vault Encryption Key (exactly 32 characters)
VAULT_ENCRYPTION_KEY=12345678901234567890123456789012

# 4. Environment
NODE_ENV=production
```

### Generate Secure Keys

Run in terminal:
```bash
# JWT_SECRET (64 chars)
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# VAULT_ENCRYPTION_KEY (32 chars)
node -e "console.log(require('crypto').randomBytes(16).toString('hex'))"
```

---

## Before Deployment

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Configure MongoDB Atlas:**
   - Go to Network Access
   - Add IP Address: `0.0.0.0/0` (Allow all)
   - This is required for Netlify Functions

---

## How It Works

✅ **Single Deployment** = Frontend + Backend together  
✅ **No CORS Issues** = Same domain  
✅ **Backend as Netlify Functions** = Serverless (auto-scaling)  
✅ **Frontend** = Static React app (CDN)  

```
https://passwordvault001.netlify.app/
├── /                    → React App (homepage)
├── /login              → React App
├── /vault              → React App (protected)
└── /api/*              → Backend API (Netlify Function)
```

---

## After Deployment

Visit: `https://passwordvault001.netlify.app`

Test:
1. ✅ Signup with 8+ character password
2. ✅ Login with credentials
3. ✅ Generate password
4. ✅ Save to vault
5. ✅ View saved passwords

---

## If Something Goes Wrong

**Check:**
1. Netlify deploy logs for build errors
2. Functions tab → `api` → Logs for runtime errors
3. Browser console (F12) for frontend errors
4. MongoDB Atlas IP whitelist is set to `0.0.0.0/0`
5. All 4 environment variables are set correctly

---

**Full Details:** See `NETLIFY_DEPLOYMENT.md`
