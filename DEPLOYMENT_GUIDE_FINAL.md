# 🚀 VortextSoft Deployment Guide (Final)

Your app is now **Production Ready**.
- Database: **MongoDB Atlas** (Cloud)
- Frontend Config: **Ready for Vercel**
- Backend Config: **Ready for Render/Railway**

---

## Phase 1: Deploy Backend (API)
We will use **Render** (Free) to host your Node.js API.

1.  **Push Code to GitHub**: Ensure your latest code (with MongoDB changes) is on GitHub.
2.  **Go to [Render Dashboard](https://dashboard.render.com/)**.
3.  Click **New +** -> **Web Service**.
4.  Connect your GitHub Repo.
5.  **Settings**:
    - **Name**: `vortextsoft-api`
    - **Root Directory**: `api` (Important!)
    - **Environment**: `Node`
    - **Build Command**: `npm install`
    - **Start Command**: `npm start`
    - **Plan**: Free
6.  **Environment Variables** (Click "Advanced" or "Environment"):
    - Key: `MONGODB_URI`
    - Value: `(Paste your MongoDB Connection String here)`
    - Key: `EMAIL_USER` (If needed)
    - Key: `EMAIL_PASSWORD` (If needed)
7.  **Click Deploy**.
8.  **Wait**: Once it finishes, copy the URL (e.g., `https://vortextsoft-api.onrender.com`).

---

## Phase 2: Deploy Frontend (Client)
We will use **Vercel** (Free) to host your React App.

1.  **Go to [Vercel Dashboard](https://vercel.com/dashboard)**.
2.  Click **Add New...** -> **Project**.
3.  Import your GitHub Repo.
4.  **Settings**:
    - **Framework Preset**: Vite (Auto-detected)
    - **Root Directory**: `client` (Important! Click Edit to select 'client' folder)
5.  **Environment Variables**:
    - Key: `VITE_API_URL`
    - Value: `(Paste your Render Backend URL here - e.g. https://vortextsoft-api.onrender.com)`
      *(Note: No trailing slash /)*
6.  **Click Deploy**.

---

## Phase 3: Verify
- Open your Vercel URL (e.g. `https://vortextsoft.vercel.app`).
- Check if "Services" load (means Database is working).
- Try sending a "Contact" message (means API is writing to DB).

---

## Phase 4: Custom Domain (Optional)
If you bought `vortextsoft.com.lk` or `vortextsoft.lk`:
1.  Go to Vercel -> Settings -> Domains.
2.  Add `vortextsoft.lk`.
3.  Vercel will give you DNS Records (A Record / CNAME).
4.  Add those records at your Domain Registrar.
