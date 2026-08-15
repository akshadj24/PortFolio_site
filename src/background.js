export function initBackground() {
  const canvas = document.getElementById('bg-canvas')
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  const cursorGlow = document.getElementById('cursor-glow')

  let particles = []
  const particleCount = 60
  const symbols = ['0', '1', '+', '< />', '{ }', '∑', '∫', 'λ']

  const mouse = { x: null, y: null, radius: 180 }

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX
    mouse.y = e.clientY
    if (cursorGlow) {
      cursorGlow.style.left = e.clientX + 'px'
      cursorGlow.style.top = e.clientY + 'px'
    }
  })

  // Also track mouse leave to prevent particles getting stuck
  window.addEventListener('mouseleave', () => {
    mouse.x = null
    mouse.y = null
  })

  class Particle {
    constructor() { this.init(true) }
    
    init(randomizeY = false) {
      this.x = Math.random() * canvas.width
      this.y = randomizeY ? Math.random() * canvas.height : canvas.height + 20
      this.size = Math.random() * 2.5 + 1.5
      this.speedX = (Math.random() - 0.5) * 0.4
      this.speedY = Math.random() * -0.6 - 0.2 // Float slowly upwards
      
      this.isSymbol = Math.random() > 0.7
      this.symbol = symbols[Math.floor(Math.random() * symbols.length)]
      this.opacity = Math.random() * 0.4 + 0.1
      this.colorType = Math.random() > 0.5 ? 'primary' : 'secondary'
      
      // Wobble effect properties
      this.wobbleSpeed = Math.random() * 0.02 + 0.01
      this.wobbleDistance = Math.random() * 1 + 0.5
      this.angle = Math.random() * Math.PI * 2
    }
    
    update() {
      // Natural floating movement
      this.angle += this.wobbleSpeed
      this.x += this.speedX + Math.sin(this.angle) * this.wobbleDistance * 0.5
      this.y += this.speedY
      
      // Screen wrap
      if (this.y < -30) this.init(false)
      if (this.x > canvas.width + 30) this.x = -30
      else if (this.x < -30) this.x = canvas.width + 30

      // Mouse repel interaction
      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x
        const dy = mouse.y - this.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius
          this.x -= dx * force * 0.05
          this.y -= dy * force * 0.05
          // Enhance opacity slightly when near mouse
          this.currentOpacity = Math.min(this.opacity + (force * 0.4), 0.8)
        } else {
          this.currentOpacity = this.opacity
        }
      } else {
        this.currentOpacity = this.opacity
      }
    }
    
    draw() {
      const isLight = document.documentElement.getAttribute('data-theme') === 'light'
      let color
      if (this.colorType === 'primary') {
        color = isLight ? `rgba(8,145,178,${this.currentOpacity})` : `rgba(76,215,246,${this.currentOpacity})`
      } else {
        color = isLight ? `rgba(124,58,237,${this.currentOpacity})` : `rgba(167,139,250,${this.currentOpacity})`
      }
      
      ctx.fillStyle = color
      if (this.isSymbol) {
        ctx.font = `${this.size * 4}px "JetBrains Mono", monospace`
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText(this.symbol, this.x, this.y)
      } else {
        // Draw small glowing data square
        ctx.shadowBlur = 8
        ctx.shadowColor = color
        ctx.beginPath()
        ctx.rect(this.x, this.y, this.size, this.size)
        ctx.fill()
        ctx.shadowBlur = 0 // reset
      }
    }
  }

  function initParticles() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    particles = []
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    for (let i = 0; i < particles.length; i++) {
      particles[i].update()
      particles[i].draw()
    }
    requestAnimationFrame(animate)
  }

  window.addEventListener('resize', initParticles)
  initParticles()
  animate()
}
