// Import Alpine.js
import Alpine from 'alpinejs'

// Shape morphing configuration
const shapeConfigs = [
    {
        // Blobby circle
        fill: "#048A81",
        d: "M160,50 C220,50 270,90 270,177 C270,264 220,304 160,304 C100,304 50,264 50,177 C50,90 100,50 160,50"
    },
    {
        // Triangular shape
        fill: "#2D3047",
        d: "M160,50 C220,50 270,90 270,177 C270,264 220,304 160,304 C100,304 50,264 50,177 C50,90 100,50 160,50"
    },
    {
        // Person silhouette
        fill: "#FF3864",
        d: "M160,50 C190,50 210,90 210,177 C210,264 190,304 160,304 C130,304 110,264 110,177 C110,90 130,50 160,50"
    },
    {
        // Abstract geometric
        fill: "#048A81",
        d: "M160,50 C240,50 270,90 270,177 C270,264 240,304 160,304 C80,304 50,264 50,177 C50,90 80,50 160,50"
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
