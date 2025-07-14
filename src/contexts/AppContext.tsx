"use client"

import type React from "react"
import { createContext, useContext, useReducer, useEffect, type ReactNode } from "react"
import type { User, TrafficFine } from "@/lib/types"

interface AppState {
  user: User | null
  searchResults: TrafficFine[]
  isLoading: boolean
  error: string | null
  isHydrated: boolean // New field to track hydration status
}

type AppAction =
  | { type: "SET_USER"; payload: User | null }
  | { type: "SET_SEARCH_RESULTS"; payload: TrafficFine[] }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null }
  | { type: "CLEAR_ERROR" }
  | { type: "HYDRATE_STATE"; payload: Partial<AppState> }
  | { type: "SET_HYDRATED"; payload: boolean }

const initialState: AppState = {
  user: null,
  searchResults: [],
  isLoading: false,
  error: null,
  isHydrated: false,
}

// Define which parts of state should be persisted
const PERSISTED_KEYS = ['user'] as const
const STORAGE_KEY = 'app_state'

// Utility functions for localStorage operations
const storage = {
  get: (key: string) => {
    if (typeof window === 'undefined') return null
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : null
    } catch (error) {
      console.warn(`Error reading from localStorage:`, error)
      return null
    }
  },
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  set: (key: string, value: any) => {
    if (typeof window === 'undefined') return
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.warn(`Error writing to localStorage:`, error)
    }
  },
  
  remove: (key: string) => {
    if (typeof window === 'undefined') return
    try {
      localStorage.removeItem(key)
    } catch (error) {
      console.warn(`Error removing from localStorage:`, error)
    }
  }
}

function appReducer(state: AppState, action: AppAction): AppState {
  let newState: AppState

  switch (action.type) {
    case "SET_USER":
      newState = { ...state, user: action.payload }
      break
    case "SET_SEARCH_RESULTS":
      newState = { ...state, searchResults: action.payload }
      break
    case "SET_LOADING":
      newState = { ...state, isLoading: action.payload }
      break
    case "SET_ERROR":
      newState = { ...state, error: action.payload }
      break
    case "CLEAR_ERROR":
      newState = { ...state, error: null }
      break
    case "HYDRATE_STATE":
      newState = { ...state, ...action.payload, isHydrated: true }
      break
    case "SET_HYDRATED":
      newState = { ...state, isHydrated: action.payload }
      break
    default:
      return state
  }

  // Persist relevant state changes to localStorage
  if (state.isHydrated && action.type !== "HYDRATE_STATE" && action.type !== "SET_HYDRATED") {
    const persistedState: Partial<AppState> = {}
    PERSISTED_KEYS.forEach(key => {
      if (key in newState) {
        persistedState[key] = newState[key]
      }
    })
    storage.set(STORAGE_KEY, persistedState)
  }

  return newState
}

const AppContext = createContext<{
  state: AppState
  dispatch: React.Dispatch<AppAction>
} | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState)

  // Hydrate state from localStorage on mount
  useEffect(() => {
    const persistedState = storage.get(STORAGE_KEY)
    
    if (persistedState) {
      // Validate the persisted state structure
      const validatedState: Partial<AppState> = {}
      
      PERSISTED_KEYS.forEach(key => {
        if (key in persistedState) {
          validatedState[key] = persistedState[key]
        }
      })
      
      if (Object.keys(validatedState).length > 0) {
        dispatch({ type: "HYDRATE_STATE", payload: validatedState })
      } else {
        dispatch({ type: "SET_HYDRATED", payload: true })
      }
    } else {
      dispatch({ type: "SET_HYDRATED", payload: true })
    }
  }, [])

  // Clear persisted state when user logs out
  useEffect(() => {
    if (state.isHydrated && state.user === null) {
      // Only clear if we had a user before (to distinguish from initial state)
      const previousState = storage.get(STORAGE_KEY)
      if (previousState?.user) {
        storage.remove(STORAGE_KEY)
      }
    }
  }, [state.user, state.isHydrated])

  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>
}

export function useApp() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error("useApp must be used within an AppProvider")
  }
  return context
}

// Custom hook for checking if state is ready (hydrated)
export function useAppReady() {
  const { state } = useApp()
  return state.isHydrated
}

// Custom hook for user authentication status
export function useAuth() {
  const { state } = useApp()
  return {
    user: state.user,
    isAuthenticated: state.user !== null,
    isReady: state.isHydrated,
  }
}