# 🚀 VortextSoft Deployment Guide (Vercel Only)

Your app is now configured to be deployed **100% on Vercel**.
We will create **TWO** projects on Vercel from the **SAME** repository.

1.  **Project A**: Backend (API)
2.  **Project B**: Frontend (Client)

---

## Phase 1: Deploy Backend (API)
1.  **Push** your latest code to GitHub (if you haven't already).
2.  Go to **[Vercel Dashboard](https://vercel.com/dashboard)**.
3.  Click **Add New...** -> **Project**.
4.  Import your `vortextsoft-website` repository.
5.  **Configure Project**:
    *   **Project Name**: `vortextsoft-api`
    *   **Framework Preset**: Other
    *   **Root Directory**: Click Edit and select `api`. (Crucial!)
6.  **Environment Variables**:
    *   Key: `MONGODB_URI`
    *   Value: `(Paste your MongoDB Connection String)`
7.  **Click Deploy**.
8.  **Wait**: Once it finishes, copy the domain (e.g., `https://vortextsoft-api.vercel.app`).
    *   *Note: Using Vercel for backend might be slower (cold starts) than Render, but it works.*

---

## Phase 2: Deploy Frontend (Client)
1.  Go to Vercel Dashboard again.
2.  Click **Add New...** -> **Project**.
3.  Import the **SAME** `vortextsoft-website` repository.
4.  **Configure Project**:
    *   **Project Name**: `vortextsoft` (or whatever you want)
    *   **Framework Preset**: Vite (Auto-detected)
    *   **Root Directory**: Click Edit and select `client`.
5.  **Environment Variables**:
    *   Key: `VITE_API_URL`
    *   Value: `https://vortextsoft-api.vercel.app` (The URL from Phase 1)
      *(Note: No trailing slash /)*
6.  **Click Deploy**.

---

## Phase 3: Verify
- Open your Frontend URL.
- Test the site!

---

## MongoDB Note
Remember to whitelist IP `0.0.0.0/0` in MongoDB Atlas Network Access so Vercel can connect!
