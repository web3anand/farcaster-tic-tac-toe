'use client'

import { useState, useEffect } from 'react'
import { useAccount, useConnect } from 'wagmi'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useGame } from '@/contexts/GameContext'
import { GameBoard } from '@/components/GameBoard'
import { PlayerCard } from '@/components/PlayerCard'
import { Leaderboard } from '@/components/Leaderboard'
import { MatchmakingQueue } from '@/components/MatchmakingQueue'
import { GameStats } from '@/components/GameStats'
import { motion, AnimatePresence } from 'framer-motion'
import { Trophy, Users, Gamepad2, Zap, Target, Clock } from 'lucide-react'
import toast from 'react-hot-toast'

export default function Home() {
  const { address, isConnected } = useAccount()
  const { state, startMatchmaking, stopMatchmaking, makeMove, resetGame, isMyTurn, isPlayerInGame } = useGame()
  const [showLeaderboard, setShowLeaderboard] = useState(false)

  // Auto-start matchmaking when connected
  useEffect(() => {
    if (isConnected && address && !state.isMatching && state.status === 'waiting') {
      // Auto-start matchmaking after a short delay
      const timer = setTimeout(() => {
        startMatchmaking()
        toast.success('Started looking for opponents!')
      }, 1000)
      
      return () => clearTimeout(timer)
    }
  }, [isConnected, address, state.isMatching, state.status, startMatchmaking])

  const handleCellClick = (index: number) => {
    if (state.board[index] || state.winner || !isMyTurn || state.status !== 'playing') {
      return
    }
    makeMove(index)
  }

  const handleStartMatchmaking = () => {
    if (isConnected && address) {
      startMatchmaking()
      toast.success('Started looking for opponents!')
    } else {
      toast.error('Please connect your wallet first')
    }
  }

  const handleStopMatchmaking = () => {
    stopMatchmaking()
    toast.success('Stopped looking for opponents')
  }

  const getGameStatusMessage = () => {
    switch (state.status) {
      case 'waiting':
        return 'Connect your wallet to start playing'
      case 'matching':
        return `Looking for opponents... (${state.matchmakingQueue} in queue)`
      case 'playing':
        return isMyTurn ? "Your turn!" : "Opponent's turn"
      case 'finished':
        return state.winner ? `${state.winner} wins!` : "It's a tie!"
      case 'disconnected':
        return 'Opponent disconnected'
      default:
        return 'Ready to play'
    }
  }

  const getWinningCells = () => {
    const winningCombinations = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6] // diagonals
    ]

    for (const [a, b, c] of winningCombinations) {
      if (state.board[a] && state.board[a] === state.board[b] && state.board[a] === state.board[c]) {
        return [a, b, c]
      }
    }
    return []
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.header 
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
            TicTacToe <span className="text-base-blue">Battle</span>
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Automatching multiplayer Tic-Tac-Toe with Base blockchain integration
          </p>
          
          <div className="flex justify-center mb-6">
            <ConnectButton />
          </div>
        </motion.header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Game Area */}
          <div className="lg:col-span-3">
            <motion.div
              className="bg-white rounded-2xl shadow-xl p-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {/* Game Status */}
              <div className="text-center mb-6">
                <motion.div 
                  className="text-lg font-semibold"
                  key={state.status}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {state.status === 'matching' && (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-base-blue"></div>
                      <span className="text-base-blue">{getGameStatusMessage()}</span>
                    </div>
                  )}
                  {state.status === 'playing' && (
                    <div className={`flex items-center justify-center space-x-2 ${
                      isMyTurn ? 'text-green-600' : 'text-gray-600'
                    }`}>
                      <Target className="w-5 h-5" />
                      <span>{getGameStatusMessage()}</span>
                    </div>
                  )}
                  {state.status === 'finished' && (
                    <div className="text-green-600 flex items-center justify-center space-x-2">
                      <Trophy className="w-5 h-5" />
                      <span>{getGameStatusMessage()}</span>
                    </div>
                  )}
                  {state.status === 'waiting' && (
                    <span className="text-gray-600">{getGameStatusMessage()}</span>
                  )}
                  {state.status === 'disconnected' && (
                    <span className="text-red-600">{getGameStatusMessage()}</span>
                  )}
                </motion.div>
              </div>

              {/* Players */}
              {state.status === 'playing' && (
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <PlayerCard 
                    player={state.players.X} 
                    isCurrentTurn={state.currentPlayer === 'X'}
                    isWinner={state.winner === 'X'}
                    isMe={state.players.X?.address === address}
                  />
                  <PlayerCard 
                    player={state.players.O} 
                    isCurrentTurn={state.currentPlayer === 'O'}
                    isWinner={state.winner === 'O'}
                    isMe={state.players.O?.address === address}
                  />
                </div>
              )}

              {/* Game Board */}
              <GameBoard
                board={state.board}
                onCellClick={handleCellClick}
                winner={state.winner}
                currentPlayer={state.currentPlayer || 'X'}
                winningCells={getWinningCells()}
                isMyTurn={isMyTurn}
                status={state.status}
              />

              {/* Game Controls */}
              <div className="flex justify-center mt-6 space-x-4">
                {state.status === 'waiting' && (
                  <button
                    onClick={handleStartMatchmaking}
                    disabled={!isConnected}
                    className="btn-primary flex items-center space-x-2"
                  >
                    <Zap className="w-4 h-4" />
                    <span>Find Match</span>
                  </button>
                )}
                
                {state.status === 'matching' && (
                  <button
                    onClick={handleStopMatchmaking}
                    className="btn-danger flex items-center space-x-2"
                  >
                    <Clock className="w-4 h-4" />
                    <span>Cancel Match</span>
                  </button>
                )}
                
                {state.status === 'finished' && (
                  <button
                    onClick={resetGame}
                    className="btn-primary flex items-center space-x-2"
                  >
                    <Gamepad2 className="w-4 h-4" />
                    <span>Play Again</span>
                  </button>
                )}
                
                <button
                  onClick={() => setShowLeaderboard(!showLeaderboard)}
                  className="btn-secondary flex items-center space-x-2"
                >
                  <Trophy className="w-4 h-4" />
                  <span>Leaderboard</span>
                </button>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Matchmaking Queue */}
            {state.isMatching && (
              <MatchmakingQueue 
                queuePosition={state.matchmakingQueue}
                onCancel={handleStopMatchmaking}
              />
            )}

            {/* Game Stats */}
            <GameStats 
              gameHistory={state.gameHistory}
              isPlayerInGame={isPlayerInGame}
            />

            {/* Leaderboard */}
            <AnimatePresence>
              {showLeaderboard && (
                <Leaderboard leaderboard={state.leaderboard} />
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}
