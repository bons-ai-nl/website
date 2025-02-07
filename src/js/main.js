// Import Alpine.js
import Alpine from 'alpinejs'

// Shape morphing configuration
const shapeConfigs = [
    {
        fill: "#048A81",
        d: "M37.3390793,242 L306.04459,242 C316.973074,215.329206 312.86081,199.14818 293.707796,193.456923 C274.554783,187.765666 253.76813,190.388108 231.347838,201.324249 C225.714599,163.717314 210.842847,141.398657 186.732583,134.368281 C147.792844,123.013737 121.485617,140.366493 107.810902,186.426546 C82.615126,162.344523 59.1245185,156.653266 37.3390793,169.352774 C15.5536402,182.052283 15.5536402,206.268024 37.3390793,242 Z"
    },
    {
        fill: "#2D3047",
        d: "M59.1582125,243 L279.912142,243 C317.456349,213.905963 326.495928,192.547433 307.030877,178.92441 C287.565826,165.301386 269.844754,173.632822 253.86766,203.918717 C269.394695,131.750469 248.860754,86.3779201 192.265838,67.80107 C154.612905,55.4417819 127.271822,83.9825788 110.242589,153.423461 C77.2043347,125.636802 49.8069943,118.149768 28.0505677,130.96236 C6.29414098,143.774952 16.6633559,181.120832 59.1582125,243 Z"
    }
];

let currentShapeIndex = 0;

// Import our styles
import '../css/styles.css'

// Initialize Alpine.js
window.Alpine = Alpine
Alpine.start()

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
    
    // Initialize shape morphing
    const morphingShape = document.getElementById('morphing-shape');
    if (morphingShape) {
        setInterval(() => {
            currentShapeIndex = (currentShapeIndex + 1) % shapeConfigs.length;
            const newConfig = shapeConfigs[currentShapeIndex];
            morphingShape.setAttribute('fill', newConfig.fill);
            morphingShape.setAttribute('d', newConfig.d);
        }, 3000);
    }
    
    // Enable navbar toggler
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    if (navbarToggler && navbarCollapse) {
        const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
            toggle: false
        });
        
        navbarToggler.addEventListener('click', (e) => {
            e.preventDefault();
            bsCollapse.toggle();
        });
    }
    
    // Set up language toggle
    const langToggle = document.getElementById('langToggle');
    if (langToggle) {
        langToggle.addEventListener('click', () => {
            currentLang = currentLang === 'en' ? 'nl' : 'en';
            updateContent();
        });
    }
});
