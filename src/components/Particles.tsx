'use client'
import { useEffect, useRef } from 'react'

export default function Particles() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = ref.current
    if (!container) return

    // Create stars
    for (let i = 0; i < 80; i++) {
      const star = document.createElement('div')
      star.className = 'star'
      const size = Math.random() * 2 + 0.5
      star.style.cssText = `
        width:${size}px; height:${size}px;
        left:${Math.random()*100}%;
        top:${Math.random()*100}%;
        animation-duration:${2+Math.random()*4}s;
        animation-delay:${Math.random()*5}s;
      `
      container.appendChild(star)
    }

    // Create floating particles
    const colors = ['#7C6FFF','#00F5A0','#FF6B35','#FF4D8D','#FFD700']
    for (let i = 0; i < 25; i++) {
      const p = document.createElement('div')
      p.className = 'particle'
      const size = Math.random() * 4 + 1
      const color = colors[Math.floor(Math.random() * colors.length)]
      const drift = (Math.random() - 0.5) * 120
      p.style.cssText = `
        width:${size}px; height:${size}px;
        background:${color};
        box-shadow: 0 0 ${size*3}px ${color};
        left:${Math.random()*100}%;
        --drift:${drift}px;
        animation-duration:${8+Math.random()*12}s;
        animation-delay:${Math.random()*10}s;
      `
      container.appendChild(p)
    }

    // Create glowing orbs
    const orbConfigs = [
      { color:'#7C6FFF', size:400, x:10, y:20, dur:8 },
      { color:'#00F5A0', size:300, x:80, y:70, dur:11 },
      { color:'#FF4D8D', size:250, x:50, y:10, dur:14 },
      { color:'#FF6B35', size:200, x:90, y:40, dur:9 },
    ]
    orbConfigs.forEach(o => {
      const orb = document.createElement('div')
      orb.className = 'orb'
      orb.style.cssText = `
        width:${o.size}px; height:${o.size}px;
        background:${o.color};
        left:${o.x}%; top:${o.y}%;
        transform:translate(-50%,-50%);
        animation-duration:${o.dur}s;
        animation-delay:${Math.random()*3}s;
      `
      container.appendChild(orb)
    })

    return () => { container.innerHTML = '' }
  }, [])

  return (
    <>
      <div ref={ref} className="particles" />
      <div className="scanline" />
      <div className="corner-tl" />
      <div className="corner-br" />
    </>
  )
}
