import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { projects } from '../data/projects'
import { useStore } from '../store'

export default function ScreenUI() {
  const [selected, setSelected] = useState(null)
  const { setPhase } = useStore()

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      style={{
        fontFamily: 'monospace',
        pointerEvents: 'auto',
      }}
    >
      <div style={{
        width: '420px',
        border: '1px solid #00fff7',
        background: 'rgba(0,0,0,0.92)',
        padding: '28px',
        boxShadow: '0 0 40px #00fff755, inset 0 0 20px #00000088',
        position: 'relative',
      }}>
        {/* Scanline overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,247,0.03) 2px, rgba(0,255,247,0.03) 4px)',
          pointerEvents: 'none',
        }} />

        <AnimatePresence mode="wait">
          {selected === null ? (
            <motion.div
              key="menu"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <div style={{ color: '#00fff7', marginBottom: '8px', fontSize: '10px', letterSpacing: '4px' }}>
                ▸ SYSTEM ONLINE
              </div>
              <div style={{ color: '#fff', fontSize: '22px', fontWeight: 'bold', marginBottom: '4px', letterSpacing: '2px' }}>
                ALI ADABI
              </div>
              <div style={{ color: '#bf00ff', fontSize: '11px', letterSpacing: '3px', marginBottom: '32px' }}>
                FULL-STACK DEVELOPER
              </div>

              <div style={{ color: '#00fff755', fontSize: '10px', letterSpacing: '3px', marginBottom: '12px' }}>
                SELECT PROJECT
              </div>
              {projects.map((p, i) => (
                <motion.div
                  key={p.id}
                  whileHover={{ x: 8, color: '#00fff7' }}
                  onClick={() => setSelected(p)}
                  style={{
                    color: '#ffffffbb',
                    padding: '10px 0',
                    borderBottom: '1px solid #ffffff11',
                    cursor: 'pointer',
                    fontSize: '13px',
                    letterSpacing: '2px',
                    display: 'flex',
                    gap: '12px',
                    alignItems: 'center',
                    transition: 'color 0.2s',
                  }}
                >
                  <span style={{ color: '#bf00ff' }}>[ 0{i + 1} ]</span>
                  {p.title}
                </motion.div>
              ))}

              <div style={{ marginTop: '24px', color: '#ffffff33', fontSize: '10px', letterSpacing: '2px' }}>
                HOVER TO SELECT · CLICK TO OPEN
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="project"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <div
                onClick={() => setSelected(null)}
                style={{ color: '#00fff7', fontSize: '11px', letterSpacing: '3px', marginBottom: '24px', cursor: 'pointer' }}
              >
                ◄ BACK
              </div>

              <div style={{ color: '#bf00ff', fontSize: '10px', letterSpacing: '4px', marginBottom: '8px' }}>
                PROJECT
              </div>
              <div style={{ color: '#fff', fontSize: '20px', fontWeight: 'bold', letterSpacing: '2px', marginBottom: '16px' }}>
                {selected.title}
              </div>
              <div style={{ color: '#ffffffaa', fontSize: '12px', lineHeight: '1.8', marginBottom: '24px' }}>
                {selected.description}
              </div>

              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '28px' }}>
                {selected.tech.map(t => (
                  <span key={t} style={{
                    border: '1px solid #bf00ff',
                    color: '#bf00ff',
                    padding: '2px 10px',
                    fontSize: '10px',
                    letterSpacing: '2px',
                  }}>
                    {t}
                  </span>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '16px' }}>
                <a href={selected.github} target="_blank" rel="noreferrer" style={{
                  color: '#00fff7', fontSize: '11px', letterSpacing: '2px', textDecoration: 'none',
                  border: '1px solid #00fff7', padding: '6px 16px',
                }}>
                  GITHUB ↗
                </a>
                {selected.live && (
                  <a href={selected.live} target="_blank" rel="noreferrer" style={{
                    color: '#000', background: '#00fff7', fontSize: '11px', letterSpacing: '2px',
                    textDecoration: 'none', padding: '6px 16px',
                  }}>
                    LIVE ↗
                  </a>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}