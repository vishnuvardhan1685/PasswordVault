import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
        maxlength: 120,
    },
    passwordHash: {
        type: String,
        required: true,
    },
}, { timestamps: true });

export const User = mongoose.model("User", userSchema);