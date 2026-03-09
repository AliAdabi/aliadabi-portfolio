import { motion } from 'framer-motion'
import { useStore } from '../store'

export default function IdlePrompt() {
  const { phase } = useStore()

  if (phase !== 'idle') return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: [0.4, 1, 0.4] }}
      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      style={{
        position: 'absolute',
        bottom: '40px',
        left: '50%',
        transform: 'translateX(-50%)',
        color: '#00fff7',
        fontFamily: 'monospace',
        fontSize: '13px',
        letterSpacing: '6px',
        pointerEvents: 'none',
        whiteSpace: 'nowrap',
      }}
    >
      ▸ CLICK TO START
    </motion.div>
  )
}