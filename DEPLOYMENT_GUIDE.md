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

### **Option 1: Netlify (Frontend + Backend)** ⭐ RECOMMENDED
**Best for**: Free, Fast, Works in Sri Lanka (No SMS Block).
**Cost**: $0 (Free Tier)

#### Why This?
- ✅ **One Platform**: Host everything on Netlify.
- ✅ **Free SSL**: Automatic HTTPS.
- ✅ **Zero Maintenance**: Serverless architecture.

---

## 🔧 STEP-BY-STEP: Netlify Deployment

### **1. Push Code to GitHub**
Ensure your latest code (with `netlify.toml` and updated `api/index.js`) is pushed to your GitHub repository.

### **2. Sign up for Netlify**
- Go to https://netlify.com
- Sign up with GitHub (Easy!)

### **3. Import Project**
1. Click **"Add new site"** → **"Import an existing project"**.
2. Select **GitHub**.
3. Choose your `VortextSoft` repository.
4. **Configuration (Important)**:
   - Netlify should auto-detect settings from `netlify.toml`.
   - **Build Command**: `cd api && npm install && cd ../client && npm install && npm run build` (If it's not auto-filled, type this!)
   - **Publish Directory**: `client/dist`
5. Click **Deploy Site**.

### **4. Add Environment Variables**
**Immediately after starting deployment:**
1. Go to **SIte Configuration** > **Environment variables**.
2. Add these variables:
   - `EMAIL_USER`: Your Gmail Address
   - `EMAIL_PASSWORD`: Your Gmail App Password
   - `NODE_ENV`: `production`
3. **Trigger Redeploy**: Go to "Deploys" tab -> "Trigger deploy" -> "Clear cache and deploy site" (to make sure emails work).

### **5. Result**
- You get a URL like `vortextsoft-1234.netlify.app`.
- Test it!
  - Frontend: `https://vortextsoft-1234.netlify.app`
  - API: `https://vortextsoft-1234.netlify.app/api/services`

### **6. Connect Domain**
1. Buy domain from local registrar (`domains.lk` etc).
2. In Netlify: **Domain Management** > **Add Custom Domain**.
3. Add `vortextsoft.lk`.
4. Follow DNS instructions (Netlify will give you nameservers).

---

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
