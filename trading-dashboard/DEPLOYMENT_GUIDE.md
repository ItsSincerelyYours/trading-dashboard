# 🚀 Deployment Guide - Trading Dashboard

## Option 1: Deploy with Vercel (Recommended - Easiest)

### Step 1: Push to GitHub

1. **Create a new repository on GitHub.com:**
   - Go to https://github.com/new
   - Name: `trading-dashboard`
   - Description: "AI Trading Dashboard with real-time signals"
   - Make it Public or Private (your choice)
   - DON'T initialize with README (we already have files)

2. **Push your code:**
```bash
# Add GitHub remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/trading-dashboard.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 2: Deploy with Vercel

1. **Go to Vercel:**
   - Visit https://vercel.com
   - Sign in with GitHub

2. **Import Project:**
   - Click "Add New..." → "Project"
   - Import your `trading-dashboard` repository
   - Vercel will auto-detect Next.js

3. **Configure (usually automatic):**
   - Framework Preset: Next.js (auto-detected)
   - Root Directory: `./` (default)
   - Build Command: `next build` (default)
   - Output Directory: `.next` (default)

4. **Click Deploy!**
   - Vercel will build and deploy automatically
   - You'll get a URL like: `trading-dashboard.vercel.app`

## Option 2: Deploy with GitHub Pages (Free but limited)

```bash
# Install gh-pages
npm install --save-dev gh-pages

# Add to package.json scripts:
"deploy": "next build && next export && gh-pages -d out"

# Deploy
npm run deploy
```

## Option 3: Deploy with Netlify

1. **Build the project:**
```bash
npm run build
```

2. **Drag & Drop:**
   - Go to https://app.netlify.com/drop
   - Drag your `.next` folder
   - Get instant URL

## 🔐 Environment Variables (For Real Data Later)

Create `.env.local` for API keys:
```env
# Stock Data APIs
ALPHA_VANTAGE_API_KEY=your_key_here
POLYGON_API_KEY=your_key_here

# Trading Platform APIs
ALPACA_API_KEY=your_key_here
ALPACA_SECRET_KEY=your_key_here

# WebSocket URLs
WS_ENDPOINT=wss://your-websocket-endpoint
```

**In Vercel:**
- Go to Project Settings → Environment Variables
- Add each variable
- Redeploy

## 📱 Custom Domain (Optional)

### With Vercel:
1. Go to Project Settings → Domains
2. Add your domain: `yourdomain.com`
3. Update DNS records as instructed

### DNS Settings:
```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

## 🚨 Pre-Deployment Checklist

- [x] Build works locally: `npm run build`
- [x] No TypeScript errors: `npx tsc --noEmit`
- [x] No ESLint errors: `npm run lint`
- [ ] Remove console.logs for production
- [ ] Add error boundaries
- [ ] Set up monitoring (optional)

## 🎯 Quick Deploy Commands

```bash
# 1. Create GitHub repo first on github.com

# 2. Then run these commands:
git remote add origin https://github.com/YOUR_USERNAME/trading-dashboard.git
git push -u origin main

# 3. Go to vercel.com and import the repo
```

## 📊 After Deployment

### Monitor Performance:
- Vercel Analytics (built-in)
- Google Analytics (optional)
- Sentry for error tracking (optional)

### Update Process:
```bash
# Make changes
git add .
git commit -m "Update feature"
git push

# Vercel auto-deploys on push!
```

## 🔗 Useful Links

- **Vercel Dashboard**: https://vercel.com/dashboard
- **GitHub Repo**: https://github.com/YOUR_USERNAME/trading-dashboard
- **Live Site**: https://your-project.vercel.app

## 💡 Tips

1. **Free Tier Limits:**
   - Vercel: 100GB bandwidth/month
   - Perfect for personal projects

2. **Performance:**
   - Already optimized with Next.js
   - Turbopack for fast builds
   - Static generation where possible

3. **Security:**
   - Never commit API keys
   - Use environment variables
   - Enable Vercel's DDoS protection

---

**Ready to go live? Start with Step 1: Create GitHub repo!** 🚀