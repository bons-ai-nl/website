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

// Import SVG morphing utilities
import { svgPathsCollection, viewBox, width, height } from './svgMorpher.js'

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

// Bonsai SVG morphing configuration
let currentBonsaiIndex = 0;
// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
    // Initialize content
    updateContent();
    
    // Initialize bonsai SVG morphing
    const bonsaiContainer = document.getElementById('bonsai-container');
    
    if (bonsaiContainer) {
        // Create SVG element
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('viewBox', viewBox || '0 0 400 400');
        svg.setAttribute('width', width);
        svg.setAttribute('height', height);
        svg.classList.add('bonsai-svg');
        
        // Create initial paths
        const initialPaths = svgPathsCollection[0];
        console.log(initialPaths);
        
        initialPaths.forEach(pathData => {
            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path.setAttribute('d', pathData.d);
            path.setAttribute('fill', pathData.fill || 'none');
            if (pathData.stroke) path.setAttribute('stroke', pathData.stroke);
            if (pathData.strokeWidth) path.setAttribute('stroke-width', pathData.strokeWidth);
            if (pathData.id) path.id = pathData.id;
            path.classList.add('morphing-path', 'transition-ease-07');
            svg.appendChild(path);
        });
        
        // Add SVG to container
        bonsaiContainer.appendChild(svg);
        
        // Set up morphing interval
        setInterval(() => {
            // Get next bonsai index
            currentBonsaiIndex = (currentBonsaiIndex + 1) % svgPathsCollection.length;
            
            // Get paths for next bonsai
            const nextPaths = svgPathsCollection[currentBonsaiIndex];
            
            // Update all paths
            const currentPaths = svg.querySelectorAll('path');
            currentPaths.forEach((path, index) => {
                if (nextPaths[index]) {
                    const nextPath = nextPaths[index];
                    path.setAttribute('d', nextPath.d);
                    if (nextPath.fill) path.setAttribute('fill', nextPath.fill);
                    if (nextPath.stroke) path.setAttribute('stroke', nextPath.stroke);
                    if (nextPath.strokeWidth) path.setAttribute('stroke-width', nextPath.strokeWidth);
                }
            });
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

    // form listener
    document.getElementById('contactForm').addEventListener('submit', async (ev) => {
        ev.preventDefault();

        const formData = new FormData(ev.target);

        // Adding all form data to an object
        const formObject = {};
        formData.forEach((value, key) => {
            formObject[key] = value;
        });

        try {
            const response = await fetch('https://api.formbee.dev/formbee/258ef555-8ce5-4cc9-b916-b357e6231add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formObject)
            });

            if (response.ok) {
                document.getElementById('formSuccessMessage').classList.remove('hidden');
                document.getElementById('formErrorMessage').classList.add('hidden');
                // clear form
                document.getElementById('contactForm').reset();
            } else {
                document.getElementById('formErrorMessage').classList.remove('hidden');
                document.getElementById('formSuccessMessage').classList.add('hidden');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Error submitting form.');
        }
    });
});
