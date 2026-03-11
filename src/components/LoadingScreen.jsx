import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function LoadingScreen({ isLoaded }) {
  const [progress, setProgress] = useState(0)
  const [statusText, setStatusText] = useState('INITIALIZING SYSTEM...')
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const messages = [
      { time: 300, text: 'LOADING ASSETS...' },
      { time: 900, text: 'CALIBRATING DISPLAY...' },
      { time: 1500, text: 'BOOTING ARCADE OS...' },
      { time: 2200, text: 'SYSTEM READY.' },
    ]

    messages.forEach(({ time, text }) => {
      setTimeout(() => setStatusText(text), time)
    })

    // Fake progress until model loads
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 90) return p
        return p + Math.random() * 8
      })
    }, 200)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (isLoaded) {
      setProgress(100)
      setStatusText('SYSTEM READY.')
      setTimeout(() => setVisible(false), 800)
    }
  }, [isLoaded])

  const bars = 20
  const filled = Math.floor((Math.min(progress, 100) / 100) * bars)

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            position: 'fixed',
            inset: 0,
            background: '#000',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            fontFamily: 'monospace',
          }}
        >
          {/* Scanlines */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,247,0.02) 2px, rgba(0,255,247,0.02) 4px)',
            pointerEvents: 'none',
          }} />

          <div style={{ textAlign: 'center', width: '320px' }}>

            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div style={{
                color: '#fff',
                fontSize: '36px',
                fontWeight: 'bold',
                letterSpacing: '8px',
                textShadow: '0 0 30px #bf00ff, 0 0 60px #bf00ff44',
                marginBottom: '4px',
              }}>
                ALI ADABI
              </div>
              <div style={{
                color: '#00fff7',
                fontSize: '10px',
                letterSpacing: '6px',
                textShadow: '0 0 10px #00fff7',
                marginBottom: '48px',
              }}>
                FULL-STACK DEVELOPER
              </div>
            </motion.div>

            {/* Progress bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div style={{
                width: '100%',
                height: '6px',
                background: '#ffffff11',
                marginBottom: '16px',
                position: 'relative',
                overflow: 'hidden',
              }}>
                <motion.div
                  style={{
                    height: '100%',
                    background: 'linear-gradient(90deg, #bf00ff, #00fff7)',
                    boxShadow: '0 0 12px #00fff7',
                    width: `${Math.min(progress, 100)}%`,
                    transition: 'width 0.2s ease',
                  }}
                />
              </div>

              {/* Block bar */}
              <div style={{
                fontSize: '13px',
                letterSpacing: '2px',
                marginBottom: '16px',
                color: '#00fff7',
              }}>
                {'['}
                {'▓'.repeat(filled)}
                {'░'.repeat(bars - filled)}
                {']'}
                {' '}
                <span style={{ color: '#ffffff88' }}>
                  {Math.min(Math.floor(progress), 100)}%
                </span>
              </div>

              {/* Status text */}
              <motion.div
                key={statusText}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{
                  color: '#ffffff55',
                  fontSize: '10px',
                  letterSpacing: '3px',
                }}
              >
                {statusText}
              </motion.div>
            </motion.div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}