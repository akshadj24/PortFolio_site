import './shared.css'
import './style.css'
import './theme.js'

/* ---- Typing Effect ---- */
const titleElement = document.getElementById('typing-title')
const titleText = "AI & Data Science Engineer"
let charIndex = 0

function typeEffect() {
  if (charIndex < titleText.length) {
    titleElement.textContent += titleText.charAt(charIndex)
    charIndex++
    setTimeout(typeEffect, 90)
  }
}

/* ---- Neural Network Background ---- */
const canvas = document.getElementById('bg-canvas')
const ctx = canvas.getContext('2d')
const cursorGlow = document.getElementById('cursor-glow')

let particles = []
const particleCount = 100
const connectionDistance = 150
const mouse = { x: null, y: null, radius: 150 }

window.addEventListener('mousemove', (e) => {
  mouse.x = e.x
  mouse.y = e.y
  cursorGlow.style.left = e.x + 'px'
  cursorGlow.style.top = e.y + 'px'
})

class Particle {
  constructor() { this.init() }
  init() {
    this.x = Math.random() * canvas.width
    this.y = Math.random() * canvas.height
    this.size = Math.random() * 2 + 1
    this.speedX = (Math.random() - 0.5) * 0.5
    this.speedY = (Math.random() - 0.5) * 0.5
  }
  update() {
    this.x += this.speedX
    this.y += this.speedY
    if (this.x > canvas.width) this.x = 0
    else if (this.x < 0) this.x = canvas.width
    if (this.y > canvas.height) this.y = 0
    else if (this.y < 0) this.y = canvas.height

    const dx = mouse.x - this.x, dy = mouse.y - this.y
    const distance = Math.sqrt(dx * dx + dy * dy)
    if (distance < mouse.radius) {
      const force = (mouse.radius - distance) / mouse.radius
      this.x -= dx * force * 0.02
      this.y -= dy * force * 0.02
    }
  }
  draw() {
    const isLight = document.documentElement.getAttribute('data-theme') === 'light'
    ctx.fillStyle = isLight ? 'rgba(8,145,178,0.45)' : 'rgba(76,215,246,0.4)'
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    ctx.fill()
  }
}

function initParticles() {
  canvas.width = window.innerWidth
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
      const dx = particles[i].x - particles[j].x
      const dy = particles[i].y - particles[j].y
      const distance = Math.sqrt(dx * dx + dy * dy)
      if (distance < connectionDistance) {
        const isLight = document.documentElement.getAttribute('data-theme') === 'light'
        const alpha = 0.8 * (1 - distance / connectionDistance)
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
setTimeout(typeEffect, 1000)

/* ---- Scroll-based nav highlight ---- */
const navLinks = document.querySelectorAll('.nav-link')
const sections = document.querySelectorAll('.section')

window.addEventListener('scroll', () => {
  const navHeight = 80
  let current = ''
  sections.forEach((section) => {
    if (window.pageYOffset >= section.offsetTop - navHeight - 100) {
      current = section.getAttribute('id')
    }
  })
  navLinks.forEach((link) => {
    link.classList.remove('active')
    if (link.getAttribute('href') === `#${current}`) link.classList.add('active')
  })
})

/* ---- CTA Button navigates to /projects.html (handled by anchor href) ---- */

/* ---- Contact Terminal Form ---- */
const contactSubmit = document.getElementById('contact-submit')
const responseLog   = document.getElementById('response-log')

function addLogLine(text, type = 'info', delay = 0) {
  setTimeout(() => {
    const line = document.createElement('div')
    line.className = `log-line ${type}`
    line.textContent = text
    responseLog.appendChild(line)
    responseLog.scrollTop = responseLog.scrollHeight
  }, delay)
}

contactSubmit?.addEventListener('click', () => {
  const name    = document.getElementById('contact-name').value.trim()
  const email   = document.getElementById('contact-email').value.trim()
  const message = document.getElementById('contact-message').value.trim()
  responseLog.innerHTML = ''

  if (!name || !email || !message) {
    addLogLine('[ERROR] Missing required fields. Aborting.', 'error', 0)
    return
  }

  contactSubmit.disabled = true
  addLogLine('$ Initializing secure channel...', 'info', 0)
  addLogLine('  Authenticating sender...', 'info', 400)
  addLogLine(`  Name    : "${name}"`, 'info', 800)
  addLogLine(`  Email   : "${email}"`, 'info', 1100)
  addLogLine(`  Payload : ${message.length} chars`, 'info', 1400)
  addLogLine('  Encrypting message...', 'info', 1800)
  addLogLine('[OK] Message transmitted successfully!', 'ok', 2300)
  addLogLine('[OK] I will get back to you soon. ✓', 'ok', 2700)

  setTimeout(() => {
    document.getElementById('contact-name').value    = ''
    document.getElementById('contact-email').value   = ''
    document.getElementById('contact-message').value = ''
    contactSubmit.disabled = false
  }, 3000)
})

/* ---- Mobile hamburger ---- */
const hamburger = document.getElementById('hamburger')
const navLinksEl = document.getElementById('nav-links')
hamburger?.addEventListener('click', () => navLinksEl.classList.toggle('open'))
