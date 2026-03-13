import { useEffect, useState } from 'react'
import Scene from './components/Scene'
import MobileWarning from './components/Mobilewarning'

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

  useEffect(() => {
    const handle = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handle)
    return () => window.removeEventListener('resize', handle)
  }, [])

  return isMobile
}

export default function App() {
  const isMobile = useIsMobile()
  return isMobile ? <MobileWarning /> : <Scene />
}