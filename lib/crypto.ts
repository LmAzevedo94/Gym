const enc = new TextEncoder();
const dec = new TextDecoder();

function toB64(buf: ArrayBuffer | Uint8Array): string {
  return btoa(String.fromCharCode(...new Uint8Array(buf instanceof ArrayBuffer ? buf : buf)));
}

function fromB64(b64: string): Uint8Array {
  return Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));
}

function toFixedBuffer(arr: Uint8Array): Uint8Array<ArrayBuffer> {
  const buf = new ArrayBuffer(arr.byteLength);
  new Uint8Array(buf).set(arr);
  return new Uint8Array(buf);
}

export async function deriveKey(password: string, salt: Uint8Array): Promise<CryptoKey> {
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    enc.encode(password),
    "PBKDF2",
    false,
    ["deriveKey"]
  );
  return crypto.subtle.deriveKey(
    { name: "PBKDF2", salt: toFixedBuffer(salt), iterations: 150000, hash: "SHA-256" },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    true,
    ["encrypt", "decrypt"]
  );
}

export async function exportKey(key: CryptoKey): Promise<string> {
  const raw = await crypto.subtle.exportKey("raw", key);
  return toB64(raw);
}

export async function importKey(b64: string): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    "raw",
    toFixedBuffer(fromB64(b64)),
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"]
  );
}

export async function encryptText(text: string, key: CryptoKey): Promise<string> {
  const iv = toFixedBuffer(crypto.getRandomValues(new Uint8Array(12)));
  const ciphertext = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    enc.encode(text)
  );
  return `${toB64(iv)}:${toB64(ciphertext)}`;
}

export async function decryptText(encrypted: string, key: CryptoKey): Promise<string> {
  const [ivB64, ctB64] = encrypted.split(":");
  const iv = toFixedBuffer(fromB64(ivB64));
  const ciphertext = toFixedBuffer(fromB64(ctB64));
  const plaintext = await crypto.subtle.decrypt({ name: "AES-GCM", iv }, key, ciphertext);
  return dec.decode(plaintext);
}

export async function hashPassword(password: string, salt: Uint8Array): Promise<string> {
  const data = toFixedBuffer(enc.encode(password + toB64(salt)));
  const hash = await crypto.subtle.digest("SHA-256", data);
  return toB64(hash);
}
