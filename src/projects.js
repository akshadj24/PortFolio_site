import './shared.css'
import './projects.css'
import './theme.js'

/* ---- Neural Network Background ---- */
const canvas     = document.getElementById('bg-canvas')
const ctx        = canvas.getContext('2d')
const cursorGlow = document.getElementById('cursor-glow')

let particles = []
const particleCount      = 80
const connectionDistance = 140
const mouse = { x: null, y: null, radius: 150 }

window.addEventListener('mousemove', (e) => {
  mouse.x = e.x
  mouse.y = e.y
  cursorGlow.style.left = e.x + 'px'
  cursorGlow.style.top  = e.y + 'px'
})

class Particle {
  constructor() { this.init() }
  init() {
    this.x      = Math.random() * canvas.width
    this.y      = Math.random() * canvas.height
    this.size   = Math.random() * 1.8 + 0.8
    this.speedX = (Math.random() - 0.5) * 0.4
    this.speedY = (Math.random() - 0.5) * 0.4
  }
  update() {
    this.x += this.speedX
    this.y += this.speedY
    if (this.x > canvas.width)  this.x = 0
    else if (this.x < 0)        this.x = canvas.width
    if (this.y > canvas.height) this.y = 0
    else if (this.y < 0)        this.y = canvas.height

    const dx = mouse.x - this.x, dy = mouse.y - this.y
    const dist = Math.sqrt(dx * dx + dy * dy)
    if (dist < mouse.radius) {
      const force = (mouse.radius - dist) / mouse.radius
      this.x -= dx * force * 0.02
      this.y -= dy * force * 0.02
    }
  }
  draw() {
    const isLight = document.documentElement.getAttribute('data-theme') === 'light'
    ctx.fillStyle = isLight ? 'rgba(8,145,178,0.4)' : 'rgba(76,215,246,0.35)'
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    ctx.fill()
  }
}

function initParticles() {
  canvas.width  = window.innerWidth
  canvas.height = window.innerHeight
  particles = []
  for (let i = 0; i < particleCount; i++) particles.push(new Particle())
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  for (let i = 0; i < particles.length; i++) {
    particles[i].update()
    particles[i].draw()
    for (let j = i + 1; j < particles.length; j++) {
      const dx   = particles[i].x - particles[j].x
      const dy   = particles[i].y - particles[j].y
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist < connectionDistance) {
        const isLight = document.documentElement.getAttribute('data-theme') === 'light'
        const alpha = 0.6 * (1 - dist / connectionDistance)
        ctx.strokeStyle = isLight
          ? `rgba(8,145,178,${alpha})`
          : `rgba(76,215,246,${alpha})`
        ctx.lineWidth = 0.5
        ctx.beginPath()
        ctx.moveTo(particles[i].x, particles[i].y)
        ctx.lineTo(particles[j].x, particles[j].y)
        ctx.stroke()
      }
    }
  }
  requestAnimationFrame(animate)
}

window.addEventListener('resize', initParticles)
initParticles()
animate()

/* ---- Filter Tabs ---- */
const filterBtns  = document.querySelectorAll('.filter-btn')
const cards       = document.querySelectorAll('.project-card')
const emptyState  = document.getElementById('empty-state')

filterBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    // Update active tab
    filterBtns.forEach((b) => b.classList.remove('active'))
    btn.classList.add('active')

    const filter = btn.dataset.filter

    let visibleCount = 0
    cards.forEach((card) => {
      const match = filter === 'all' || card.dataset.category === filter
      if (match) {
        card.classList.remove('filtered-out')
        visibleCount++
      } else {
        card.classList.add('filtered-out')
      }
    })

    // Show/hide empty state
    emptyState.classList.toggle('hidden', visibleCount > 0)
  })
})

/* ---- Mobile Hamburger ---- */
const hamburger  = document.getElementById('hamburger')
const navLinksEl = document.getElementById('nav-links')
hamburger?.addEventListener('click', () => navLinksEl.classList.toggle('open'))
