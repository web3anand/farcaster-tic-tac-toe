const { Server } = require('socket.io')
const http = require('http')
const express = require('express')

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    methods: ["GET", "POST"]
  }
})

// Game state management
const games = new Map()
const matchmakingQueue = []
const leaderboard = []
const gameHistory = []

// Player data
const players = new Map()

// Game logic
class TicTacToeGame {
  constructor(id, playerX, playerO) {
    this.id = id
    this.board = Array(9).fill(null)
    this.currentPlayer = 'X'
    this.winner = null
    this.players = { X: playerX, O: playerO }
    this.startTime = Date.now()
    this.moves = []
  }

  makeMove(position, player) {
    if (this.board[position] !== null || this.winner !== null || this.currentPlayer !== player) {
      return false
    }

    this.board[position] = player
    this.moves.push({ position, player, timestamp: Date.now() })
    
    // Check for winner
    this.winner = this.checkWinner()
    
    if (this.winner) {
      this.endGame()
    } else if (this.board.every(cell => cell !== null)) {
      this.winner = 'tie'
      this.endGame()
    } else {
      this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X'
    }

    return true
  }

  checkWinner() {
    const winningCombinations = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6] // diagonals
    ]

    for (const [a, b, c] of winningCombinations) {
      if (this.board[a] && this.board[a] === this.board[b] && this.board[a] === this.board[c]) {
        return this.board[a]
      }
    }
    return null
  }

  endGame() {
    const duration = Date.now() - this.startTime
    
    // Update player scores
    if (this.winner && this.winner !== 'tie') {
      const winnerPlayer = this.players[this.winner]
      const basePoints = 100
      const multiplier = winnerPlayer.ethosScore / 100
      const points = Math.floor(basePoints * multiplier)
      
      winnerPlayer.score += points
      players.set(winnerPlayer.address, winnerPlayer)
    }

    // Add to game history
    const historyEntry = {
      id: this.id,
      winner: this.winner,
      timestamp: Date.now(),
      players: {
        X: this.players.X.address,
        O: this.players.O.address
      },
      duration: Math.floor(duration / 1000)
    }
    
    gameHistory.push(historyEntry)
    
    // Update leaderboard
    updateLeaderboard()
    
    // Notify clients
    io.emit('game_finished', {
      gameId: this.id,
      winner: this.winner,
      board: this.board
    })
    
    io.emit('leaderboard_update', { leaderboard })
    io.emit('game_history_update', { history: gameHistory.slice(-50) })
  }
}

function updateLeaderboard() {
  const playerList = Array.from(players.values())
    .map(player => ({
      address: player.address,
      score: player.score,
      gamesPlayed: player.gamesPlayed || 0,
      winRate: player.winRate || 0,
      ethosScore: player.ethosScore
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 100)

  leaderboard.length = 0
  leaderboard.push(...playerList.map((player, index) => ({
    rank: index + 1,
    ...player
  })))
}

// Socket.io connection handling
io.on('connection', (socket) => {
  console.log('User connected:', socket.id)

  socket.on('join', async (data) => {
    const { address } = data
    
    // Create or update player
    if (!players.has(address)) {
      players.set(address, {
        address,
        score: 0,
        gamesPlayed: 0,
        winRate: 0,
        ethosScore: Math.floor(Math.random() * 1000) + 100, // Mock Ethos score
        isConnected: true
      })
    } else {
      const player = players.get(address)
      player.isConnected = true
      players.set(address, player)
    }

    socket.address = address
    socket.join(`player_${address}`)
    
    // Send current leaderboard and game history
    socket.emit('leaderboard_update', { leaderboard })
    socket.emit('game_history_update', { history: gameHistory.slice(-50) })
    
    console.log('Player joined:', address)
  })

  socket.on('start_matchmaking', (data) => {
    const { address } = data
    
    if (!matchmakingQueue.includes(address)) {
      matchmakingQueue.push(address)
      console.log('Player started matchmaking:', address)
    }
    
    // Notify queue position
    const position = matchmakingQueue.indexOf(address)
    socket.emit('matchmaking_update', { position })
    
    // Try to match players
    if (matchmakingQueue.length >= 2) {
      const player1Address = matchmakingQueue.shift()
      const player2Address = matchmakingQueue.shift()
      
      const player1 = players.get(player1Address)
      const player2 = players.get(player2Address)
      
      if (player1 && player2) {
        const gameId = `game_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
        const game = new TicTacToeGame(gameId, player1, player2)
        games.set(gameId, game)
        
        // Notify both players
        io.to(`player_${player1Address}`).emit('game_matched', {
          gameId,
          players: {
            X: { ...player1, symbol: 'X', isCurrentTurn: true },
            O: { ...player2, symbol: 'O', isCurrentTurn: false }
          }
        })
        
        io.to(`player_${player2Address}`).emit('game_matched', {
          gameId,
          players: {
            X: { ...player1, symbol: 'X', isCurrentTurn: true },
            O: { ...player2, symbol: 'O', isCurrentTurn: false }
          }
        })
        
        console.log('Game matched:', gameId, player1Address, player2Address)
      }
    }
  })

  socket.on('stop_matchmaking', (data) => {
    const { address } = data
    const index = matchmakingQueue.indexOf(address)
    
    if (index > -1) {
      matchmakingQueue.splice(index, 1)
      console.log('Player stopped matchmaking:', address)
    }
  })

  socket.on('make_move', (data) => {
    const { gameId, position, player } = data
    const game = games.get(gameId)
    
    if (game && game.makeMove(position, player)) {
      // Notify both players
      io.to(`player_${game.players.X.address}`).emit('move_made', {
        position,
        player,
        board: game.board,
        currentPlayer: game.currentPlayer
      })
      
      io.to(`player_${game.players.O.address}`).emit('move_made', {
        position,
        player,
        board: game.board,
        currentPlayer: game.currentPlayer
      })
      
      console.log('Move made:', gameId, position, player)
    }
  })

  socket.on('disconnect', () => {
    if (socket.address) {
      const player = players.get(socket.address)
      if (player) {
        player.isConnected = false
        players.set(socket.address, player)
      }
      
      // Remove from matchmaking queue
      const index = matchmakingQueue.indexOf(socket.address)
      if (index > -1) {
        matchmakingQueue.splice(index, 1)
      }
      
      console.log('Player disconnected:', socket.address)
    }
  })
})

const PORT = process.env.PORT || 3001
server.listen(PORT, () => {
  console.log(`Game server running on port ${PORT}`)
})
