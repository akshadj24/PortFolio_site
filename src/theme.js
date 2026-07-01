/**
 * theme.js — Shared light/dark mode toggle
 * Persists preference in localStorage.
 * Usage: import './theme.js' in any page script.
 */
(function () {
  const root   = document.documentElement;
  const STORAGE_KEY = 'aj-theme';

  // Icons and labels per theme
  const THEMES = {
    dark:  { icon: '🌙', label: 'Dark',  dataTheme: '' },
    light: { icon: '☀️', label: 'Light', dataTheme: 'light' },
  };

  // Read saved preference or default to dark
  let current = localStorage.getItem(STORAGE_KEY) === 'light' ? 'light' : 'dark';

  function applyTheme(theme) {
    const t = THEMES[theme];
    root.setAttribute('data-theme', t.dataTheme);

    // Update button label + icon on all pages
    document.querySelectorAll('.theme-toggle').forEach((btn) => {
      const icon  = btn.querySelector('.toggle-icon');
      const label = btn.querySelector('.toggle-label');
      if (icon)  icon.textContent  = t.icon;
      if (label) label.textContent = t.label;
    });

    current = theme;
    localStorage.setItem(STORAGE_KEY, theme);
  }

  // Apply on load (before paint to prevent flash)
  applyTheme(current);

  // Wire up button(s) after DOM ready
  document.addEventListener('DOMContentLoaded', () => {
    applyTheme(current); // re-apply to ensure button labels are set

    document.querySelectorAll('#theme-toggle').forEach((btn) => {
      btn.addEventListener('click', () => {
        applyTheme(current === 'dark' ? 'light' : 'dark');
      });
    });
  });
})();
