'use client'

import React, { createContext, useContext, useReducer, useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import { io, Socket } from 'socket.io-client'

export type Player = 'X' | 'O' | null
export type GameStatus = 'waiting' | 'matching' | 'playing' | 'finished' | 'disconnected'

export interface GamePlayer {
  id: string
  address: string
  symbol: Player
  score: number
  ethosScore: number
  isConnected: boolean
  isCurrentTurn: boolean
}

export interface GameState {
  id: string | null
  board: Player[]
  currentPlayer: Player
  winner: Player
  status: GameStatus
  players: {
    X: GamePlayer | null
    O: GamePlayer | null
  }
  isMatching: boolean
  matchmakingQueue: number
  gameHistory: Array<{
    id: string
    winner: Player
    timestamp: number
    players: { X: string; O: string }
    duration: number
  }>
  leaderboard: Array<{
    rank: number
    address: string
    score: number
    gamesPlayed: number
    winRate: number
    ethosScore: number
  }>
}

type GameAction =
  | { type: 'START_MATCHMAKING' }
  | { type: 'STOP_MATCHMAKING' }
  | { type: 'UPDATE_QUEUE_POSITION'; position: number }
  | { type: 'GAME_MATCHED'; gameId: string; players: { X: GamePlayer; O: GamePlayer } }
  | { type: 'GAME_STARTED'; gameId: string }
  | { type: 'MOVE_MADE'; position: number; player: Player }
  | { type: 'GAME_FINISHED'; winner: Player }
  | { type: 'GAME_DISCONNECTED' }
  | { type: 'UPDATE_LEADERBOARD'; leaderboard: GameState['leaderboard'] }
  | { type: 'UPDATE_GAME_HISTORY'; history: GameState['gameHistory'] }
  | { type: 'RESET_GAME' }

const initialState: GameState = {
  id: null,
  board: Array(9).fill(null),
  currentPlayer: 'X',
  winner: null,
  status: 'waiting',
  players: {
    X: null,
    O: null,
  },
  isMatching: false,
  matchmakingQueue: 0,
  gameHistory: [],
  leaderboard: [],
}

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'START_MATCHMAKING':
      return {
        ...state,
        isMatching: true,
        status: 'matching',
        matchmakingQueue: 0,
      }
    
    case 'STOP_MATCHMAKING':
      return {
        ...state,
        isMatching: false,
        status: 'waiting',
        matchmakingQueue: 0,
      }
    
    case 'UPDATE_QUEUE_POSITION':
      return {
        ...state,
        matchmakingQueue: action.position,
      }
    
    case 'GAME_MATCHED':
      return {
        ...state,
        id: action.gameId,
        players: action.players,
        status: 'playing',
        isMatching: false,
        matchmakingQueue: 0,
        board: Array(9).fill(null),
        currentPlayer: 'X',
        winner: null,
      }
    
    case 'GAME_STARTED':
      return {
        ...state,
        status: 'playing',
      }
    
    case 'MOVE_MADE':
      const newBoard = [...state.board]
      newBoard[action.position] = action.player
      
      const newCurrentPlayer = action.player === 'X' ? 'O' : 'X'
      
      return {
        ...state,
        board: newBoard,
        currentPlayer: newCurrentPlayer,
        players: {
          X: state.players.X ? {
            ...state.players.X,
            isCurrentTurn: newCurrentPlayer === 'X'
          } : null,
          O: state.players.O ? {
            ...state.players.O,
            isCurrentTurn: newCurrentPlayer === 'O'
          } : null,
        },
      }
    
    case 'GAME_FINISHED':
      return {
        ...state,
        winner: action.winner,
        status: 'finished',
        players: {
          X: state.players.X ? { ...state.players.X, isCurrentTurn: false } : null,
          O: state.players.O ? { ...state.players.O, isCurrentTurn: false } : null,
        },
      }
    
    case 'GAME_DISCONNECTED':
      return {
        ...state,
        status: 'disconnected',
        isMatching: false,
      }
    
    case 'UPDATE_LEADERBOARD':
      return {
        ...state,
        leaderboard: action.leaderboard,
      }
    
    case 'UPDATE_GAME_HISTORY':
      return {
        ...state,
        gameHistory: action.history,
      }
    
    case 'RESET_GAME':
      return {
        ...state,
        id: null,
        board: Array(9).fill(null),
        currentPlayer: 'X',
        winner: null,
        status: 'waiting',
        players: { X: null, O: null },
        isMatching: false,
        matchmakingQueue: 0,
      }
    
    default:
      return state
  }
}

interface GameContextType {
  state: GameState
  dispatch: React.Dispatch<GameAction>
  socket: Socket | null
  startMatchmaking: () => void
  stopMatchmaking: () => void
  makeMove: (position: number) => void
  resetGame: () => void
  isMyTurn: boolean
  isPlayerInGame: boolean
}

const GameContext = createContext<GameContextType | undefined>(undefined)

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, initialState)
  const [socket, setSocket] = useState<Socket | null>(null)
  const { address, isConnected } = useAccount()

  useEffect(() => {
    if (isConnected && address) {
      const newSocket = io(process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3001')
      
      newSocket.on('connect', () => {
        console.log('Connected to game server')
        newSocket.emit('join', { address })
      })

      newSocket.on('matchmaking_update', (data) => {
        dispatch({ type: 'UPDATE_QUEUE_POSITION', position: data.position })
      })

      newSocket.on('game_matched', (data) => {
        dispatch({ type: 'GAME_MATCHED', gameId: data.gameId, players: data.players })
      })

      newSocket.on('game_started', (data) => {
        dispatch({ type: 'GAME_STARTED', gameId: data.gameId })
      })

      newSocket.on('move_made', (data) => {
        dispatch({ type: 'MOVE_MADE', position: data.position, player: data.player })
      })

      newSocket.on('game_finished', (data) => {
        dispatch({ type: 'GAME_FINISHED', winner: data.winner })
      })

      newSocket.on('player_disconnected', () => {
        dispatch({ type: 'GAME_DISCONNECTED' })
      })

      newSocket.on('leaderboard_update', (data) => {
        dispatch({ type: 'UPDATE_LEADERBOARD', leaderboard: data.leaderboard })
      })

      newSocket.on('game_history_update', (data) => {
        dispatch({ type: 'UPDATE_GAME_HISTORY', history: data.history })
      })

      setSocket(newSocket)

      return () => {
        newSocket.disconnect()
      }
    }
  }, [isConnected, address])

  const startMatchmaking = () => {
    if (socket && isConnected) {
      socket.emit('start_matchmaking', { address })
      dispatch({ type: 'START_MATCHMAKING' })
    }
  }

  const stopMatchmaking = () => {
    if (socket && isConnected) {
      socket.emit('stop_matchmaking', { address })
      dispatch({ type: 'STOP_MATCHMAKING' })
    }
  }

  const makeMove = (position: number) => {
    if (socket && state.status === 'playing' && isMyTurn) {
      socket.emit('make_move', { 
        gameId: state.id, 
        position, 
        player: state.currentPlayer 
      })
    }
  }

  const resetGame = () => {
    dispatch({ type: 'RESET_GAME' })
  }

  const isMyTurn = Boolean(state.currentPlayer && state.players[state.currentPlayer]?.address === address)
  const isPlayerInGame = state.players.X?.address === address || state.players.O?.address === address

  return (
    <GameContext.Provider value={{
      state,
      dispatch,
      socket,
      startMatchmaking,
      stopMatchmaking,
      makeMove,
      resetGame,
      isMyTurn,
      isPlayerInGame,
    }}>
      {children}
    </GameContext.Provider>
  )
}

export function useGame() {
  const context = useContext(GameContext)
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider')
  }
  return context
}
