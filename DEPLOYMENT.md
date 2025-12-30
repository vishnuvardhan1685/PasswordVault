# Password Vault - Integrated Deployment Guide

This guide explains how to deploy the entire Password Vault application (frontend + backend) as a single integrated Netlify project.

## Overview

The project structure has been configured for **integrated deployment**:
- Frontend: Static React app built with Vite
- Backend: Express API running as Netlify Functions
- All deployed from a single repository to one Netlify site

## Prerequisites

1. GitHub account with your repository pushed
2. Netlify account
3. MongoDB Atlas database set up

## Deployment Steps

### 1. Push Your Code to GitHub

```bash
git add .
git commit -m "Configured for integrated Netlify deployment"
git push origin main
```

### 2. Create New Site on Netlify

1. Go to [Netlify](https://app.netlify.com/)
2. Click **"Add new site"** → **"Import an existing project"**
3. Choose **GitHub** and authorize Netlify
4. Select your **PasswordVault** repository
5. Configure build settings:
   - **Team**: Spirit (or your team)
   - **Site name**: `passwordvault001` (or your preferred name)
   - **Branch to deploy**: `main`
   - **Build command**: `cd frontend && npm install && npm run build`
   - **Publish directory**: `frontend/dist`
   - **Functions directory**: `netlify/functions`

### 3. Configure Environment Variables

In Netlify dashboard, go to **Site settings** → **Environment variables** and add:

#### Required Variables:

| Variable | Example Value | Notes |
|----------|--------------|-------|
| `MONGODB_URI` | `mongodb+srv://username:password@cluster.mongodb.net/passwordvault?retryWrites=true&w=majority` | Your MongoDB Atlas connection string |
| `JWT_SECRET` | `your-super-secret-jwt-key-at-least-32-characters-long` | Must be at least 32 characters |
| `VAULT_ENCRYPTION_KEY` | `12345678901234567890123456789012` | Must be exactly 32 characters |
| `NODE_ENV` | `production` | Production environment flag |

**Important**: 
- Keep these values secret and secure
- `VAULT_ENCRYPTION_KEY` must be exactly 32 characters (for AES-256 encryption)
- `JWT_SECRET` should be at least 32 characters for security

### 4. Configure MongoDB Atlas

1. Log in to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Go to your cluster → **Network Access**
3. Click **"Add IP Address"**
4. Choose **"Allow access from anywhere"** (`0.0.0.0/0`)
   - This is required for Netlify Functions which use dynamic IPs
5. Save the changes

### 5. Deploy

1. Click **"Deploy site"** in Netlify
2. Wait for the build to complete (usually 2-5 minutes)
3. Your site will be live at: `https://passwordvault001.netlify.app` (or your chosen name)

## How It Works

### Request Routing

The `netlify.toml` file contains redirect rules:

```toml
[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/api/:splat"
  status = 200
```

This means:
- Frontend requests to `/api/auth/login` → Netlify Function at `/.netlify/functions/api/auth/login`
- Frontend requests to `/api/passwords` → Netlify Function at `/.netlify/functions/api/passwords`
- All other requests → React app (SPA fallback)

### Backend Function

The backend API is wrapped in a serverless function at `netlify/functions/api.js`:
- Connects to MongoDB on first request
- Handles all Express routes
- Reuses database connections for efficiency

### Frontend API Calls

The frontend uses **relative paths** (`/api`) instead of absolute URLs:
- Development: Uses Vite proxy (configure in `vite.config.js` if needed)
- Production: Uses Netlify redirects to route to Functions

## Testing After Deployment

1. **Visit your site**: `https://your-site-name.netlify.app`
2. **Test signup**: Create a new account
3. **Test login**: Sign in with your credentials
4. **Test password generator**: Generate a password (public endpoint)
5. **Test vault operations**: Save, view, update, delete passwords
6. **Check Privacy & Terms pages**: Ensure they load without ad blocker issues

## Troubleshooting

### Build Fails
- Check **Netlify deploy logs** for specific errors
- Ensure all dependencies are in `package.json` files
- Verify Node version compatibility (Node 20 specified in `netlify.toml`)

### API Requests Fail (401/403 errors)
- Check environment variables are set correctly in Netlify
- Verify MongoDB Atlas allows connections from `0.0.0.0/0`
- Check Netlify Function logs: **Site → Functions → api → Logs**

### Database Connection Issues
- Verify `MONGODB_URI` is correct (check for special characters in password)
- Ensure MongoDB Atlas cluster is running
- Check IP whitelist settings in MongoDB Atlas

### Frontend Shows Errors
- Open browser DevTools → Console
- Check for CORS errors (should not occur with integrated deployment)
- Verify API calls use relative paths (`/api/*`)

## Environment-Specific Configuration

### Local Development

For local development, you can still run backend and frontend separately:

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

Create a `.env` file in the `backend` folder with your local MongoDB URI.

### Production

Production automatically uses:
- Environment variables from Netlify dashboard
- Relative API paths (no CORS issues)
- Serverless functions for backend

## Updating the Deployment

To deploy changes:

```bash
git add .
git commit -m "Your update message"
git push origin main
```

Netlify will automatically rebuild and redeploy your site.

## Security Checklist

- ✅ Environment variables set in Netlify (not in code)
- ✅ MongoDB Atlas IP whitelist configured
- ✅ JWT_SECRET is strong (32+ characters)
- ✅ VAULT_ENCRYPTION_KEY is exactly 32 characters
- ✅ HTTPS enabled (automatic with Netlify)
- ✅ No sensitive data in Git repository

## Custom Domain (Optional)

To use your own domain:

1. Go to **Site settings** → **Domain management**
2. Click **"Add custom domain"**
3. Follow Netlify's instructions to configure DNS

## Support

If you encounter issues:
1. Check Netlify Function logs
2. Review MongoDB Atlas connection logs
3. Inspect browser console for frontend errors
4. Verify all environment variables are set correctly

---

**Your Password Vault is now deployed as a fully integrated application! 🎉**
