import { Password } from "../models/Password.js";
import { encryptText, decryptText } from "../utils/crypto.js";

export async function generatePassword(req, res) {
  const {
    length = 12,
    uppercase = true,
    lowercase = true,
    numbers = true,
    symbols = true,
  } = req.body || {};

  const len = Number(length);

  if (!Number.isInteger(len) || len < 6 || len > 64) {
    return res.status(400).json({ message: "length must be an integer between 6 and 64" });
  }

  const pools = [];
  if (uppercase) pools.push("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
  if (lowercase) pools.push("abcdefghijklmnopqrstuvwxyz");
  if (numbers) pools.push("0123456789");
  if (symbols) pools.push("!@#$%^&*()-_=+[]{}|;:,.<>?/~");

  if (pools.length === 0) {
    return res.status(400).json({ message: "At least one character type is required" });
  }

  const allChars = pools.join("");
  const result = [];

  for (const pool of pools) {
    result.push(pool[Math.floor(Math.random() * pool.length)]);
  }

  while (result.length < len) {
    result.push(allChars[Math.floor(Math.random() * allChars.length)]);
  }

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }

  return res.json({ password: result.join(""), length: len });
}

export async function savePassword(req, res) {
  try {
    const { label, username, password } = req.body || {};

    if (!label?.trim() || !username?.trim() || !password) {
      return res.status(400).json({ message: "label, username and password are required" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "password must be at least 6 characters" });
    }

    const passwordEnc = encryptText(password);

    const doc = await Password.create({
      label: label.trim(),
      username: username.trim(),
      passwordEnc,
    });

    return res.status(201).json({
      message: "Saved",
      id: doc._id,
      label: doc.label,
      username: doc.username,
      createdAt: doc.createdAt,
    });
  } catch (error) {
    if (error?.code === 11000) {
      return res
        .status(409)
        .json({ message: "An entry with this label + username already exists" });
    }

    console.error("savePassword error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function getPasswords(req, res) {
  try {
    const items = await Password.find({})
      .select("label username createdAt updatedAt")
      .sort({ createdAt: -1 });

    return res.json({ count: items.length, items });
  } catch (error) {
    console.error("getPasswords error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function getPasswordById(req, res) {
  try {
    const { id } = req.params;

    const doc = await Password.findById(id).select("label username passwordEnc createdAt updatedAt");
    if (!doc) return res.status(404).json({ message: "Not found" });

    const password = decryptText(doc.passwordEnc);

    return res.json({
      id: doc._id,
      label: doc.label,
      username: doc.username,
      password,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    });
  } catch (error) {
    console.error("getPasswordById error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function updatePassword(req, res) {
  try {
    const { id } = req.params;
    const { password } = req.body || {};

    if (!password) return res.status(400).json({ message: "password is required" });
    if (password.length < 6) {
      return res.status(400).json({ message: "password must be at least 6 characters" });
    }

    const passwordEnc = encryptText(password);

    const updated = await Password.findByIdAndUpdate(
      id,
      { passwordEnc },
      { new: true, runValidators: true }
    ).select("label username createdAt updatedAt");

    if (!updated) return res.status(404).json({ message: "Not found" });

    return res.json({
      message: "Updated",
      item: updated,
    });
  } catch (error) {
    console.error("updatePassword error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function deletePassword(req, res) {
  try {
    const { id } = req.params;

    const deleted = await Password.findByIdAndDelete(id).select("label username createdAt updatedAt");
    if (!deleted) return res.status(404).json({ message: "Not found" });

    return res.json({ message: "Deleted", item: deleted });
  } catch (error) {
    console.error("deletePassword error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}