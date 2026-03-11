import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Suspense, useState } from 'react'
import ArcadeModel from './ArcadeModel'
import NameTag from './NameTag'
import IdlePrompt from './IdlePrompt'
import LoadingScreen from './LoadingScreen'
import { useStore } from '../store'

function SceneLoader({ onLoaded }) {
  useEffect(() => {
    onLoaded()
  }, [])
  return null
}

export default function Scene() {
  const { phase } = useStore()
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>

      <LoadingScreen isLoaded={isLoaded} />

      <Canvas
        camera={{ position: [0, 0.5, 3.5], fov: 50 }}
        gl={{ antialias: true }}
        shadows
      >
        <color attach="background" args={['#000000']} />
        <fog attach="fog" args={['#000000', 5, 15]} />

        <ambientLight intensity={0.1} />
        <pointLight position={[0, 3, 1]} intensity={2} color="#bf00ff" />
        <pointLight position={[-2, 1, 2]} intensity={1.5} color="#00fff7" />
        <pointLight position={[2, 1, 2]} intensity={1.5} color="#bf00ff" />
        <pointLight position={[0, -1.5, 0]} intensity={3} color="#00fff7" distance={3} />

        <Suspense fallback={null}>
          <ArcadeModel onLoaded={() => setIsLoaded(true)} />
          <NameTag />
        </Suspense>

        <OrbitControls
          enabled={phase === 'idle'}
          enableZoom={false}
          enablePan={false}
          autoRotate={false}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 2}
        />
      </Canvas>

      <IdlePrompt />

      {phase === 'screen' && (
        <div
          onClick={() => {
            const event = new KeyboardEvent('keydown', { key: 'Escape' })
            window.dispatchEvent(event)
          }}
          style={{
            position: 'absolute',
            bottom: '24px',
            left: '50%',
            transform: 'translateX(-50%)',
            color: '#00fff7',
            fontFamily: 'monospace',
            fontSize: '12px',
            opacity: 0.6,
            letterSpacing: '2px',
            cursor: 'pointer',
            pointerEvents: 'auto',
            padding: '8px 16px',
            border: '1px solid #00fff744',
          }}
          onMouseEnter={e => e.target.style.opacity = 1}
          onMouseLeave={e => e.target.style.opacity = 0.6}
        >
          [ ESC ] EXIT
        </div>
      )}
    </div>
  )
}