"use client";

export const sg = async (k: string): Promise<unknown> => {
  try {
    const val = localStorage.getItem(k);
    return val ? JSON.parse(val) : null;
  } catch {
    return null;
  }
};

export const sw = async (k: string, v: unknown): Promise<void> => {
  try {
    localStorage.setItem(k, JSON.stringify(v));
  } catch {}
};
