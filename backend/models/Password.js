import mongoose from "mongoose";

const passwordSchema = new mongoose.Schema({
    label: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50,
    },
    username: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50,
    },
    passwordEnc: {
        iv: { type: String, required: true },
        content: { type: String, required: true },
        tag: { type: String, required: true },
    },
}, { timestamps: true }
);

passwordSchema.index({ label: 1, username: 1 }, { unique: true });

export const Password = mongoose.model("Password", passwordSchema)