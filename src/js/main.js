// Import Alpine.js
import Alpine from 'alpinejs'

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

let currentLang = 'nl';

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

// Shape morphing configuration
const shape1Configs = [
    {
        // Spiral-like shape
        fill: "#048A81",
        d: "M 204 46 C 220 50 280 70 300 120 C 320 170 300 220 260 240 C 220 260 266 61 122 110 C 62 124 100 140 27 169 C 20 180 20 220 61 218 C 60 300 120 320 160 304 C 200 288 222 180 146 199 C 100 159 164 119 204 46"
    },
    {
        // Star burst
        fill: "#2D3047",
        d: "M160,50 C240,50 280,90 300,140 C320,190 300,240 260,260 C220,280 180,260 160,220 C140,180 100,160 60,180 C20,200 20,240 40,280 C60,320 120,340 160,324 C200,308 240,300 260,260 C280,220 280,170 160,50"
    },
    {
        // Flowing waves
        fill: "#FF3864",
        d: "M160,50 C200,30 260,40 300,80 C340,120 320,180 280,220 C240,260 200,240 160,200 C120,160 80,160 40,200 C0,240 20,280 60,300 C100,320 140,304 160,284 C180,264 220,260 260,220 C300,180 280,120 160,50"
    },
    {
        // Abstract flower
        fill: "#048A81",
        d: "M160,50 C220,30 280,50 300,100 C320,150 300,200 260,220 C220,240 180,220 160,180 C140,140 100,120 60,140 C20,160 20,200 40,240 C60,280 120,300 160,284 C200,268 240,260 260,220 C280,180 280,130 160,50"
    }
];

const shape2Configs = [
    {
        // Curved triangle
        fill: "#FF3864",
        d: "M160,50 C200,50 240,80 260,120 C280,160 290,200 280,240 C270,280 240,300 200,304 C160,308 120,300 100,260 C80,220 60,180 60,140 C60,100 80,70 120,50 C160,30 200,40 240,80 C280,120 240,100 160,50"
    },
    {
        // Cloud-like form
        fill: "#2D3047",
        d: "M160,50 C220,30 260,60 280,100 C300,140 310,180 300,220 C290,260 260,280 220,284 C180,288 140,280 120,240 C100,200 80,160 80,120 C80,80 100,50 140,30 C180,10 220,20 260,60 C300,100 260,80 160,50"
    },
    {
        // Organic blob
        fill: "#048A81",
        d: "M160,50 C240,30 280,70 300,120 C320,170 310,220 280,260 C250,300 200,304 160,284 C120,264 80,240 60,200 C40,160 40,120 60,80 C80,40 120,20 160,30 C200,40 240,60 280,100 C320,140 280,120 160,50"
    },
    {
        // Twisted form
        fill: "#FF3864",
        d: "M160,50 C240,70 280,100 300,150 C320,200 310,250 280,290 C250,330 200,334 160,314 C120,294 80,270 60,230 C40,190 40,150 60,110 C80,70 120,50 160,60 C200,70 240,90 280,130 C320,170 280,150 160,50"
    }
];

let currentShapeIndex = 0;
// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
    // Initialize content
    updateContent();
    
    // Initialize shape morphing
    const morphingShape1 = document.getElementById('morphing-shape-1');
    const morphingShape2 = document.getElementById('morphing-shape-2');
    
    if (morphingShape1 && morphingShape2) {
        setInterval(() => {
            currentShapeIndex = (currentShapeIndex + 1) % shape1Configs.length;
            
            const newConfig1 = shape1Configs[currentShapeIndex];
            const newConfig2 = shape2Configs[currentShapeIndex];
            
            morphingShape1.setAttribute('fill', newConfig1.fill);
            morphingShape1.setAttribute('d', newConfig1.d);
            
            morphingShape2.setAttribute('fill', newConfig2.fill);
            morphingShape2.setAttribute('d', newConfig2.d);
        }, 2000);
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
    
    // Set up language buttons
    const langButtons = document.querySelectorAll('.lang-btn');
    
    function updateLanguageButtons() {
        langButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === currentLang);
        });
    }

    langButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            currentLang = btn.dataset.lang;
            updateContent();
            updateLanguageButtons();
        });
    });

    // Initialize active language button
    updateLanguageButtons();
});
