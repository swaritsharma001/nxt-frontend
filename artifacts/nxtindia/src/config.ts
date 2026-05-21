// ─── Backend URL ───────────────────────────────────────────────────────────────
// Change this one value to point at your backend.
// Supports VITE_BACKEND_URL env var so you can also set it per-environment.
export const BACKEND_URL =
  import.meta.env.VITE_BACKEND_URL ||
  "https://your-backend-url.com";
// ───────────────────────────────────────────────────────────────────────────────
