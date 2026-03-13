import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { projects } from '../data/projects'
import { useStore } from '../store'
import AboutScreen from './AboutScreen'
import ContactScreen from './ContactScreen'

export default function ScreenUI() {
  const [view, setView] = useState('menu') // menu | project | about | contact
  const [selected, setSelected] = useState(null)
  const [highlighted, setHighlighted] = useState(0)
  const { setPhase } = useStore()

  useEffect(() => {
    const handleUp = () => setHighlighted(i => Math.max(0, i - 1))
    const handleDown = () => setHighlighted(i => Math.min(projects.length - 1, i + 1))

    const handleKey = (e) => {
      if (e.key === 'ArrowUp') handleUp()
      if (e.key === 'ArrowDown') handleDown()
      if (e.key === 'Enter' && view === 'menu') {
        setSelected(projects[highlighted])
        setView('project')
      }
    }

    window.addEventListener('arcade:up', handleUp)
    window.addEventListener('arcade:down', handleDown)
    window.addEventListener('keydown', handleKey)

    return () => {
      window.removeEventListener('arcade:up', handleUp)
      window.removeEventListener('arcade:down', handleDown)
      window.removeEventListener('keydown', handleKey)
    }
  }, [highlighted, view])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      style={{ fontFamily: 'monospace', pointerEvents: 'auto' }}
    >
      <div style={{
        width: '420px',
        height: '340px',
        border: '1px solid #00fff7',
        background: 'rgba(0,0,0,0.92)',
        padding: '28px',
        boxShadow: '0 0 40px #00fff755, inset 0 0 20px #00000088',
        position: 'relative',
        overflow: 'hidden',
      }}>

        {/* Scanline overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,247,0.03) 2px, rgba(0,255,247,0.03) 4px)',
          pointerEvents: 'none',
          zIndex: 10,
        }} />

        <AnimatePresence mode="wait">

          {/* MAIN MENU */}
          {view === 'menu' && (
            <motion.div
              key="menu"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              style={{ height: '100%' }}
            >
              <div style={{ color: '#00fff7', marginBottom: '4px', fontSize: '10px', letterSpacing: '4px' }}>
                ▸ SYSTEM ONLINE
              </div>
              <div style={{ color: '#fff', fontSize: '20px', fontWeight: 'bold', marginBottom: '2px', letterSpacing: '2px' }}>
                ALI ADABI
              </div>
              <div style={{ color: '#bf00ff', fontSize: '10px', letterSpacing: '3px', marginBottom: '20px' }}>
                FULL-STACK DEVELOPER
              </div>

              <div style={{ color: '#00fff755', fontSize: '9px', letterSpacing: '3px', marginBottom: '8px' }}>
                SELECT
              </div>

              {projects.map((p, i) => (
                <motion.div
                  key={p.id}
                  whileHover={{ x: 8 }}
                  onClick={() => { setSelected(p); setView('project') }}
                  style={{
                    color: highlighted === i ? '#00fff7' : '#ffffffbb',
                    padding: '7px 0',
                    borderBottom: '1px solid #ffffff11',
                    borderLeft: highlighted === i ? '2px solid #00fff7' : '2px solid transparent',
                    paddingLeft: highlighted === i ? '8px' : '0',
                    cursor: 'pointer',
                    fontSize: '12px',
                    letterSpacing: '2px',
                    display: 'flex',
                    gap: '12px',
                    alignItems: 'center',
                    transition: 'all 0.2s',
                  }}
                >
                  <span style={{ color: '#bf00ff' }}>[ 0{i + 1} ]</span>
                  {p.title}
                </motion.div>
              ))}

              {/* About Me */}
              <motion.div
                whileHover={{ x: 8 }}
                onClick={() => setView('about')}
                style={{
                  color: '#ffffffbb',
                  padding: '7px 0',
                  borderBottom: '1px solid #ffffff11',
                  borderLeft: '2px solid transparent',
                  cursor: 'pointer',
                  fontSize: '12px',
                  letterSpacing: '2px',
                  display: 'flex',
                  gap: '12px',
                  alignItems: 'center',
                  transition: 'all 0.2s',
                  marginTop: '4px',
                }}
              >
                <span style={{ color: '#00fff7' }}>[ ★ ]</span>
                ABOUT ME
              </motion.div>

              {/* Contact */}
              <motion.div
                whileHover={{ x: 8 }}
                onClick={() => setView('contact')}
                style={{
                  color: '#ffffffbb',
                  padding: '7px 0',
                  borderBottom: '1px solid #ffffff11',
                  borderLeft: '2px solid transparent',
                  cursor: 'pointer',
                  fontSize: '12px',
                  letterSpacing: '2px',
                  display: 'flex',
                  gap: '12px',
                  alignItems: 'center',
                  transition: 'all 0.2s',
                }}
              >
                <span style={{ color: '#00fff7' }}>[ ✉ ]</span>
                CONTACT
              </motion.div>

              <div style={{ marginTop: '12px', color: '#ffffff33', fontSize: '9px', letterSpacing: '2px' }}>
                ↑↓ NAVIGATE · ENTER / CLICK TO OPEN
              </div>
            </motion.div>
          )}

          {/* PROJECT VIEW */}
          {view === 'project' && selected && (
            <motion.div
              key="project"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              style={{ height: '100%' }}
            >
              <div
                onClick={() => setView('menu')}
                style={{ color: '#00fff7', fontSize: '11px', letterSpacing: '3px', marginBottom: '20px', cursor: 'pointer' }}
              >
                ◄ BACK
              </div>
              <div style={{ color: '#bf00ff', fontSize: '9px', letterSpacing: '4px', marginBottom: '6px' }}>PROJECT</div>
              <div style={{ color: '#fff', fontSize: '18px', fontWeight: 'bold', letterSpacing: '2px', marginBottom: '12px' }}>
                {selected.title}
              </div>
              <div style={{ color: '#ffffffaa', fontSize: '11px', lineHeight: '1.8', marginBottom: '20px' }}>
                {selected.description}
              </div>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '24px' }}>
                {selected.tech.map(t => (
                  <span key={t} style={{
                    border: '1px solid #bf00ff', color: '#bf00ff',
                    padding: '2px 10px', fontSize: '9px', letterSpacing: '2px',
                  }}>{t}</span>
                ))}
              </div>
              <div style={{ display: 'flex', gap: '16px' }}>
              {selected.github && (
                  <a href={selected.github} target="_blank" rel="noreferrer" style={{
                    color: '#00fff7', fontSize: '10px', letterSpacing: '2px',
                    textDecoration: 'none', border: '1px solid #00fff7', padding: '6px 16px',
                  }}>GITHUB ↗</a>
                )}
                {selected.live && (
                  <a href={selected.live} target="_blank" rel="noreferrer" style={{
                    color: '#000', background: '#00fff7', fontSize: '10px',
                    letterSpacing: '2px', textDecoration: 'none', padding: '6px 16px',
                  }}>LIVE ↗</a>
                )}
              </div>
            </motion.div>
          )}

          {/* ABOUT VIEW */}
          {view === 'about' && (
            <AboutScreen onBack={() => setView('menu')} />
          )}

          {/* CONTACT VIEW */}
          {view === 'contact' && (
            <ContactScreen onBack={() => setView('menu')} />
          )}

        </AnimatePresence>
      </div>
    </motion.div>
  )
}