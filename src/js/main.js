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
import { svgElementsCollection, viewBox, width, height } from './svgMorpher.js'

const translations = {
    en: enTranslations,
    nl: nlTranslations
};

let currentLang = 'nl';

function updateContent() {
    document.documentElement.lang = currentLang;
    
    // Handle text content translations
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
    
    // Handle href attributes
    document.querySelectorAll('[data-i18n-href]').forEach(element => {
        const key = element.getAttribute('data-i18n-href');
        const keys = key.split('.');
        let value = translations[currentLang];
        
        try {
            for (const k of keys) {
                value = value[k];
            }
            
            if (value === undefined) {
                console.warn(`Translation missing for href key: ${key} in language: ${currentLang}`);
                return;
            }
            
            element.setAttribute('href', value);
        } catch (error) {
            console.error(`Error setting href for key: ${key}`, error);
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
        
        // Create initial elements (paths and rects)
        const initialElements = svgElementsCollection[0];
        
        initialElements.forEach(elementData => {
            let element;
            
            if (elementData.type === 'path') {
                element = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                element.setAttribute('d', elementData.d);
            } else if (elementData.type === 'rect') {
                element = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
                element.setAttribute('x', elementData.x);
                element.setAttribute('y', elementData.y);
                element.setAttribute('width', elementData.width);
                element.setAttribute('height', elementData.height);
                element.setAttribute('rx', elementData.rx || '0');
            }
            
            // Set common attributes
            element.setAttribute('fill', elementData.fill || 'none');
            if (elementData.stroke) element.setAttribute('stroke', elementData.stroke);
            if (elementData.strokeWidth) element.setAttribute('stroke-width', elementData.strokeWidth);
            if (elementData.id) element.id = elementData.id;
            
            element.classList.add('morphing-element', 'transition-ease-07');
            svg.appendChild(element);
        });
        
        // Add SVG to container
        bonsaiContainer.appendChild(svg);
        
        // Set up morphing interval
        setInterval(() => {
            // Get next bonsai index
            currentBonsaiIndex = (currentBonsaiIndex + 1) % svgElementsCollection.length;
            
            // Get elements for next bonsai
            const nextElements = svgElementsCollection[currentBonsaiIndex];
            
            // Update all elements
            const currentElements = svg.querySelectorAll('path, rect');
            currentElements.forEach((element, index) => {
                if (nextElements[index]) {
                    const nextElement = nextElements[index];
                    
                    // Update specific attributes based on element type
                    if (element.tagName.toLowerCase() === 'path' && nextElement.type === 'path') {
                        element.setAttribute('d', nextElement.d);
                    } else if (element.tagName.toLowerCase() === 'rect' && nextElement.type === 'rect') {
                        element.setAttribute('x', nextElement.x);
                        element.setAttribute('y', nextElement.y);
                        element.setAttribute('width', nextElement.width);
                        element.setAttribute('height', nextElement.height);
                    }
                    
                    // Update common attributes
                    if (nextElement.fill) element.setAttribute('fill', nextElement.fill);
                    if (nextElement.stroke) element.setAttribute('stroke', nextElement.stroke);
                    if (nextElement.strokeWidth) element.setAttribute('stroke-width', nextElement.strokeWidth);
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
