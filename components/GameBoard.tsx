'use client'

import { motion } from 'framer-motion'
import { X, Circle } from 'lucide-react'
import { GameStatus } from '@/contexts/GameContext'

interface GameBoardProps {
  board: (string | null)[]
  onCellClick: (index: number) => void
  winner: string | null
  currentPlayer: string
  winningCells: number[]
  isMyTurn: boolean
  status: GameStatus
}

export function GameBoard({ 
  board, 
  onCellClick, 
  winner, 
  currentPlayer, 
  winningCells, 
  isMyTurn, 
  status 
}: GameBoardProps) {
  const canMakeMove = (index: number) => {
    return board[index] === null && 
           winner === null && 
           status === 'playing' && 
           isMyTurn
  }

  return (
    <div className="flex flex-col items-center">
      {/* Game Grid */}
      <div className="grid grid-cols-3 gap-2 bg-gray-200 p-4 rounded-xl">
        {board.map((cell, index) => (
          <motion.button
            key={index}
            className={`game-cell ${
              cell === 'X' ? 'x' : cell === 'O' ? 'o' : ''
            } ${
              winningCells.includes(index) ? 'winner' : ''
            } ${
              !canMakeMove(index) ? 'disabled' : ''
            }`}
            onClick={() => onCellClick(index)}
            whileHover={canMakeMove(index) ? { scale: 1.05 } : {}}
            whileTap={canMakeMove(index) ? { scale: 0.95 } : {}}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ 
              duration: 0.3, 
              delay: index * 0.05,
              type: "spring",
              stiffness: 200
            }}
            disabled={!canMakeMove(index)}
          >
            {cell === 'X' && (
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.4, type: "spring" }}
              >
                <X className="w-8 h-8" />
              </motion.div>
            )}
            {cell === 'O' && (
              <motion.div
                initial={{ scale: 0, rotate: 180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.4, type: "spring" }}
              >
                <Circle className="w-8 h-8" />
              </motion.div>
            )}
            
            {/* Hover effect for empty cells */}
            {!cell && canMakeMove(index) && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-20"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 0.2 }}
                transition={{ duration: 0.2 }}
              >
                {currentPlayer === 'X' ? (
                  <X className="w-8 h-8 text-game-x" />
                ) : (
                  <Circle className="w-8 h-8 text-game-o" />
                )}
              </motion.div>
            )}
          </motion.button>
        ))}
      </div>

      {/* Winner Animation */}
      {winner && (
        <motion.div
          className="mt-6 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <motion.div
            className="text-6xl mb-2"
            animate={{ 
              rotate: [0, 10, -10, 10, -10, 0],
              scale: [1, 1.1, 1, 1.1, 1]
            }}
            transition={{ 
              duration: 1,
              repeat: 2,
              ease: "easeInOut"
            }}
          >
            🎉
          </motion.div>
          <p className="text-xl font-bold text-green-600">
            {winner === 'X' ? 'X Wins!' : 'O Wins!'}
          </p>
        </motion.div>
      )}

      {/* Turn Indicator */}
      {status === 'playing' && !winner && (
        <motion.div
          className="mt-4 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full ${
            isMyTurn 
              ? 'bg-green-100 text-green-700 border border-green-300' 
              : 'bg-gray-100 text-gray-600'
          }`}>
            <div className={`w-3 h-3 rounded-full ${
              isMyTurn ? 'bg-green-500 animate-pulse' : 'bg-gray-400'
            }`} />
            <span className="text-sm font-medium">
              {isMyTurn ? 'Your turn' : 'Waiting for opponent'}
            </span>
          </div>
        </motion.div>
      )}
    </div>
  )
}
