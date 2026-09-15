import { useState, useCallback } from 'react'

export function useUndoRedo(initialState = { nodes: [], edges: [] }) {
  const [history, setHistory] = useState([initialState])
  const [currentIndex, setCurrentIndex] = useState(0)

  const currentState = history[currentIndex] || initialState

  const takeSnapshot = useCallback((state) => {
    setHistory(prev => {
      const nextHistory = prev.slice(0, currentIndex + 1)
      return [...nextHistory, state]
    })
    setCurrentIndex(prev => prev + 1)
  }, [currentIndex])

  const undo = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1)
    }
  }, [currentIndex])

  const redo = useCallback(() => {
    if (currentIndex < history.length - 1) {
      setCurrentIndex(prev => prev + 1)
    }
  }, [currentIndex, history.length])

  const canUndo = currentIndex > 0
  const canRedo = currentIndex < history.length - 1

  return {
    currentState,
    takeSnapshot,
    undo,
    redo,
    canUndo,
    canRedo
  }
}
