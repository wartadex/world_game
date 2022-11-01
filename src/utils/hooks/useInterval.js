import { useEffect, useRef } from 'react'

export function useInterval(callback, delay) {
  const savedCallback = useRef()

  // запомнить последний callback
  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  // установить интервал
  useEffect(() => {
    function tick() {
      savedCallback.current()
    }
    
    if (delay !== null) {
      let id = setInterval(tick, delay)

      return () => clearInterval(id)
    }
  }, [delay])
}