'use client'

import { motion } from 'framer-motion'
import { User, Star, Trophy, Zap } from 'lucide-react'
import { GamePlayer } from '@/contexts/GameContext'

interface PlayerCardProps {
  player: GamePlayer | null
  isCurrentTurn: boolean
  isWinner: boolean
  isMe: boolean
}

export function PlayerCard({ player, isCurrentTurn, isWinner, isMe }: PlayerCardProps) {
  if (!player) {
    return (
      <div className="player-card">
        <div className="text-center text-gray-500">
          <User className="w-8 h-8 mx-auto mb-2 opacity-50" />
          <p className="text-sm">Waiting for player...</p>
        </div>
      </div>
    )
  }

  const shortAddress = `${player.address.slice(0, 6)}...${player.address.slice(-4)}`

  return (
    <motion.div
      className={`player-card ${isCurrentTurn ? 'current-turn' : ''} ${isWinner ? 'winner' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center space-x-3">
        {/* Player Avatar */}
        <div className="relative">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
            player.symbol === 'X' 
              ? 'bg-blue-100 text-blue-600' 
              : 'bg-red-100 text-red-600'
          }`}>
            <span className="text-xl font-bold">{player.symbol}</span>
          </div>
          
          {/* Turn indicator */}
          {isCurrentTurn && (
            <motion.div
              className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          )}
          
          {/* Winner indicator */}
          {isWinner && (
            <motion.div
              className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-500 rounded-full flex items-center justify-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3, delay: 0.5 }}
            >
              <Trophy className="w-2.5 h-2.5 text-white" />
            </motion.div>
          )}
        </div>

        {/* Player Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2">
            <p className="text-sm font-medium text-gray-900 truncate">
              {isMe ? 'You' : shortAddress}
            </p>
            {isMe && (
              <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">
                You
              </span>
            )}
          </div>
          
          <div className="flex items-center space-x-2 mt-1">
            <div className="flex items-center space-x-1">
              <Star className="w-3 h-3 text-yellow-500" />
              <span className="text-xs text-gray-600">{player.ethosScore}</span>
            </div>
            
            <div className="flex items-center space-x-1">
              <Zap className="w-3 h-3 text-purple-500" />
              <span className="text-xs text-gray-600">
                {(player.ethosScore / 100).toFixed(1)}x
              </span>
            </div>
          </div>
        </div>

        {/* Score */}
        <div className="text-right">
          <p className="text-lg font-bold text-base-blue">
            {player.score.toLocaleString()}
          </p>
          <p className="text-xs text-gray-500">points</p>
        </div>
      </div>

      {/* Status indicators */}
      <div className="mt-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {isCurrentTurn && (
            <motion.div
              className="flex items-center space-x-1 text-green-600"
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span className="text-xs font-medium">Your turn</span>
            </motion.div>
          )}
          
          {isWinner && (
            <motion.div
              className="flex items-center space-x-1 text-yellow-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.5 }}
            >
              <Trophy className="w-3 h-3" />
              <span className="text-xs font-medium">Winner!</span>
            </motion.div>
          )}
        </div>

        <div className="text-xs text-gray-500">
          {player.isConnected ? 'Online' : 'Offline'}
        </div>
      </div>
    </motion.div>
  )
}
