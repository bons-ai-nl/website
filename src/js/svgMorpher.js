// Import all SVG files
import bonsai1 from '../svg/bonsai-1.svg?raw';
import bonsai2 from '../svg/bonsai-2.svg?raw';
import bonsai3 from '../svg/bonsai-3.svg?raw';
import bonsai4 from '../svg/bonsai-4.svg?raw';
import bonsai5 from '../svg/bonsai-5.svg?raw';
import bonsai6 from '../svg/bonsai-6.svg?raw';
import bonsai7 from '../svg/bonsai-7.svg?raw';

// Parse SVG strings to DOM elements
function parseSVG(svgString) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(svgString, 'image/svg+xml');
    return doc.documentElement;
}

// Extract paths, rects and their attributes from SVG
function extractElementsFromSVG(svgElement) {
    const elements = [];

    // Extract paths
    const paths = svgElement.querySelectorAll('path');
    Array.from(paths).forEach(path => {
        elements.push({
            type: 'path',
            d: path.getAttribute('d'),
            fill: path.getAttribute('fill'),
            stroke: path.getAttribute('stroke'),
            strokeWidth: path.getAttribute('stroke-width'),
            id: path.id
        });
    });

    // Extract rectangles
    const rects = svgElement.querySelectorAll('rect');
    Array.from(rects).forEach(rect => {
        elements.push({
            type: 'rect',
            x: rect.getAttribute('x'),
            y: rect.getAttribute('y'),
            width: rect.getAttribute('width'),
            height: rect.getAttribute('height'),
            fill: rect.getAttribute('fill'),
            stroke: rect.getAttribute('stroke'),
            strokeWidth: rect.getAttribute('stroke-width'),
            rx: rect.getAttribute('rx'),
            id: rect.id
        });
    });

    return elements;
}

// Process all SVGs
const svgElements = [
    parseSVG(bonsai1),
    parseSVG(bonsai2),
    parseSVG(bonsai3),
    parseSVG(bonsai4),
    parseSVG(bonsai5),
    parseSVG(bonsai6),
    parseSVG(bonsai7)
];

// Extract viewBox from first SVG (assuming all have same dimensions)
const viewBox = svgElements[0].getAttribute('viewBox');
const width = svgElements[0].getAttribute('width') || '100%';
const height = svgElements[0].getAttribute('height') || '100%';

// Extract elements from all SVGs
const svgElementsCollection = svgElements.map(svg => extractElementsFromSVG(svg));

export { svgElementsCollection, viewBox, width, height };
