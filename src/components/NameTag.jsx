import { Html } from '@react-three/drei'
import { useStore } from '../store'
import { motion } from 'framer-motion'

export default function NameTag() {
  const { phase } = useStore()

  if (phase !== 'idle') return null

  return (
    <Html position={[0, 1.4, 0]} center>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        style={{
          fontFamily: 'monospace',
          textAlign: 'center',
          pointerEvents: 'none',
          whiteSpace: 'nowrap',
        }}
      >
        <div style={{
          color: '#ffffff',
          fontSize: '22px',
          fontWeight: 'bold',
          letterSpacing: '6px',
          textShadow: '0 0 20px #bf00ff, 0 0 40px #bf00ff66',
          marginBottom: '6px',
        }}>
          ALI ADABI
        </div>
        <div style={{
          color: '#00fff7',
          fontSize: '10px',
          letterSpacing: '4px',
          textShadow: '0 0 10px #00fff7',
        }}>
          FULL-STACK DEVELOPER
        </div>
      </motion.div>
    </Html>
  )
}