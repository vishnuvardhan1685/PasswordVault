import mongoose from "mongoose";

const passwordSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true,
    },
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

passwordSchema.index({ userId: 1, label: 1, username: 1 }, { unique: true });

export const Password = mongoose.model("Password", passwordSchema)