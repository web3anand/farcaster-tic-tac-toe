# 🚀 TicTacToe Battle - Deployment Guide

## Step 1: Deploy to Vercel

### Option A: Deploy via Vercel CLI (Recommended)

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy from your project directory**:
   ```bash
   vercel
   ```

4. **Follow the prompts**:
   - Set up and deploy? **Yes**
   - Which scope? **Your account**
   - Link to existing project? **No**
   - What's your project's name? **farcaster-tic-tac-toe**
   - In which directory is your code located? **./**

### Option B: Deploy via GitHub

1. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/your-username/farcaster-tic-tac-toe.git
   git push -u origin main
   ```

2. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Deploy

## Step 2: Set up Game Server

### Deploy to Railway (Recommended)

1. **Go to [railway.app](https://railway.app)**
2. **Connect GitHub account**
3. **Create new project from GitHub repo**
4. **Select the `server` folder**
5. **Set environment variables**:
   ```
   PORT=3001
   CLIENT_URL=https://your-app.vercel.app
   ```

### Alternative: Deploy to Render

1. **Go to [render.com](https://render.com)**
2. **Create new Web Service**
3. **Connect GitHub repository**
4. **Set build command**: `cd server && npm install`
5. **Set start command**: `cd server && npm start`
6. **Set environment variables**:
   ```
   PORT=3001
   CLIENT_URL=https://your-app.vercel.app
   ```

## Step 3: Configure Environment Variables

### In Vercel Dashboard:

1. **Go to your project settings**
2. **Navigate to Environment Variables**
3. **Add these variables**:

```bash
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_wallet_connect_project_id
NEXT_PUBLIC_SOCKET_URL=https://your-game-server.railway.app
NEXT_PUBLIC_ROOT_URL=https://your-app.vercel.app
```

### Get WalletConnect Project ID:

1. **Go to [cloud.walletconnect.com](https://cloud.walletconnect.com)**
2. **Sign up/Login**
3. **Create new project**
4. **Copy the Project ID**

## Step 4: Complete Account Association

### 1. Update your domain in minikit.config.ts:

```typescript
const ROOT_URL = 'https://your-app.vercel.app';
```

### 2. Push changes to production:
```bash
git add .
git commit -m "Update domain for production"
git push
```

### 3. Complete Account Association:

1. **Go to [Base Build Account Association Tool](https://docs.base.org/mini-apps/quickstart/create-new-miniapp)**
2. **Enter your Vercel app URL**: `https://your-app.vercel.app`
3. **Click "Submit"**
4. **Click "Verify" and follow instructions**
5. **Copy the `accountAssociation` object**

### 4. Update minikit.config.ts with association:

```typescript
export const minikitConfig = {
  accountAssociation: {
    "header": "your_header_here",
    "payload": "your_payload_here", 
    "signature": "your_signature_here"
  },
  miniapp: {
    // ... rest of config
  },
} as const;
```

### 5. Push final changes:
```bash
git add .
git commit -m "Add account association"
git push
```

## Step 5: Test on Base Preview Tool

1. **Go to [base.dev/preview](https://base.dev/preview)**
2. **Enter your app URL**: `https://your-app.vercel.app`
3. **Test the following**:
   - ✅ App loads correctly
   - ✅ Wallet connection works
   - ✅ Matchmaking starts
   - ✅ Game board renders
   - ✅ Account association is valid

## Step 6: Create Required Assets

You'll need to create these image files in the `public` folder:

- `icon-192.png` (192x192)
- `icon-512.png` (512x512) 
- `screenshot-portrait.png` (portrait screenshot)
- `screenshot-landscape.png` (landscape screenshot)
- `splash-hero.png` (splash screen)
- `hero-image.png` (hero image)
- `og-image.png` (social sharing image)

## Step 7: Final Deployment Checklist

- [ ] Frontend deployed to Vercel
- [ ] Game server deployed to Railway/Render
- [ ] Environment variables set
- [ ] Account association completed
- [ ] All image assets created
- [ ] App tested on Base preview tool
- [ ] Wallet connection working
- [ ] Matchmaking functional
- [ ] Mobile responsive

## Troubleshooting

### Build Issues:
- Check TypeScript errors: `npm run build`
- Verify all dependencies installed: `npm install`

### Deployment Issues:
- Check Vercel logs in dashboard
- Verify environment variables are set
- Ensure all required files are committed

### Game Server Issues:
- Check Railway/Render logs
- Verify CORS settings
- Test socket connection

### Account Association Issues:
- Ensure domain is live and accessible
- Check manifest file is properly formatted
- Verify all required fields are present

## Support

- **Base Documentation**: [docs.base.org](https://docs.base.org)
- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)
- **Railway Docs**: [docs.railway.app](https://docs.railway.app)
