// Import Bootstrap CSS and JS
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

// Import Tailwind CSS
import '../css/styles.css'

// Import translations
import enTranslations from '../lang/en.js'
import nlTranslations from '../lang/nl.js'

const translations = {
    en: enTranslations,
    nl: nlTranslations
};

let currentLang = 'en';

function updateContent() {
    document.documentElement.lang = currentLang;
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        const keys = key.split('.');
        let value = translations[currentLang];
        
        try {
            for (const k of keys) {
                value = value[k];
            }
            
            if (value === undefined) {
                console.warn(`Translation missing for key: ${key} in language: ${currentLang}`);
                return;
            }

            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = value;
            } else {
                element.textContent = value;
            }
        } catch (error) {
            console.error(`Error setting translation for key: ${key}`, error);
        }
    });
}

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
    // Initialize content
    updateContent();
    
    // Set up language toggle
    const langToggle = document.getElementById('langToggle');
    if (langToggle) {
        langToggle.addEventListener('click', () => {
            currentLang = currentLang === 'en' ? 'nl' : 'en';
            updateContent();
        });
    }
});
