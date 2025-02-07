// Import Alpine.js
import Alpine from 'alpinejs'

// Shape morphing configuration
const shape1Configs = [
    {
        fill: "#048A81",
        d: "M160,50 C240,50 300,90 300,177 C300,264 240,304 160,304 C80,304 20,264 20,177 C20,90 80,50 160,50"
    },
    {
        fill: "#2D3047",
        d: "M160,50 C260,50 280,90 160,177 C40,264 60,304 160,304 C260,304 280,264 160,177 C40,90 60,50 160,50"
    },
    {
        fill: "#048A81",
        d: "M160,50 C260,90 220,140 300,177 C220,214 260,264 160,304 C60,264 100,214 20,177 C100,140 60,90 160,50"
    }
];

const shape2Configs = [
    {
        fill: "#FF3864",
        d: "M160,50 C200,50 220,90 220,127 C220,164 180,184 160,184 C140,184 100,164 100,127 C100,90 120,50 160,50"
    },
    {
        fill: "#FF3864",
        d: "M160,50 C260,90 220,140 300,177 C220,214 260,264 160,304 C60,264 100,214 20,177 C100,140 60,90 160,50"
    },
    {
        fill: "#2D3047",
        d: "M160,50 C260,50 280,90 160,177 C40,264 60,304 160,304 C260,304 280,264 160,177 C40,90 60,50 160,50"
    }
];

let currentShape1Index = 0;
let currentShape2Index = 0;

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
    const morphingShape1 = document.getElementById('morphing-shape-1');
    const morphingShape2 = document.getElementById('morphing-shape-2');
    
    if (morphingShape1 && morphingShape2) {
        setInterval(() => {
            currentShape1Index = (currentShape1Index + 1) % shape1Configs.length;
            currentShape2Index = (currentShape2Index + 1) % shape2Configs.length;
            
            const newConfig1 = shape1Configs[currentShape1Index];
            const newConfig2 = shape2Configs[currentShape2Index];
            
            morphingShape1.setAttribute('fill', newConfig1.fill);
            morphingShape1.setAttribute('d', newConfig1.d);
            
            morphingShape2.setAttribute('fill', newConfig2.fill);
            morphingShape2.setAttribute('d', newConfig2.d);
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
