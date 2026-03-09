import { useRef, useEffect } from 'react'
import { useGLTF, Html } from '@react-three/drei'
import { useStore } from '../store'
import { useThree } from '@react-three/fiber'
import * as THREE from 'three'
import ScreenUI from './ScreenUI'

export default function ArcadeModel() {
    const { scene, nodes } = useGLTF('/arcade.glb')
    const { phase, setPhase } = useStore()
    const { camera } = useThree()
    const animating = useRef(false)
    const screenRef = useRef()

    const zoomedPosition = new THREE.Vector3(0, 1.3, 1.25)
    const idlePosition = new THREE.Vector3(0, 0.5, 3.5)

    const lerpCamera = (from, to, duration = 1200) => {
        const start = performance.now()
        animating.current = true

        const tick = (now) => {
            const elapsed = now - start
            const t = Math.min(elapsed / duration, 1)
            const ease = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t

            camera.position.lerpVectors(from.clone(), to, ease)
            camera.lookAt(0, 0.4, 0)

            if (t < 1) {
                requestAnimationFrame(tick)
            } else {
                animating.current = false
                if (to === zoomedPosition) setPhase('screen')
            }
        }

        requestAnimationFrame(tick)
    }

    const handleClick = () => {
        if (phase === 'idle' && !animating.current) {
            setPhase('zooming')
            lerpCamera(camera.position.clone(), zoomedPosition)
        }
    }

    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === 'Escape' && (phase === 'screen' || phase === 'zooming')) {
                setPhase('zooming')
                lerpCamera(camera.position.clone(), idlePosition, 1000)
                setTimeout(() => setPhase('idle'), 1000)
            }
        }
        window.addEventListener('keydown', handleKey)
        return () => window.removeEventListener('keydown', handleKey)
    }, [phase])

    return (
        <group>
            <primitive
                object={scene}
                scale={1.2}
                position={[0, -1, 0]}
                onClick={handleClick}
                onPointerOver={() => {
                    if (phase === 'idle') document.body.style.cursor = 'pointer'
                }}
                onPointerOut={() => {
                    document.body.style.cursor = 'default'
                }}
            />

            {/* UI anchored to screen position in 3D space */}
            {phase === 'screen' && (
                <Html
                position={[0.005, 0.72, 0.51]}
                transform
                occlude
                scale={0.042}
                center
                style={{ pointerEvents: 'auto' }}
              >
                    <div style={{ width: '420px', margin: '0 auto' }}>
                        <ScreenUI />
                    </div>
                </Html>
            )}
        </group>
    )
}

useGLTF.preload('/arcade.glb')