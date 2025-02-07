// Import Alpine.js
import Alpine from 'alpinejs'

// Shape morphing configuration
const shapeConfigs = [
    {
        // Blobby circle
        fill: "#048A81",
        d: "M160,50 C213,50 260,74 284,112 C308,150 308,204 284,242 C260,280 213,304 160,304 C107,304 60,280 36,242 C12,204 12,150 36,112 C60,74 107,50 160,50"
    },
    {
        // Triangular shape
        fill: "#2D3047",
        d: "M160,50 C180,50 270,200 270,242 C270,280 213,304 160,304 C107,304 50,280 50,242 C50,200 140,50 160,50"
    },
    {
        // Person silhouette
        fill: "#FF3864",
        d: "M160,50 C190,50 210,70 210,96 C210,122 190,142 160,142 C130,142 110,122 110,96 C110,70 130,50 160,50 C160,142 230,180 230,242 C230,280 213,304 160,304 C107,304 90,280 90,242 C90,180 160,142 160,50"
    },
    {
        // Abstract geometric
        fill: "#048A81",
        d: "M160,50 C200,50 280,100 280,150 C280,200 240,280 160,304 C80,280 40,200 40,150 C40,100 120,50 160,50"
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
