'use client'

import { motion } from 'framer-motion'
import { Users, Clock, X } from 'lucide-react'

interface MatchmakingQueueProps {
  queuePosition: number
  onCancel: () => void
}

export function MatchmakingQueue({ queuePosition, onCancel }: MatchmakingQueueProps) {
  const getEstimatedWaitTime = (position: number) => {
    // Estimate based on typical matchmaking times
    const avgWaitPerPosition = 5 // seconds
    return Math.max(1, position * avgWaitPerPosition)
  }

  const estimatedWait = getEstimatedWaitTime(queuePosition)

  return (
    <motion.div
      className="bg-white rounded-xl shadow-lg p-6 border-2 border-blue-200"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="text-center">
        <motion.div
          className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <Users className="w-8 h-8 text-white" />
        </motion.div>

        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          Finding Opponents
        </h3>

        <div className="space-y-3">
          <div className="flex items-center justify-center space-x-2">
            <Clock className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-600">
              Position in queue: <span className="font-semibold text-base-blue">{queuePosition}</span>
            </span>
          </div>

          <div className="text-sm text-gray-500">
            Estimated wait: ~{estimatedWait}s
          </div>

          {/* Progress bar */}
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(90, (queuePosition / 10) * 100)}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>

          <div className="text-xs text-gray-500">
            {queuePosition === 0 ? 'Matching you now...' : 'Waiting for available players...'}
          </div>
        </div>

        <button
          onClick={onCancel}
          className="mt-4 btn-secondary flex items-center space-x-2 mx-auto"
        >
          <X className="w-4 h-4" />
          <span>Cancel</span>
        </button>
      </div>
    </motion.div>
  )
}
