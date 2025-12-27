import crypto from "crypto";

function getKey() {
  const hex = process.env.VAULT_ENCRYPTION_KEY;
  if (!hex) throw new Error("VAULT_ENCRYPTION_KEY is missing in .env");

  const key = Buffer.from(hex, "hex");
  if (key.length !== 32) {
    throw new Error("VAULT_ENCRYPTION_KEY must be 32 bytes (64 hex chars)");
  }
  return key;
}

export function encryptText(plainText) {
  const key = getKey();
  const iv = crypto.randomBytes(12); // recommended length for GCM
  const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);

  const ciphertext = Buffer.concat([cipher.update(plainText, "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();

  return {
    iv: iv.toString("hex"),
    content: ciphertext.toString("hex"),
    tag: tag.toString("hex"),
  };
}

export function decryptText(payload) {
  const key = getKey();
  const iv = Buffer.from(payload.iv, "hex");
  const tag = Buffer.from(payload.tag, "hex");
  const content = Buffer.from(payload.content, "hex");

  const decipher = crypto.createDecipheriv("aes-256-gcm", key, iv);
  decipher.setAuthTag(tag);

  const plain = Buffer.concat([decipher.update(content), decipher.final()]);
  return plain.toString("utf8");
}