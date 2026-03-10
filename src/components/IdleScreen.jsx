import { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { useStore } from '../store'
import * as THREE from 'three'

const canvas = document.createElement('canvas')
canvas.width = 512
canvas.height = 384
const texture = new THREE.CanvasTexture(canvas)

function drawScreen(t) {
  const ctx = canvas.getContext('2d')
  const showCursor = Math.floor(t * 2) % 2 === 0

  ctx.fillStyle = '#000000'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  for (let i = 0; i < canvas.height; i += 4) {
    ctx.fillStyle = 'rgba(0, 255, 247, 0.03)'
    ctx.fillRect(0, i, canvas.width, 2)
  }

  ctx.strokeStyle = '#00fff7'
  ctx.lineWidth = 2
  ctx.strokeRect(8, 8, canvas.width - 16, canvas.height - 16)

  ctx.fillStyle = '#00fff7'
  ctx.font = '14px monospace'
  ctx.fillText('▸ SYSTEM ONLINE', 28, 48)

  ctx.fillStyle = '#ffffff'
  ctx.font = 'bold 52px monospace'
  ctx.fillText('ALI ADABI', 28, 120)

  ctx.fillStyle = '#bf00ff'
  ctx.font = '16px monospace'
  ctx.fillText('FULL-STACK DEVELOPER', 28, 158)

  ctx.strokeStyle = '#ffffff22'
  ctx.lineWidth = 1
  ctx.beginPath()
  ctx.moveTo(28, 178)
  ctx.lineTo(canvas.width - 28, 178)
  ctx.stroke()

  ctx.fillStyle = '#00fff7'
  ctx.font = '22px monospace'
  ctx.fillText('>', 28, 225)
  if (showCursor) {
    ctx.fillText('_', 52, 225)
  }

  const coinAlpha = (Math.sin(t * 3) + 1) / 2
  ctx.fillStyle = `rgba(0, 255, 247, ${coinAlpha * 0.9})`
  ctx.font = '13px monospace'
  ctx.fillText('[ CLICK TO START ]', 28, canvas.height - 28)

  texture.needsUpdate = true
}

export default function IdleScreen() {
  const meshRef = useRef()
  const frameRef = useRef(0)
  const opacityRef = useRef(1)
  const { phase } = useStore()

  useEffect(() => {
    if (meshRef.current) {
      meshRef.current.material.map = texture
      meshRef.current.material.needsUpdate = true
    }
  }, [])

  useFrame(({ clock }) => {
    frameRef.current++

    // Smoothly fade out when not idle
    const target = phase === 'idle' ? 1 : 0
    opacityRef.current += (target - opacityRef.current) * 0.08

    if (meshRef.current) {
      meshRef.current.material.opacity = opacityRef.current
      meshRef.current.visible = opacityRef.current > 0.01
    }

    if (frameRef.current % 3 !== 0) return
    if (phase === 'idle' || opacityRef.current > 0.01) {
      drawScreen(clock.getElapsedTime())
    }
  })

  // Always render, never unmount
  return (
    <mesh ref={meshRef} position={[0, 0.50, 0.2 ]}>
      <planeGeometry args={[0.54, 0.40]} />
      <meshBasicMaterial map={texture} transparent opacity={1} />
    </mesh>
  )
}