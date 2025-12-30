import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import serverless from 'serverless-http';
import { connectDB } from '../../backend/config/db.js';
import passwordRoutes from '../../backend/routes/passwordRoutes.js';
import authRoutes from '../../backend/routes/authRoutes.js';

dotenv.config();

const app = express();
// Same-origin in Netlify means CORS isn't needed for the browser, but keeping
// it enabled helps debugging and avoids issues with tools.
app.use(
    cors({
        origin: true,
        credentials: true,
    })
);
app.use(express.json());

// Health check
app.get("/api/health", (req, res) => {
    res.json({ ok: true, message: "Backend is running" });
});

// Routes
// Netlify's function bundler may wrap ESM default exports as `{ default: ... }`.
// Express expects a function (router), so unwrap if needed.
const unwrapDefault = (m) => (m && typeof m === 'object' && 'default' in m ? m.default : m);

app.use("/api/auth", unwrapDefault(authRoutes));
app.use("/api", unwrapDefault(passwordRoutes));

// Connect to DB before handling requests
let isConnected = false;

const connectToDatabase = async () => {
    if (isConnected) {
        return;
    }
    await connectDB();
    isConnected = true;
};

// Wrap the Express app with serverless-http
const serverlessHandler = serverless(app);

export const handler = async (event, context) => {
    context.callbackWaitsForEmptyEventLoop = false;
    await connectToDatabase();
    return serverlessHandler(event, context);
};
