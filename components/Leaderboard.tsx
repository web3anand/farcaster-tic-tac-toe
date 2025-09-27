'use client'

import { motion } from 'framer-motion'
import { Trophy, Medal, Award, Users, Star, Zap } from 'lucide-react'

interface LeaderboardEntry {
  rank: number
  address: string
  score: number
  gamesPlayed: number
  winRate: number
  ethosScore: number
}

interface LeaderboardProps {
  leaderboard: LeaderboardEntry[]
}

export function Leaderboard({ leaderboard }: LeaderboardProps) {
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-5 h-5 text-yellow-500" />
      case 2:
        return <Medal className="w-5 h-5 text-gray-400" />
      case 3:
        return <Award className="w-5 h-5 text-amber-600" />
      default:
        return <span className="w-5 h-5 text-gray-500 font-bold text-sm">{rank}</span>
    }
  }

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'from-yellow-50 to-orange-50 border-yellow-200'
      case 2:
        return 'from-gray-50 to-slate-50 border-gray-200'
      case 3:
        return 'from-amber-50 to-yellow-50 border-amber-200'
      default:
        return 'bg-gray-50 border-gray-100'
    }
  }

  return (
    <motion.div
      className="bg-white rounded-xl shadow-lg p-6"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
    >
      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
        <Users className="w-5 h-5 mr-2 text-base-blue" />
        Leaderboard
      </h3>

      {leaderboard.length === 0 ? (
        <div className="text-center text-gray-500 py-8">
          <Trophy className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p className="text-sm">No players yet</p>
          <p className="text-xs">Be the first to play!</p>
        </div>
      ) : (
        <div className="space-y-2">
          {leaderboard.map((entry, index) => (
            <motion.div
              key={entry.rank}
              className={`leaderboard-entry ${getRankColor(entry.rank)} ${
                entry.rank <= 3 ? 'top-3' : ''
              }`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <div className="flex items-center justify-center w-6">
                {getRankIcon(entry.rank)}
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {entry.address}
                </p>
                <div className="flex items-center space-x-3 mt-1">
                  <div className="flex items-center space-x-1">
                    <Star className="w-3 h-3 text-yellow-500" />
                    <span className="text-xs text-gray-500">{entry.ethosScore}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Zap className="w-3 h-3 text-purple-500" />
                    <span className="text-xs text-gray-500">
                      {(entry.ethosScore / 100).toFixed(1)}x
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <p className="text-sm font-bold text-base-blue">
                  {entry.score.toLocaleString()}
                </p>
                <p className="text-xs text-gray-500">
                  {entry.gamesPlayed} games • {entry.winRate}%
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>Rankings update every 5 minutes</span>
          <span>{leaderboard.length} players</span>
        </div>
      </div>
    </motion.div>
  )
}
