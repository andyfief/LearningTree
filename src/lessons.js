const fs = require("fs-extra");

async function generateLesson(topic) {
  const content = `# Lesson on ${topic}\n\nHere is an introduction to ${topic}.`;
  const filePath = `./data/lessons/${topic}.md`;

  await fs.outputFile(filePath, content);
  console.log(`Lesson file created: ${filePath}`);
}

module.exports = { generateLesson };
