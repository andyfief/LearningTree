const axios = require("axios");

async function startQuiz(topic) {
  console.log(`Generating quiz for: ${topic}...`);

  // TODO: Replace with API call later
  const questions = [
    { question: `What is ${topic}?`, options: ["A", "B", "C"], answer: "A" },
    {
      question: `How is ${topic} used?`,
      options: ["X", "Y", "Z"],
      answer: "Y",
    },
  ];

  questions.forEach((q, index) => {
    console.log(`\nQ${index + 1}: ${q.question}`);
    console.log(`Options: ${q.options.join(", ")}`);
  });

  console.log("\nQuiz complete!");
}

module.exports = { startQuiz };
