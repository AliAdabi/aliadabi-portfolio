import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useStore } from '../store'

export default function ScreenGlow() {
    const meshRef = useRef()
    const { phase } = useStore()

    useFrame(({ clock }) => {
        if (meshRef.current) {
            const pulse = Math.sin(clock.getElapsedTime() * 1.5) * 0.15 + 0.85
            meshRef.current.material.opacity = phase === 'idle' ? pulse * 0.18 : 0
        }
    })

    return (
        <mesh ref={meshRef} position={[0, 0.18, 0.52]}>
            <planeGeometry args={[0.52, 0.42]} />
            <meshBasicMaterial
                color="#00fff7"
                transparent
                opacity={0.18}
            />
        </mesh>
    )
}