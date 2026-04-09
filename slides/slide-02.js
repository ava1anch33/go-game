// slide-02.js - Implementation Details & Tech Stack
const pptxgen = require("pptxgenjs");

const slideConfig = {
  type: 'content',
  index: 2,
  title: 'Implementation Details'
};

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: "FFFFFF" };

  // Left accent bar
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 0.15, h: 5.625,
    fill: { color: theme.accent }
  });

  // Top header bar
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 1.0,
    fill: { color: theme.primary }
  });

  // Page title
  slide.addText("Implementation Details", {
    x: 0.5, y: 0.3, w: 9, h: 0.5,
    fontSize: 28, fontFace: "Arial",
    color: "FFFFFF", bold: true,
    margin: 0
  });

  // Tech Stack Section - Left
  slide.addText("Technology Stack", {
    x: 0.5, y: 1.3, w: 4, h: 0.4,
    fontSize: 18, fontFace: "Arial",
    color: theme.primary, bold: true
  });

  // Tech stack cards
  const techItems = [
    { name: "React / Vue.js", desc: "Frontend Framework" },
    { name: "i18next", desc: "Internationalization Library" },
    { name: "JSON / YAML", desc: "Translation Files" },
    { name: "LocalStorage", desc: "Language Preference" }
  ];

  techItems.forEach((item, i) => {
    const y = 1.8 + i * 0.7;

    // Card background
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 0.5, y: y, w: 4.2, h: 0.55,
      fill: { color: "F8F9FA" },
      line: { color: theme.light, width: 1 },
      rectRadius: 0.08
    });

    // Color indicator
    slide.addShape(pres.shapes.RECTANGLE, {
      x: 0.5, y: y, w: 0.12, h: 0.55,
      fill: { color: theme.secondary }
    });

    // Tech name
    slide.addText(item.name, {
      x: 0.75, y: y + 0.05, w: 2, h: 0.25,
      fontSize: 13, fontFace: "Arial",
      color: theme.primary, bold: true, margin: 0
    });

    // Tech description
    slide.addText(item.desc, {
      x: 0.75, y: y + 0.28, w: 3.8, h: 0.22,
      fontSize: 10, fontFace: "Arial",
      color: "666666", margin: 0
    });
  });

  // Implementation Flow - Right side
  slide.addText("Implementation Flow", {
    x: 5.2, y: 1.3, w: 4.5, h: 0.4,
    fontSize: 18, fontFace: "Arial",
    color: theme.primary, bold: true
  });

  // Flow steps
  const flowSteps = [
    { num: "1", title: "Setup i18n Config", desc: "Configure language resources" },
    { num: "2", title: "Create Translation Files", desc: "Define EN/CN text mappings" },
    { num: "3", title: "Build Language Switcher", desc: "UI component for toggle" },
    { num: "4", title: "Persist User Preference", desc: "Save to LocalStorage" }
  ];

  flowSteps.forEach((step, i) => {
    const y = 1.85 + i * 0.85;

    // Step number circle
    slide.addShape(pres.shapes.OVAL, {
      x: 5.2, y: y, w: 0.45, h: 0.45,
      fill: { color: theme.accent }
    });

    slide.addText(step.num, {
      x: 5.2, y: y, w: 0.45, h: 0.45,
      fontSize: 14, fontFace: "Arial",
      color: theme.primary, bold: true,
      align: "center", valign: "middle"
    });

    // Connector line (except last)
    if (i < flowSteps.length - 1) {
      slide.addShape(pres.shapes.LINE, {
        x: 5.425, y: y + 0.5, w: 0, h: 0.35,
        line: { color: theme.light, width: 2 }
      });
    }

    // Step content
    slide.addText(step.title, {
      x: 5.85, y: y, w: 3.5, h: 0.3,
      fontSize: 13, fontFace: "Arial",
      color: theme.primary, bold: true, margin: 0
    });

    slide.addText(step.desc, {
      x: 5.85, y: y + 0.28, w: 3.5, h: 0.25,
      fontSize: 10, fontFace: "Arial",
      color: "666666", margin: 0
    });
  });

  // Code snippet example
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.5, y: 4.6, w: 9, h: 0.7,
    fill: { color: theme.primary },
    rectRadius: 0.08
  });

  slide.addText("// Example: Language Switch Function", {
    x: 0.7, y: 4.7, w: 8.6, h: 0.25,
    fontSize: 10, fontFace: "Consolas",
    color: theme.accent, margin: 0
  });

  slide.addText("const switchLanguage = (lang) => { i18n.changeLanguage(lang); localStorage.setItem('lang', lang); }", {
    x: 0.7, y: 4.95, w: 8.6, h: 0.25,
    fontSize: 10, fontFace: "Consolas",
    color: "FFFFFF", margin: 0
  });

  // Page number badge
  slide.addShape(pres.shapes.OVAL, {
    x: 9.3, y: 5.1, w: 0.4, h: 0.4,
    fill: { color: theme.accent }
  });
  slide.addText("2", {
    x: 9.3, y: 5.1, w: 0.4, h: 0.4,
    fontSize: 12, fontFace: "Arial",
    color: theme.primary, bold: true,
    align: "center", valign: "middle"
  });

  return slide;
}

// Standalone preview
if (require.main === module) {
  const pres = new pptxgen();
  pres.layout = 'LAYOUT_16x9';
  const theme = {
    primary: "023047",
    secondary: "219ebc",
    accent: "ffb703",
    light: "8ecae6",
    bg: "FFFFFF"
  };
  createSlide(pres, theme);
  pres.writeFile({ fileName: "slide-02-preview.pptx" });
}

module.exports = { createSlide, slideConfig };
