import { motion } from 'framer-motion'

const links = [
  { label: 'GH', display: 'github.com/AliAdabi', href: 'https://github.com/AliAdabi', color: '#00fff7' },
  { label: 'LI', display: 'linkedin.com/in/adabiali', href: 'https://www.linkedin.com/in/adabiali/', color: '#bf00ff' },
  { label: 'ML', display: 'aadabi@ucsd.edu', href: 'mailto:aadabi@ucsd.edu', color: '#00fff7' },
]

export default function MobileWarning() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      style={{
        position: 'fixed',
        inset: 0,
        background: '#000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'monospace',
        zIndex: 99999,
        padding: '32px',
      }}
    >
      {/* Scanlines */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,247,0.02) 2px, rgba(0,255,247,0.02) 4px)',
        pointerEvents: 'none',
      }} />

      {/* Border */}
      <div style={{
        position: 'absolute', inset: '16px',
        border: '1px solid #00fff722',
        pointerEvents: 'none',
      }} />

      <div style={{ textAlign: 'center', maxWidth: '300px' }}>

        {/* Name */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div style={{
            color: '#fff',
            fontSize: '28px',
            fontWeight: 'bold',
            letterSpacing: '8px',
            textShadow: '0 0 30px #bf00ff, 0 0 60px #bf00ff44',
            marginBottom: '4px',
          }}>
            ALI ADABI
          </div>
          <div style={{
            color: '#00fff7',
            fontSize: '9px',
            letterSpacing: '5px',
            textShadow: '0 0 10px #00fff7',
            marginBottom: '40px',
          }}>
            FULL-STACK DEVELOPER
          </div>
        </motion.div>

        {/* Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          style={{
            fontSize: '36px',
            marginBottom: '20px',
            filter: 'grayscale(0.3)',
          }}
        >
          🖥️
        </motion.div>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <div style={{
            color: '#ffffff55',
            fontSize: '10px',
            letterSpacing: '2px',
            lineHeight: '1.9',
            marginBottom: '8px',
          }}>
            THIS EXPERIENCE IS DESIGNED
          </div>
          <div style={{
            color: '#bf00ff',
            fontSize: '10px',
            letterSpacing: '2px',
            lineHeight: '1.9',
            marginBottom: '36px',
          }}>
            FOR DESKTOP
          </div>

          <div style={{
            borderTop: '1px solid #ffffff11',
            paddingTop: '28px',
          }}>
            <div style={{
              color: '#00fff755',
              fontSize: '8px',
              letterSpacing: '3px',
              marginBottom: '16px',
            }}>
              REACH ME AT
            </div>

            {links.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + i * 0.1 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '10px 0',
                  textDecoration: 'none',
                  borderBottom: '1px solid #ffffff08',
                }}
              >
                <span style={{
                  color: '#000',
                  background: link.color,
                  fontSize: '8px',
                  letterSpacing: '1px',
                  padding: '2px 6px',
                  flexShrink: 0,
                }}>
                  {link.label}
                </span>
                <span style={{
                  color: '#ffffffaa',
                  fontSize: '10px',
                  letterSpacing: '1px',
                }}>
                  {link.display}
                </span>
              </motion.a>
            ))}
          </div>
        </motion.div>

      </div>
    </motion.div>
  )
}