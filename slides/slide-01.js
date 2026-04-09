// slide-01.js - Language Switching Feature Introduction
const pptxgen = require("pptxgenjs");

const slideConfig = {
  type: 'content',
  index: 1,
  title: 'Language Switching Feature'
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
    x: 0, y: 0, w: 10, h: 1.2,
    fill: { color: theme.primary }
  });

  // Page title
  slide.addText("Language Switching Feature", {
    x: 0.5, y: 0.35, w: 9, h: 0.6,
    fontSize: 32, fontFace: "Arial",
    color: "FFFFFF", bold: true,
    margin: 0
  });

  // Subtitle
  slide.addText("Enhancing User Experience in Login Interface", {
    x: 0.5, y: 1.5, w: 5, h: 0.5,
    fontSize: 18, fontFace: "Arial",
    color: theme.secondary, bold: false
  });

  // Left content area - feature description
  slide.addText("Project Overview", {
    x: 0.5, y: 2.2, w: 4.5, h: 0.4,
    fontSize: 16, fontFace: "Arial",
    color: theme.primary, bold: true
  });

  slide.addText([
    { text: "Multi-language support enables users from different regions to access the application in their preferred language.", options: { breakLine: true } },
    { text: "", options: { breakLine: true } },
    { text: "Key Benefits:", options: { bold: true, breakLine: true } },
    { text: "• Global accessibility for international users", options: { bullet: false, breakLine: true } },
    { text: "• Improved user experience and satisfaction", options: { bullet: false, breakLine: true } },
    { text: "• Easy language switching without reloading", options: { bullet: false } }
  ], {
    x: 0.5, y: 2.6, w: 4.5, h: 2.2,
    fontSize: 13, fontFace: "Arial",
    color: theme.secondary, valign: "top"
  });

  // Right side - Login interface mockup visualization
  // Card container
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 5.5, y: 1.4, w: 4, h: 3.5,
    fill: { color: "F8F9FA" },
    line: { color: theme.light, width: 1 },
    rectRadius: 0.15
  });

  // Login header
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 5.5, y: 1.4, w: 4, h: 0.6,
    fill: { color: theme.primary }
  });

  slide.addText("LOGIN", {
    x: 5.5, y: 1.5, w: 4, h: 0.4,
    fontSize: 18, fontFace: "Arial",
    color: "FFFFFF", bold: true, align: "center"
  });

  // Input fields (visual only)
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 5.8, y: 2.2, w: 3.4, h: 0.4,
    fill: { color: "FFFFFF" },
    line: { color: "DDDDDD", width: 1 },
    rectRadius: 0.05
  });

  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 5.8, y: 2.75, w: 3.4, h: 0.4,
    fill: { color: "FFFFFF" },
    line: { color: "DDDDDD", width: 1 },
    rectRadius: 0.05
  });

  // Labels
  slide.addText("Username", {
    x: 5.8, y: 2.2, w: 1, h: 0.4,
    fontSize: 10, fontFace: "Arial",
    color: "999999", valign: "middle"
  });

  slide.addText("Password", {
    x: 5.8, y: 2.75, w: 1, h: 0.4,
    fontSize: 10, fontFace: "Arial",
    color: "999999", valign: "middle"
  });

  // Login button
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 5.8, y: 3.35, w: 3.4, h: 0.45,
    fill: { color: theme.accent },
    rectRadius: 0.08
  });

  slide.addText("Login", {
    x: 5.8, y: 3.35, w: 3.4, h: 0.45,
    fontSize: 14, fontFace: "Arial",
    color: theme.primary, bold: true, align: "center", valign: "middle"
  });

  // Language selector highlight
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 7.8, y: 4.0, w: 1.5, h: 0.35,
    fill: { color: theme.secondary },
    rectRadius: 0.08
  });

  slide.addText("EN / 中文", {
    x: 7.8, y: 4.0, w: 1.5, h: 0.35,
    fontSize: 11, fontFace: "Arial",
    color: "FFFFFF", bold: true, align: "center", valign: "middle"
  });

  // Annotation arrow
  slide.addShape(pres.shapes.LINE, {
    x: 6.8, y: 4.17, w: 0.9, h: 0,
    line: { color: theme.accent, width: 2 }
  });

  slide.addText("Language Switcher", {
    x: 6.0, y: 4.45, w: 2.5, h: 0.3,
    fontSize: 10, fontFace: "Arial",
    color: theme.accent, bold: true
  });

  // Bottom decorative element
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 5.2, w: 2, h: 0.08,
    fill: { color: theme.accent }
  });

  // Page number badge
  slide.addShape(pres.shapes.OVAL, {
    x: 9.3, y: 5.1, w: 0.4, h: 0.4,
    fill: { color: theme.accent }
  });
  slide.addText("1", {
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
  pres.writeFile({ fileName: "slide-01-preview.pptx" });
}

module.exports = { createSlide, slideConfig };
