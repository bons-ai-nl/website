// Import Bootstrap CSS and JS
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

// Import Tailwind CSS
import '../css/styles.css'

let currentLang = 'en';

function updateContent() {
    document.documentElement.lang = currentLang;
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        const keys = key.split('.');
        let value = translations[currentLang];
        for (const k of keys) {
            value = value[k];
        }
        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
            element.placeholder = value;
        } else {
            element.innerHTML = value;
        }
    });
}

document.getElementById('langToggle').addEventListener('click', () => {
    currentLang = currentLang === 'en' ? 'nl' : 'en';
    updateContent();
});

// Initialize content
document.addEventListener('DOMContentLoaded', updateContent);