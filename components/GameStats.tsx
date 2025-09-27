'use client'

import { motion } from 'framer-motion'
import { BarChart3, Clock, Trophy, Target } from 'lucide-react'

interface GameStatsProps {
  gameHistory: Array<{
    id: string
    winner: string | null
    timestamp: number
    players: { X: string; O: string }
    duration: number
  }>
  isPlayerInGame: boolean
}

export function GameStats({ gameHistory, isPlayerInGame }: GameStatsProps) {
  const totalGames = gameHistory.length
  const wins = gameHistory.filter(game => game.winner !== null).length
  const ties = gameHistory.filter(game => game.winner === null).length
  const winRate = totalGames > 0 ? ((wins / totalGames) * 100).toFixed(1) : '0'
  const avgGameDuration = totalGames > 0 
    ? Math.round(gameHistory.reduce((sum, game) => sum + game.duration, 0) / totalGames)
    : 0

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <motion.div
      className="bg-white rounded-xl shadow-lg p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
        <BarChart3 className="w-5 h-5 mr-2 text-base-blue" />
        Game Statistics
      </h3>

      <div className="space-y-4">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-blue-50 p-3 rounded-lg text-center">
            <div className="text-2xl font-bold text-blue-600">{totalGames}</div>
            <div className="text-sm text-gray-600">Games Played</div>
          </div>
          <div className="bg-green-50 p-3 rounded-lg text-center">
            <div className="text-2xl font-bold text-green-600">{winRate}%</div>
            <div className="text-sm text-gray-600">Win Rate</div>
          </div>
        </div>

        {/* Detailed Stats */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Wins</span>
            <span className="font-semibold text-green-600">{wins}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Ties</span>
            <span className="font-semibold text-gray-600">{ties}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Avg Duration</span>
            <span className="font-semibold text-blue-600">{formatDuration(avgGameDuration)}</span>
          </div>
        </div>

        {/* Current Game Status */}
        {isPlayerInGame && (
          <motion.div
            className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg border border-green-200"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center space-x-2">
              <Target className="w-5 h-5 text-green-600" />
              <span className="text-sm font-medium text-green-700">Currently in game</span>
            </div>
          </motion.div>
        )}

        {/* Recent Games */}
        {gameHistory.length > 0 && (
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2 flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              Recent Games
            </p>
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {gameHistory.slice(-5).reverse().map((game, index) => (
                <motion.div
                  key={game.id}
                  className="flex justify-between items-center text-sm bg-gray-50 p-2 rounded"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <span className="text-gray-600">
                    {new Date(game.timestamp).toLocaleTimeString()}
                  </span>
                  <span className={`font-medium ${
                    game.winner === 'X' ? 'text-blue-600' :
                    game.winner === 'O' ? 'text-red-600' :
                    'text-gray-600'
                  }`}>
                    {game.winner ? `${game.winner} won` : 'Tie'}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {gameHistory.length === 0 && (
          <div className="text-center text-gray-500 py-4">
            <Trophy className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No games played yet</p>
            <p className="text-xs">Start playing to see your stats!</p>
          </div>
        )}
      </div>
    </motion.div>
  )
}
