// Import Alpine.js
import Alpine from 'alpinejs'

// Shape morphing configuration
const shapeConfigs = [
    {
        // Blobby circle
        fill: "#048A81",
        d: "M160,300 C213,300 260,280 284,242 C308,204 308,150 284,112 C260,74 213,54 160,54 C107,54 60,74 36,112 C12,150 12,204 36,242 C60,280 107,300 160,300 Z"
    },
    {
        // Triangular shape
        fill: "#2D3047",
        d: "M50,250 L160,50 L270,250 C270,250 240,230 160,230 C80,230 50,250 50,250 Z"
    },
    {
        // Person silhouette
        fill: "#FF3864",
        d: "M160,60 C180,60 196,76 196,96 C196,116 180,132 160,132 C140,132 124,116 124,96 C124,76 140,60 160,60 M230,300 L90,300 L90,200 C90,178 108,160 130,160 L190,160 C212,160 230,178 230,200 Z"
    },
    {
        // Abstract geometric
        fill: "#048A81",
        d: "M50,150 L120,70 L200,50 L280,120 L260,200 L180,280 L100,260 L40,180 Z"
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
