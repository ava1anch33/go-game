// compile.js - Compile all slides into final PPTX
const pptxgen = require('pptxgenjs');
const pres = new pptxgen();
pres.layout = 'LAYOUT_16x9';

// Theme: Vibrant & Tech (#7)
const theme = {
  primary: "023047",    // Deep navy blue - backgrounds, headers
  secondary: "219ebc",  // Teal - secondary accent
  accent: "ffb703",     // Golden yellow - highlights
  light: "8ecae6",      // Light blue - subtle accents
  bg: "FFFFFF"          // White background
};

// Import and create all slides
const slideCount = 3;

for (let i = 1; i <= slideCount; i++) {
  const num = String(i).padStart(2, '0');
  const slideModule = require(`./slide-${num}.js`);
  slideModule.createSlide(pres, theme);
}

// Write final presentation
pres.writeFile({ fileName: './output/presentation.pptx' })
  .then(() => {
    console.log('Presentation created successfully: ./output/presentation.pptx');
  })
  .catch(err => {
    console.error('Error creating presentation:', err);
  });
