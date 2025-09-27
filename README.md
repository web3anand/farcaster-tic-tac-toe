# 🎮 TicTacToe Battle - Farcaster Mini App

A modern, automatching multiplayer Tic-Tac-Toe game built as a Farcaster mini app with Base blockchain integration. Features real-time matchmaking, leaderboards, scoring system with Ethos integration, and smooth animations.

## 🚀 Quick Deploy

### One-Click Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/farcaster-tic-tac-toe&env=NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID,NEXT_PUBLIC_SOCKET_URL,NEXT_PUBLIC_ROOT_URL&envDescription=Environment%20variables%20needed%20for%20the%20app&envLink=https://github.com/your-username/farcaster-tic-tac-toe#environment-variables)

### Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Start game server (in another terminal)
cd server
npm install
npm start
```

### Deploy with PowerShell

```powershell
# Run the deployment script
.\deploy.ps1
```

## 🎮 Features

### Core Gameplay
- **Automatching System**: Automatic player matching with queue position tracking
- **Real-time Multiplayer**: Socket.io powered real-time game updates
- **Smart AI Fallback**: AI opponent when no players are available
- **Smooth Animations**: Framer Motion powered UI animations

### Blockchain Integration
- **Base Network Support**: Optimized for Base blockchain
- **Wallet Integration**: RainbowKit for seamless wallet connection
- **Ethos Score Integration**: Multiplier system based on user's Ethos score
- **On-chain Rewards**: Points system with blockchain integration

### Social Features
- **Live Leaderboard**: Real-time rankings with player stats
- **Game History**: Track all your games and performance
- **Player Profiles**: View opponent stats and Ethos scores
- **Matchmaking Queue**: See your position in the matchmaking queue

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- Vercel account
- WalletConnect Project ID

### 1. Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/farcaster-tic-tac-toe)

### 2. Set Environment Variables

In your Vercel dashboard, add these environment variables:

```bash
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_wallet_connect_project_id
NEXT_PUBLIC_SOCKET_URL=your_socket_server_url
NEXT_PUBLIC_ROOT_URL=https://your-app.vercel.app
```

### 3. Deploy Game Server

Deploy the game server to a platform like Railway, Render, or Heroku:

```bash
cd server
npm install
npm start
```

### 4. Update Manifest

1. Go to [Base Build Account Association Tool](https://docs.base.org/mini-apps/quickstart/create-new-miniapp)
2. Enter your Vercel app URL
3. Sign the manifest
4. Copy the `accountAssociation` object
5. Update `minikit.config.ts` with the association data

### 5. Test Your App

Visit [base.dev/preview](https://base.dev/preview) to test your mini app.

## 🏗️ Local Development

### 1. Clone and Install

```bash
git clone https://github.com/your-username/farcaster-tic-tac-toe
cd farcaster-tic-tac-toe
npm install
```

### 2. Set Environment Variables

Create `.env.local`:

```bash
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_wallet_connect_project_id
NEXT_PUBLIC_SOCKET_URL=http://localhost:3001
NEXT_PUBLIC_ROOT_URL=http://localhost:3000
```

### 3. Start Game Server

```bash
cd server
npm install
npm start
```

### 4. Start Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## 🎯 Game Mechanics

### Scoring System
- **Base Points**: 100 points per win
- **Ethos Multiplier**: (Ethos Score / 100)
- **Example**: 800 Ethos = 8x multiplier = 800 points per win

### Matchmaking
- **Automatic Matching**: Players are matched based on availability
- **Queue System**: See your position in the matchmaking queue
- **Fair Play**: Random symbol assignment (X or O)

### Leaderboard
- **Real-time Updates**: Rankings update every 5 minutes
- **Player Stats**: Games played, win rate, total score
- **Ethos Integration**: Shows player's Ethos score and multiplier

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Wagmi + RainbowKit** - Wallet integration

### Backend
- **Socket.io** - Real-time communication
- **Node.js** - Game server
- **Base Network** - Blockchain integration

### Deployment
- **Vercel** - Frontend hosting
- **Railway/Render** - Game server hosting

## 📱 Farcaster Mini App Features

### Manifest Configuration
- **Proper Metadata**: Optimized for Farcaster discovery
- **Screenshots**: Portrait and landscape screenshots
- **Icons**: High-quality app icons
- **Categories**: Properly categorized as "games"

### Base Integration
- **Account Association**: Linked to your Farcaster account
- **Webhook Support**: Real-time updates from Farcaster
- **Base Chain**: Optimized for Base network transactions

## 🎨 UI/UX Features

### Design
- **Modern Interface**: Clean, aesthetic design
- **Responsive Layout**: Works on all screen sizes
- **Smooth Animations**: Delightful user experience
- **Color-coded Elements**: Easy to understand game state

### Accessibility
- **Keyboard Navigation**: Full keyboard support
- **Screen Reader Support**: Proper ARIA labels
- **High Contrast**: Clear visual hierarchy
- **Touch Friendly**: Optimized for mobile

## 🔧 Configuration

### Game Server Settings
```javascript
// server/game-server.js
const PORT = process.env.PORT || 3001
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:3000"
```

### Matchmaking Settings
```javascript
// Adjust matchmaking parameters
const avgWaitPerPosition = 5 // seconds per queue position
const maxQueueSize = 100 // maximum queue size
```

## 📊 Analytics & Monitoring

### Game Metrics
- **Player Count**: Track active players
- **Game Duration**: Average game length
- **Win Rates**: Player performance metrics
- **Queue Times**: Matchmaking efficiency

### Error Handling
- **Connection Recovery**: Automatic reconnection
- **Game State Sync**: Consistent game state
- **Error Logging**: Comprehensive error tracking

## 🚀 Deployment Checklist

- [ ] Deploy frontend to Vercel
- [ ] Deploy game server to hosting platform
- [ ] Set all environment variables
- [ ] Update manifest with account association
- [ ] Test on Base preview tool
- [ ] Verify wallet connection works
- [ ] Test matchmaking functionality
- [ ] Verify leaderboard updates
- [ ] Test on mobile devices
- [ ] Submit for Farcaster review

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

## 🆘 Support

- **Documentation**: [Base Mini Apps Docs](https://docs.base.org/mini-apps/)
- **Issues**: GitHub Issues
- **Community**: Farcaster channels

---

Built with ❤️ for the Farcaster community
