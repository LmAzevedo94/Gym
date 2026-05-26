"use client";
import { deriveKey, exportKey, importKey, hashPassword } from "./crypto";

const K_SALT = "gym_auth_salt";
const K_HASH = "gym_auth_hash";
const K_SESSION = "gym_session_key";

function toB64(arr: Uint8Array): string {
  return btoa(String.fromCharCode(...arr));
}
function fromB64(b64: string): Uint8Array {
  return Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));
}

export function isFirstRun(): boolean {
  return !localStorage.getItem(K_HASH);
}

async function deriveAndStore(password: string, salt: Uint8Array): Promise<void> {
  const key = await deriveKey(password, salt);
  const exported = await exportKey(key);
  sessionStorage.setItem(K_SESSION, exported);
}

export async function setupPassword(password: string): Promise<void> {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const hash = await hashPassword(password, salt);
  localStorage.setItem(K_SALT, toB64(salt));
  localStorage.setItem(K_HASH, hash);
  await deriveAndStore(password, salt);
}

export async function login(password: string): Promise<boolean> {
  const saltB64 = localStorage.getItem(K_SALT);
  const storedHash = localStorage.getItem(K_HASH);
  if (!saltB64 || !storedHash) return false;
  const salt = fromB64(saltB64);
  const hash = await hashPassword(password, salt);
  if (hash !== storedHash) return false;
  await deriveAndStore(password, salt);
  return true;
}

export function isLoggedIn(): boolean {
  return !!sessionStorage.getItem(K_SESSION);
}

export function logout(): void {
  sessionStorage.removeItem(K_SESSION);
}

export async function getSessionKey(): Promise<CryptoKey | null> {
  const b64 = sessionStorage.getItem(K_SESSION);
  if (!b64) return null;
  try {
    return await importKey(b64);
  } catch {
    return null;
  }
}
