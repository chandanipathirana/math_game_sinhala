import { questions, topicAvailabilityByGrade, topicMeta } from "../src/content.js";

const requiredFields = ["id", "grade", "topic", "difficulty", "prompt", "correctAnswer", "answers"];
const errors = [];

if (questions.length < 100) {
  errors.push(`Expected at least 100 questions, found ${questions.length}.`);
}

for (const question of questions) {
  for (const field of requiredFields) {
    if (!(field in question)) {
      errors.push(`Question ${question.id} is missing ${field}.`);
    }
  }
  if (!topicMeta[question.topic]) {
    errors.push(`Question ${question.id} has unknown topic ${question.topic}.`);
  }
  if (!Array.isArray(question.answers) || question.answers.length < 2) {
    errors.push(`Question ${question.id} has invalid answers.`);
  }
}

for (const [grade, topics] of Object.entries(topicAvailabilityByGrade)) {
  for (const topic of topics) {
    const count = questions.filter((question) => question.grade === Number(grade) && question.topic === topic).length;
    if (!count) {
      errors.push(`Grade ${grade} is missing questions for topic ${topic}.`);
    }
  }
}

if (errors.length) {
  console.error("Validation failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Validation passed with ${questions.length} questions.`);
