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
            // In production with a single Render service (same-origin), the browser won't send CORS.
            // But if it does (or for debugging), allow same-origin and allowlisted origins.
            if (allowlist.includes(origin)) return cb(null, true);
            return cb(new Error(`CORS blocked for origin: ${origin}`));
        },
        credentials: true,
    })
);
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