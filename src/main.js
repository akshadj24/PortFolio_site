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

import { initBackground } from './background.js'
initBackground()

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

