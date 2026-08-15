import './shared.css'
import './projects.css'
import './theme.js'

import { initBackground } from './background.js'
initBackground()

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
