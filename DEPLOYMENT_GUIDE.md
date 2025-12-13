# Deployment Guide - VortextSoft Website
## Getting HTTPS with Custom Domain (vortextsoft.lk)

---

## 🎯 Overview
This guide will help you deploy your website to **https://vortextsoft.lk**

---

## 📋 Prerequisites

### 1. Domain Registration
- ✅ Register `vortextsoft.lk` with a domain registrar
- Recommended registrars for .lk domains:
  - **LK Domain Registry** (https://www.nic.lk/)
  - **Domains.lk**
  - **Hostinger Sri Lanka**

### 2. Choose Hosting Provider
We recommend these options:

---

## 🚀 Recommended Deployment Options

### **Option 1: Vercel (Frontend) + Render (Backend)** ⭐ RECOMMENDED
**Best for**: Easy deployment, automatic HTTPS, free SSL
**Cost**: Free tier available

#### Why This Combo?
- ✅ Automatic HTTPS/SSL
- ✅ Free tier for both
- ✅ Easy custom domain setup
- ✅ Auto-deploy from Git
- ✅ Global CDN for fast loading

---

### **Option 2: Railway (Full-Stack)**
**Best for**: All-in-one deployment
**Cost**: $5 free credit monthly

---

### **Option 3: DigitalOcean / AWS (VPS)**
**Best for**: Full control, production scale
**Cost**: $4-6/month minimum

---

## 🔧 STEP-BY-STEP: Vercel + Render Deployment

### **Part A: Deploy Backend to Render**

#### 1. Prepare Your Backend
```bash
# Navigate to your project root
cd "e:/VortextSoft/Vortextsoft-company website/VortextSoft (1)/VortextSoft"

# Create a start script for production
```

Create `api/package.json` if it doesn't exist, and ensure it has:
```json
{
  "scripts": {
    "start": "node index.js"
  },
  "engines": {
    "node": ">=18.0.0"
  }
}
```

#### 2. Sign up for Render
- Go to https://render.com
- Sign up with GitHub/GitLab
- Connect your repository

#### 3. Create Web Service
1. Click **"New +"** → **"Web Service"**
2. Connect your GitHub repo
3. Configure:
   - **Name**: `vortextsoft-api`
   - **Root Directory**: `api`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free

#### 4. Add Environment Variables
In Render dashboard, add:
```
PORT=3001
NODE_ENV=production
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

#### 5. Deploy
- Click **"Create Web Service"**
- Wait for deployment (5-10 minutes)
- Copy your API URL: `https://vortextsoft-api.onrender.com`

---

### **Part B: Deploy Frontend to Vercel**

#### 1. Update API URL in Frontend
Edit `client/src/config.js`:
```javascript
// Production-ready config
const isDevelopment = window.location.hostname === 'localhost';

export const API_BASE_URL = isDevelopment 
  ? `http://${window.location.hostname}:3001`
  : 'https://vortextsoft-api.onrender.com'; // Your Render API URL

export const API_URL = `${API_BASE_URL}/api`;

console.log('API Configured at:', API_BASE_URL);
```

#### 2. Build Frontend Locally (Test)
```bash
cd client
npm run build
```

#### 3. Sign up for Vercel
- Go to https://vercel.com
- Sign up with GitHub
- Import your repository

#### 4. Configure Vercel
1. Click **"Add New Project"**
2. Import your repository
3. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

#### 5. Deploy
- Click **"Deploy"**
- Wait for deployment (2-3 minutes)
- You'll get: `https://vortextsoft.vercel.app`

---

### **Part C: Connect Custom Domain (vortextsoft.lk)**

#### 1. In Vercel Dashboard
1. Go to your project → **Settings** → **Domains**
2. Add custom domain: `vortextsoft.lk`
3. Also add: `www.vortextsoft.lk`
4. Vercel will show DNS records to add

#### 2. Configure DNS (At Your Domain Registrar)
Add these records:

**For Root Domain (vortextsoft.lk):**
```
Type: A
Name: @
Value: 76.76.21.21
TTL: 3600
```

**For WWW:**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 3600
```

**SSL Certificate:**
- Vercel automatically provisions SSL certificate
- Wait 15-30 minutes for DNS propagation
- Your site will be live at `https://vortextsoft.lk`

---

## 📝 Alternative: Single VPS Deployment

If you prefer one server for everything:

### DigitalOcean Droplet Setup

#### 1. Create Droplet
- Sign up: https://digitalocean.com
- Create Droplet: Ubuntu 22.04 LTS
- Size: $6/month (1GB RAM)

#### 2. Install Requirements
```bash
# SSH into your server
ssh root@your-droplet-ip

# Update system
apt update && apt upgrade -y

# Install Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt install -y nodejs

# Install PM2 (Process Manager)
npm install -g pm2

# Install Nginx
apt install -y nginx

# Install Certbot (for SSL)
apt install -y certbot python3-certbot-nginx
```

#### 3. Upload Your Code
```bash
# On your local machine
cd "e:/VortextSoft/Vortextsoft-company website/VortextSoft (1)/VortextSoft"

# Create a .tar.gz file
tar -czf vortextsoft.tar.gz api client

# Upload to server
scp vortextsoft.tar.gz root@your-droplet-ip:/var/www/
```

#### 4. Setup on Server
```bash
# On server
cd /var/www
tar -xzf vortextsoft.tar.gz

# Install backend dependencies
cd api
npm install --production
pm2 start index.js --name vortextsoft-api

# Build frontend
cd ../client
npm install
npm run build

# Move build to web root
mkdir -p /var/www/html
cp -r dist/* /var/www/html/
```

#### 5. Configure Nginx
```bash
nano /etc/nginx/sites-available/vortextsoft
```

Paste this configuration:
```nginx
server {
    server_name vortextsoft.lk www.vortextsoft.lk;
    root /var/www/html;
    index index.html;

    # Frontend
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable site:
```bash
ln -s /etc/nginx/sites-available/vortextsoft /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx
```

#### 6. Get SSL Certificate
```bash
certbot --nginx -d vortextsoft.lk -d www.vortextsoft.lk
```

#### 7. Point DNS to Your Server
At your domain registrar:
```
Type: A
Name: @
Value: YOUR_DROPLET_IP
TTL: 3600

Type: A
Name: www
Value: YOUR_DROPLET_IP
TTL: 3600
```

---

## ✅ Quick Checklist

### Before Deployment
- [ ] Domain `vortextsoft.lk` is registered
- [ ] Code is pushed to GitHub/GitLab
- [ ] Environment variables are documented
- [ ] Database location confirmed (json-server or migrate to MongoDB/PostgreSQL)

### After Deployment
- [ ] Backend API is accessible
- [ ] Frontend loads correctly
- [ ] Custom domain points to hosting
- [ ] HTTPS/SSL certificate is active
- [ ] All features tested (forms, uploads, etc.)
- [ ] Email functionality works

---

## 🆘 Troubleshooting

### Domain not showing HTTPS
- Wait 24-48 hours for DNS propagation
- Check DNS settings at registrar
- Verify SSL certificate is issued

### API Calls Failing
- Check `config.js` has correct production URL
- Verify CORS settings in backend
- Check environment variables on hosting

### 502 Bad Gateway
- Backend might be down
- Check PM2 logs: `pm2 logs`
- Restart service: `pm2 restart vortextsoft-api`

---

## 📞 Need Help?

**Render Support**: https://render.com/docs
**Vercel Support**: https://vercel.com/docs
**DigitalOcean Docs**: https://docs.digitalocean.com

---

## 💰 Cost Comparison

| Option | Monthly Cost | HTTPS | Ease |
|--------|--------------|-------|------|
| Vercel + Render (Free) | $0 | ✅ Auto | ⭐⭐⭐⭐⭐ |
| Railway | ~$5 | ✅ Auto | ⭐⭐⭐⭐ |
| DigitalOcean VPS | $6+ | ✅ Manual | ⭐⭐⭐ |

---

**Recommendation**: Start with **Vercel + Render** for free, easy deployment with automatic HTTPS. Upgrade to VPS later if needed for more control.
