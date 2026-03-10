import { motion } from 'framer-motion'

const skills = [
  { name: 'JavaScript', level: 0.85 },
  { name: 'React', level: 0.80 },
  { name: 'Java', level: 0.70 },
  { name: 'Python', level: 0.55 },
  { name: 'Three.js', level: 0.60 },
  { name: 'Node.js', level: 0.65 },
]

function SkillBar({ name, level, delay }) {
  return (
    <div style={{ marginBottom: '8px' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        color: '#ffffff88',
        fontSize: '9px',
        letterSpacing: '2px',
        marginBottom: '3px',
      }}>
        <span>{name}</span>
        <span style={{ color: '#00fff7' }}>{Math.round(level * 100)}%</span>
      </div>
      <div style={{
        width: '100%',
        height: '4px',
        background: '#ffffff11',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${level * 100}%` }}
          transition={{ duration: 1, delay, ease: 'easeOut' }}
          style={{
            height: '100%',
            background: 'linear-gradient(90deg, #bf00ff, #00fff7)',
            boxShadow: '0 0 8px #00fff7',
          }}
        />
      </div>
    </div>
  )
}

export default function AboutScreen({ onBack }) {
  return (
    <motion.div
      key="about"
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

        {/* Back button */}
        <div
          onClick={onBack}
          style={{
            color: '#00fff7', fontSize: '11px', letterSpacing: '3px',
            marginBottom: '16px', cursor: 'pointer',
          }}
        >
          ◄ BACK
        </div>

        {/* Header label */}
        <div style={{ color: '#bf00ff', fontSize: '9px', letterSpacing: '4px', marginBottom: '8px' }}>
          PLAYER_01.exe
        </div>

        {/* Avatar + Stats row */}
        <div style={{
          borderBottom: '1px solid #ffffff11',
          marginBottom: '12px',
          paddingBottom: '12px',
        }}>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>

            {/* GitHub Avatar */}
            <div style={{ flexShrink: 0 }}>
              <img
                src="https://github.com/AliAdabi.png"
                alt="Ali Adabi"
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '4px',
                  border: '1px solid #00fff7',
                  boxShadow: '0 0 12px #00fff755',
                  filter: 'saturate(0.8) contrast(1.1)',
                }}
              />
            </div>

            {/* Stats */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 }}>
              {[
                ['NAME', 'ALI ADABI'],
                ['ORIGIN', 'SAN FRANCISCO → SAN DIEGO'],
                ['CLASS', 'FULL-STACK DEV'],
                ['STUDYING', 'MATH-CS @ UCSD'],
                ['STATUS', 'OPEN TO OPPS'],
              ].map(([label, value]) => (
                <div key={label} style={{
                  display: 'flex',
                  gap: '8px',
                  fontSize: '9px',
                  letterSpacing: '1px',
                }}>
                  <span style={{ color: '#ffffff44', width: '65px', flexShrink: 0 }}>{label}</span>
                  <span style={{ color: '#fff' }}>{value}</span>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* Skills */}
        <div style={{
          color: '#00fff755', fontSize: '9px',
          letterSpacing: '3px', marginBottom: '10px',
        }}>
          SKILLS
        </div>

        {skills.map((s, i) => (
          <SkillBar key={s.name} name={s.name} level={s.level} delay={i * 0.1} />
        ))}

      </div>
    </motion.div>
  )
}