import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Suspense } from 'react'
import ArcadeModel from './ArcadeModel'
import { useStore } from '../store'

export default function Scene() {
  const { phase } = useStore()

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
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
          <ArcadeModel />
        </Suspense>

        <OrbitControls
          enabled={phase === 'idle'}
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.6}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 2}
        />
      </Canvas>

      {phase === 'screen' && (
        <div style={{
          position: 'absolute',
          bottom: '24px',
          left: '50%',
          transform: 'translateX(-50%)',
          color: '#00fff7',
          fontFamily: 'monospace',
          fontSize: '12px',
          opacity: 0.6,
          letterSpacing: '2px'
        }}>
          [ ESC ] EXIT
        </div>
      )}
    </div>
  )
}