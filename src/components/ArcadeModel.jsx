import { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useStore } from '../store'

export default function ArcadeModel() {
  const { scene } = useGLTF('/arcade.glb')
  const screenRef = useRef()
  const { phase, setPhase } = useStore()

  const handleScreenClick = () => {
    if (phase === 'idle') setPhase('zooming')
  }

  return (
    <primitive
      object={scene}
      scale={1.2}
      position={[0, -1, 0]}
      onClick={handleScreenClick}
      onPointerOver={() => {
        if (phase === 'idle') document.body.style.cursor = 'pointer'
      }}
      onPointerOut={() => {
        document.body.style.cursor = 'default'
      }}
    />
  )
}

useGLTF.preload('/arcade.glb')