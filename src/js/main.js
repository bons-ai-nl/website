// Import Bootstrap CSS and JS
import 'bootstrap/dist/css/bootstrap.min.css'
import * as bootstrap from 'bootstrap'

// Initialize Bootstrap's JavaScript features
window.bootstrap = bootstrap

// Initialize any Bootstrap components that need JavaScript
document.addEventListener('DOMContentLoaded', () => {
  // Enable all tooltips
  const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
  tooltipTriggerList.map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

  // Enable all popovers
  const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
  popoverTriggerList.map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl))
})
