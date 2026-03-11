import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const FORMSPREE_URL = 'https://formspree.io/f/xwvroawy'

const links = [
  {
    id: 'email',
    label: 'ML',
    display: 'aadabi@ucsd.edu',
    href: 'mailto:aadabi@ucsd.edu',
    color: '#00fff7',
  },
  {
    id: 'linkedin',
    label: 'LI',
    display: 'linkedin.com/in/adabiali',
    href: 'https://www.linkedin.com/in/adabiali/',
    color: '#bf00ff',
  },
  {
    id: 'github',
    label: 'GH',
    display: 'github.com/AliAdabi',
    href: 'https://github.com/AliAdabi',
    color: '#00fff7',
  },
]

export default function ContactScreen({ onBack }) {
  const [view, setView] = useState('main')
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState(null)

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.message) {
      setStatus('error')
      return
    }
    setStatus('sending')
    try {
      const res = await fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      })
      if (res.ok) {
        setStatus('sent')
        setFormData({ name: '', email: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch (err) {
      setStatus('error')
    }
  }

  const inputStyle = {
    width: '100%',
    background: 'transparent',
    border: 'none',
    borderBottom: '1px solid #00fff733',
    color: '#fff',
    fontFamily: 'monospace',
    fontSize: '11px',
    letterSpacing: '1px',
    padding: '6px 0',
    outline: 'none',
    marginBottom: '14px',
    boxSizing: 'border-box',
  }

  return (
    <motion.div
      key="contact"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
    >
      <div style={{
        overflowY: 'auto',
        flex: 1,
        paddingRight: '8px',
        scrollbarWidth: 'thin',
        scrollbarColor: '#00fff7 transparent',
      }}>

        <div
          onClick={onBack}
          style={{
            color: '#00fff7', fontSize: '11px', letterSpacing: '3px',
            marginBottom: '16px', cursor: 'pointer',
          }}
        >
          ◄ BACK
        </div>

        <div style={{ color: '#bf00ff', fontSize: '9px', letterSpacing: '4px', marginBottom: '12px' }}>
          ESTABLISH CONNECTION
        </div>

        <div style={{
          borderBottom: '1px solid #ffffff11',
          marginBottom: '16px',
          paddingBottom: '16px',
        }}>
          {links.map((link) => (
            <motion.a
              key={link.id}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              whileHover={{ x: 6 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '8px 0',
                textDecoration: 'none',
                borderBottom: '1px solid #ffffff08',
                cursor: 'pointer',
              }}
            >
              <span style={{
                color: '#000',
                background: link.color,
                fontSize: '9px',
                letterSpacing: '1px',
                padding: '2px 6px',
                fontFamily: 'monospace',
                flexShrink: 0,
              }}>
                {link.label}
              </span>
              <span style={{
                color: '#ffffffbb',
                fontSize: '10px',
                letterSpacing: '1px',
                fontFamily: 'monospace',
              }}>
                {link.display}
              </span>
            </motion.a>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {view === 'main' ? (
            <motion.div
              key="main"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                whileHover={{ x: 6 }}
                onClick={() => { setView('form'); setStatus(null) }}
                style={{
                  color: '#00fff7',
                  fontSize: '11px',
                  letterSpacing: '3px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <span style={{ color: '#bf00ff' }}>▸</span>
                SEND A MESSAGE
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div style={{ color: '#00fff755', fontSize: '9px', letterSpacing: '3px', marginBottom: '12px' }}>
                COMPOSE MESSAGE
              </div>

              <input
                style={inputStyle}
                placeholder="NAME"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
              />
              <input
                style={inputStyle}
                placeholder="EMAIL"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
              />
              <textarea
                style={{
                  ...inputStyle,
                  resize: 'none',
                  height: '54px',
                  borderBottom: '1px solid #00fff733',
                }}
                placeholder="MESSAGE"
                value={formData.message}
                onChange={e => setFormData({ ...formData, message: e.target.value })}
              />

              {status === 'sent' && (
                <div style={{ color: '#00fff7', fontSize: '10px', letterSpacing: '2px', marginBottom: '10px' }}>
                  ✓ TRANSMISSION SENT
                </div>
              )}
              {status === 'error' && (
                <div style={{ color: '#ff0055', fontSize: '10px', letterSpacing: '2px', marginBottom: '10px' }}>
                  ✗ FILL ALL FIELDS
                </div>
              )}

              <div style={{ display: 'flex', gap: '12px' }}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  onClick={handleSubmit}
                  style={{
                    color: '#000',
                    background: status === 'sending' ? '#ffffff55' : '#00fff7',
                    fontSize: '10px',
                    letterSpacing: '2px',
                    padding: '6px 16px',
                    cursor: status === 'sending' ? 'default' : 'pointer',
                    fontFamily: 'monospace',
                  }}
                >
                  {status === 'sending' ? 'SENDING...' : 'TRANSMIT ▸'}
                </motion.div>
                <motion.div
                  whileHover={{ x: 3 }}
                  onClick={() => { setView('main'); setStatus(null) }}
                  style={{
                    color: '#ffffff55',
                    fontSize: '10px',
                    letterSpacing: '2px',
                    padding: '6px 0',
                    cursor: 'pointer',
                    fontFamily: 'monospace',
                  }}
                >
                  CANCEL
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </motion.div>
  )
}