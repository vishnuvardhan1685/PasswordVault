import express from "express";
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { connectDB } from './config/db.js';
import passwordRoutes from './routes/passwordRoutes.js';
import authRoutes from './routes/authRoutes.js';
dotenv.config();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const allowlist = [
    'http://localhost:5173',
    'http://localhost:5174',
    'http://localhost:5175',
    process.env.CORS_ORIGIN,
].filter(Boolean);

app.use(
    cors({
        origin: (origin, cb) => {
            // Allow non-browser requests (curl, server-to-server)
            if (!origin) return cb(null, true);

            // Allow same-origin for the single-service Render setup.
            // Some browsers/proxies still include an Origin header even for same-origin requests.
            // Compare only scheme + host (+ optional port).
            // Example:
            //   origin: https://passwordvault-6jpg.onrender.com
            //   host:   passwordvault-6jpg.onrender.com
            const host = (this && this.req && this.req.headers && this.req.headers.host)
                ? this.req.headers.host
                : undefined;
            if (host) {
                try {
                    const o = new URL(origin);
                    if (o.host === host) return cb(null, true);
                } catch {
                    // ignore parse errors; handled below
                }
            }

            // Allow explicit allowlist (local dev, or when splitting frontend/backend)
            if (allowlist.includes(origin)) return cb(null, true);

            // Block everything else
            return cb(null, false);
        },
        credentials: true,
    })
);

// Return a clean 403 for disallowed CORS origins instead of noisy stack traces
app.use((err, req, res, next) => {
    if (err && err.message && err.message.toLowerCase().includes('cors')) {
        return res.status(403).json({ ok: false, message: 'CORS blocked' });
    }
    return next(err);
});
app.use(express.json());

app.get("/api/health", (req,res) => {
    res.json({ ok: true , message: "Backend is running"});
})

// import { Password } from "./models/Password.js";
// app.get("/api/passwords/test-create", async (req,res) => {
//     const doc = await Password.create({
//         label : "Test",
//         username : "test@example.com",
//         passwordHash: "random-test-hash",
//     });
//     res.json({createdId: doc._id});
// })
app.use("/api/auth", authRoutes);
app.use("/api", passwordRoutes);

// --- Serve frontend build (Render single-service deployment) ---
// After build, Vite outputs to: <repo>/frontend/dist
const frontendDistPath = path.resolve(__dirname, '..', 'frontend', 'dist');
// Serve Vite assets explicitly (avoid SPA fallback returning HTML for these)
app.use(
    '/assets',
    express.static(path.join(frontendDistPath, 'assets'), {
        fallthrough: false,
        immutable: true,
        maxAge: '1y',
    })
);

// Serve the rest of the dist folder (index.html, vite.svg, etc.)
app.use(
    express.static(frontendDistPath, {
        fallthrough: true,
    })
);

// SPA fallback: any non-API, non-asset route should return the React app
app.get(/^(?!\/api)(?!\/assets)(?!\/favicon\.ico).*/, (req, res) => {
    res.sendFile(path.join(frontendDistPath, 'index.html'));
});

const PORT = process.env.PORT || 5000;

// Start listening even if DB is temporarily down.
// This prevents Render (or clients) from seeing generic 500 HTML responses for static assets
// during boot/reconnect windows.
app.listen(PORT, () => {
    console.log('Server is running on port ' + PORT);
});

connectDB().catch((err) => {
    console.error('Initial DB connection failed. Server is still running; API calls may fail until DB reconnects.', err);
});