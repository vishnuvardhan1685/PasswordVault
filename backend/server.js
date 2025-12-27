import express from "express";
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import passwordRoutes from './routes/passwordRoutes.js';

dotenv.config();

const app = express();
app.use(cors());
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

app.use("/api", passwordRoutes);
const PORT = process.env.PORT || 5000;

async function start(){
    await connectDB();
    app.listen(PORT, () => {
        console.log('Server is running on port ' + PORT);
    });
}

start();