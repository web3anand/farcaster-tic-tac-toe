const ROOT_URL = process.env.NEXT_PUBLIC_ROOT_URL || 'https://xo-chi.vercel.app';

export const minikitConfig = {
  accountAssociation: {
    // This will be added in step 5 after account association
    "header": "",
    "payload": "",
    "signature": ""
  },
  miniapp: {
    version: "1",
    name: "TicTacToe Battle", 
    subtitle: "Automatching Tic-Tac-Toe with Base", 
    description: "Play Tic-Tac-Toe against other players with automatic matching, leaderboards, and Base blockchain integration",
    screenshotUrls: [
      `${ROOT_URL}/screenshot-portrait.png`,
      `${ROOT_URL}/screenshot-landscape.png`
    ],
    iconUrl: `${ROOT_URL}/icon-512.png`,
    splashImageUrl: `${ROOT_URL}/splash-hero.png`,
    splashBackgroundColor: "#0052FF",
    homeUrl: ROOT_URL,
    webhookUrl: `${ROOT_URL}/api/webhook`,
    primaryCategory: "games",
    tags: ["tic-tac-toe", "multiplayer", "automatching", "base", "games", "leaderboard"],
    heroImageUrl: `${ROOT_URL}/hero-image.png`, 
    tagline: "Battle it out in the ultimate Tic-Tac-Toe experience",
    ogTitle: "TicTacToe Battle - Automatching Tic-Tac-Toe on Base",
    ogDescription: "Join the ultimate Tic-Tac-Toe battle with automatic matching, leaderboards, and Base blockchain rewards",
    ogImageUrl: `${ROOT_URL}/og-image.png`,
  },
} as const;
