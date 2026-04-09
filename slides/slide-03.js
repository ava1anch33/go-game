// slide-03.js - Summary & Future Work
const pptxgen = require("pptxgenjs");

const slideConfig = {
  type: 'summary',
  index: 3,
  title: 'Summary & Future Work'
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
  slide.addText("Summary & Future Work", {
    x: 0.5, y: 0.3, w: 9, h: 0.5,
    fontSize: 28, fontFace: "Arial",
    color: "FFFFFF", bold: true,
    margin: 0
  });

  // Left column - Achievements
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.5, y: 1.3, w: 4.3, h: 2.8,
    fill: { color: "F8F9FA" },
    line: { color: theme.light, width: 1 },
    rectRadius: 0.12
  });

  slide.addText("Key Achievements", {
    x: 0.7, y: 1.45, w: 3.9, h: 0.4,
    fontSize: 16, fontFace: "Arial",
    color: theme.primary, bold: true, margin: 0
  });

  // Achievement items
  const achievements = [
    "Seamless language switching without page reload",
    "Persistent language preference across sessions",
    "Clean, intuitive UI integrated into login form",
    "Easy to extend with additional languages"
  ];

  achievements.forEach((item, i) => {
    const y = 1.95 + i * 0.5;

    // Checkmark indicator
    slide.addShape(pres.shapes.OVAL, {
      x: 0.8, y: y + 0.05, w: 0.22, h: 0.22,
      fill: { color: theme.secondary }
    });

    slide.addText("\u2713", {
      x: 0.8, y: y + 0.02, w: 0.22, h: 0.22,
      fontSize: 11, fontFace: "Arial",
      color: "FFFFFF", bold: true,
      align: "center", valign: "middle"
    });

    slide.addText(item, {
      x: 1.15, y: y, w: 3.5, h: 0.45,
      fontSize: 11, fontFace: "Arial",
      color: theme.secondary, valign: "top", margin: 0
    });
  });

  // Right column - Future Work
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 5.2, y: 1.3, w: 4.3, h: 2.8,
    fill: { color: "F8F9FA" },
    line: { color: theme.light, width: 1 },
    rectRadius: 0.12
  });

  slide.addText("Future Enhancements", {
    x: 5.4, y: 1.45, w: 3.9, h: 0.4,
    fontSize: 16, fontFace: "Arial",
    color: theme.primary, bold: true, margin: 0
  });

  // Future items
  const futureWork = [
    { title: "RTL Language Support", desc: "Arabic, Hebrew" },
    { title: "Auto-Detection", desc: "Browser language setting" },
    { title: "More Languages", desc: "Japanese, Korean, Spanish" },
    { title: "Admin Dashboard", desc: "Manage translations online" }
  ];

  futureWork.forEach((item, i) => {
    const y = 1.95 + i * 0.5;

    // Arrow indicator
    slide.addShape(pres.shapes.RECTANGLE, {
      x: 5.5, y: y + 0.08, w: 0.15, h: 0.15,
      fill: { color: theme.accent }
    });

    slide.addText(item.title, {
      x: 5.8, y: y, w: 2, h: 0.25,
      fontSize: 11, fontFace: "Arial",
      color: theme.primary, bold: true, margin: 0
    });

    slide.addText(item.desc, {
      x: 5.8, y: y + 0.22, w: 3.5, h: 0.22,
      fontSize: 10, fontFace: "Arial",
      color: "666666", margin: 0
    });
  });

  // Bottom section - Thank you / Q&A
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.5, y: 4.4, w: 9, h: 0.9,
    fill: { color: theme.primary },
    rectRadius: 0.1
  });

  slide.addText("Thank You for Your Attention!", {
    x: 0.5, y: 4.55, w: 9, h: 0.4,
    fontSize: 22, fontFace: "Arial",
    color: theme.accent, bold: true, align: "center"
  });

  slide.addText("Questions & Discussion", {
    x: 0.5, y: 4.9, w: 9, h: 0.3,
    fontSize: 14, fontFace: "Arial",
    color: "FFFFFF", align: "center"
  });

  // Decorative elements
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 5.4, w: 1.5, h: 0.06,
    fill: { color: theme.accent }
  });

  // Page number badge
  slide.addShape(pres.shapes.OVAL, {
    x: 9.3, y: 5.1, w: 0.4, h: 0.4,
    fill: { color: theme.accent }
  });
  slide.addText("3", {
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
  pres.writeFile({ fileName: "slide-03-preview.pptx" });
}

module.exports = { createSlide, slideConfig };
