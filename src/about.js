import './shared.css'
import './about.css'
import './theme.js'

import { initBackground } from './background.js'
initBackground()

/* ---- Floating Skill Tags ---- */
const skills = ['PyTorch', 'TensorFlow', 'NLP', 'CV', 'Pandas', 'Scikit']
const skillsContainer = document.getElementById('floating-skills')

skills.forEach((skill, index) => {
  const tag = document.createElement('div')
  tag.className = 'skill-tag'
  tag.textContent = skill
  const angle = (index / skills.length) * Math.PI * 2
  const radius = 165
  const x = Math.cos(angle) * radius + 140
  const y = Math.sin(angle) * radius + 140
  tag.style.left = `${x}px`
  tag.style.top = `${y}px`
  tag.style.animationDelay = `${index * 0.7}s`
  skillsContainer.appendChild(tag)
})

/* ---- Photo Upload ---- */
const uploadTrigger = document.getElementById('upload-trigger')
const photoInput = document.getElementById('photo-input')
const profileImg = document.getElementById('profile-img')
const clearBtn = document.getElementById('clear-photo')

// Load from local storage on startup
const savedPhoto = localStorage.getItem('profilePhoto')
if (savedPhoto) {
  profileImg.src = savedPhoto
  profileImg.classList.remove('hidden')
  uploadTrigger.classList.add('hidden')
  clearBtn.classList.remove('hidden')
}

uploadTrigger.addEventListener('click', () => photoInput.click())

photoInput.addEventListener('change', (e) => {
  const file = e.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (ev) => {
      const dataUrl = ev.target.result
      profileImg.src = dataUrl
      profileImg.classList.remove('hidden')
      uploadTrigger.classList.add('hidden')
      clearBtn.classList.remove('hidden')
      localStorage.setItem('profilePhoto', dataUrl) // Save photo
    }
    reader.readAsDataURL(file)
  }
})

clearBtn.addEventListener('click', (e) => {
  e.stopPropagation()
  profileImg.src = ''
  profileImg.classList.add('hidden')
  uploadTrigger.classList.remove('hidden')
  clearBtn.classList.add('hidden')
  photoInput.value = ''
  localStorage.removeItem('profilePhoto') // Remove saved photo
})

/* ---- Mobile hamburger ---- */
const hamburger = document.getElementById('hamburger')
const navLinks = document.querySelector('.nav-links')
hamburger?.addEventListener('click', () => navLinks.classList.toggle('open'))
