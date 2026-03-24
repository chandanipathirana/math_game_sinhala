export const gradeLabels = {
  1: "1 ශ්‍රේණිය",
  2: "2 ශ්‍රේණිය",
  3: "3 ශ්‍රේණිය"
};

export const topicMeta = {
  number: {
    label: "අංක හඳුනාගැනීම",
    description: "නිවැරදි අංකය තෝරන්න.",
    icon: "🔢"
  },
  counting: {
    label: "ගණන් කිරීම",
    description: "රූප ගණන් කර පිළිතුර දෙන්න.",
    icon: "🍎"
  },
  addition: {
    label: "එකතු කිරීම",
    description: "අංක එකතු කරන්න.",
    icon: "➕"
  },
  subtraction: {
    label: "අඩු කිරීම",
    description: "අංක අඩු කරන්න.",
    icon: "➖"
  },
  comparison: {
    label: "ලොකුද කුඩාද",
    description: "ලොකු හෝ කුඩා අංකය තෝරන්න.",
    icon: "⚖️"
  },
  word: {
    label: "කතාවෙන් ප්‍රශ්න",
    description: "කෙටි කතාව කියවා පිළිතුර දෙන්න.",
    icon: "📘"
  }
};

export const feedbackPhrases = {
  correctTitle: ["හොඳයි!", "නියමයි!", "අපූරුයි!", "වැඩේ හරි!"],
  correctBody: [
    "ඔයා නිවැරදි පිළිතුර තෝරාගත්තා.",
    "බොහොම හොඳයි. මේ ආකාරයෙන්ම ඉදිරියට යමු.",
    "තරුවක් ලැබුණා."
  ],
  incorrectTitle: ["ආයෙත් බලමු", "තව එක පාරක් හිතමු", "තව ටිකක් උත්සාහ කරමු"],
  incorrectBody: [
    "කිසි ප්‍රශ්නයක් නැහැ. නිවැරදි පිළිතුර දැන් බලමු.",
    "ගණිතය ඉගෙන ගන්න එහෙමයි. ඊළඟ එක හරියට කරමු.",
    "ඊළඟ ප්‍රශ්නයේදී තවත් හොඳට කරමු."
  ],
  summaryTitle: ["අදත් හොඳ වැඩක්!", "සුපිරි සැසියක්!", "තරු රැස් කළා!"]
};

const emojiRow = (emoji, count) => Array.from({ length: count }, () => emoji).join(" ");

const optionSet = (correct, deltas = [-2, -1, 1, 2]) => {
  const values = new Set([correct]);
  for (const delta of deltas) {
    if (values.size >= 4) break;
    const candidate = correct + delta;
    if (candidate >= 0) values.add(candidate);
  }
  while (values.size < 4) values.add(correct + values.size);
  return shuffle([...values]).map((value) => ({ value, label: String(value) }));
};

const shuffle = (items) => {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

const buildQuestion = ({
  id,
  grade,
  topic,
  difficulty,
  prompt,
  correctAnswer,
  answers,
  visual,
  audioText
}) => ({
  id,
  grade,
  topic,
  difficulty,
  prompt,
  correctAnswer,
  answers,
  visual,
  audioText: audioText || prompt
});

const numberQuestions = [];
for (let grade = 1; grade <= 2; grade += 1) {
  const max = grade === 1 ? 10 : 30;
  for (let number = 1; number <= max; number += grade === 1 ? 1 : 3) {
    numberQuestions.push(
      buildQuestion({
        id: `number-${grade}-${number}`,
        grade,
        topic: "number",
        difficulty: number <= max / 3 ? "easy" : number <= (max * 2) / 3 ? "medium" : "hard",
        prompt: `මෙතැන ඇති අංකය ${number} ය. එය තෝරන්න.`,
        correctAnswer: number,
        answers: optionSet(number),
        visual: {
          type: "text",
          value: String(number)
        }
      })
    );
  }
}

const countingQuestions = [];
for (let count = 1; count <= 12; count += 1) {
  countingQuestions.push(
    buildQuestion({
      id: `counting-1-${count}`,
      grade: count <= 6 ? 1 : 2,
      topic: "counting",
      difficulty: count <= 4 ? "easy" : count <= 8 ? "medium" : "hard",
      prompt: "රූප කීයක් තියෙනවාද?",
      correctAnswer: count,
      answers: optionSet(count),
      visual: {
        type: "emoji",
        value: emojiRow(count % 2 === 0 ? "🍎" : "⭐", count)
      }
    })
  );
}

const additionQuestions = [];
for (let grade = 1; grade <= 3; grade += 1) {
  const limit = grade === 1 ? 10 : grade === 2 ? 20 : 30;
  let index = 0;
  for (let a = 1; a <= limit / 2; a += 1) {
    const b = (a + grade) % Math.max(3, limit / 2) + 1;
    const sum = a + b;
    if (sum > limit) continue;
    index += 1;
    additionQuestions.push(
      buildQuestion({
        id: `addition-${grade}-${index}`,
        grade,
        topic: "addition",
        difficulty: sum <= limit / 3 ? "easy" : sum <= (limit * 2) / 3 ? "medium" : "hard",
        prompt: `${a} + ${b} = ?`,
        correctAnswer: sum,
        answers: optionSet(sum),
        visual: {
          type: "emoji",
          value: `${emojiRow("🟡", a)}  +  ${emojiRow("🔵", b)}`
        }
      })
    );
  }
}

const subtractionQuestions = [];
for (let grade = 1; grade <= 3; grade += 1) {
  const limit = grade === 1 ? 10 : grade === 2 ? 20 : 30;
  let index = 0;
  for (let a = grade + 4; a <= limit; a += 2) {
    const b = Math.max(1, Math.floor(a / 3));
    const answer = a - b;
    index += 1;
    subtractionQuestions.push(
      buildQuestion({
        id: `subtraction-${grade}-${index}`,
        grade,
        topic: "subtraction",
        difficulty: answer <= limit / 3 ? "easy" : answer <= (limit * 2) / 3 ? "medium" : "hard",
        prompt: `${a} - ${b} = ?`,
        correctAnswer: answer,
        answers: optionSet(answer),
        visual: {
          type: "emoji",
          value: `${emojiRow("🍊", a)}\nඅයින් කරන්නේ ${b} යි`
        }
      })
    );
  }
}

const comparisonQuestions = [];
[
  [2, 6],
  [5, 3],
  [11, 17],
  [24, 19],
  [8, 12],
  [27, 14],
  [16, 16],
  [21, 29],
  [18, 9],
  [25, 30],
  [13, 15],
  [7, 4]
].forEach(([a, b], index) => {
  const chooseLarger = index % 2 === 0;
  const correct = chooseLarger ? Math.max(a, b) : Math.min(a, b);
  comparisonQuestions.push(
    buildQuestion({
      id: `comparison-${index + 1}`,
      grade: index < 4 ? 2 : 3,
      topic: "comparison",
      difficulty: index < 4 ? "easy" : index < 8 ? "medium" : "hard",
      prompt: chooseLarger
        ? `ලොකු අංකය තෝරන්න: ${a} සහ ${b}`
        : `කුඩා අංකය තෝරන්න: ${a} සහ ${b}`,
      correctAnswer: correct,
      answers: shuffle([
        { value: a, label: String(a) },
        { value: b, label: String(b) }
      ]),
      visual: {
        type: "text",
        value: `${a}   ⚖️   ${b}`
      }
    })
  );
});

const wordTemplates = [
  ["අම්මාට ඇපල්", "🍎", "ලැබුණා", "+"],
  ["මල්ලිට බෝල", "⚽", "තිබුණා", "-"],
  ["චූටිට තරු", "⭐", "එකතු කළා", "+"],
  ["නිමාට පොත්", "📘", "දුන්නා", "-"],
  ["ළමයාට අඹ", "🥭", "ලැබුණා", "+"],
  ["කුරුල්ලන්ට කණිෂ්ඨ ගෙඩි", "🍒", "අහිමි වුණා", "-"]
];

const wordQuestions = [];
let wordIndex = 0;
for (let grade = 2; grade <= 3; grade += 1) {
  const baseValues = grade === 2 ? [2, 3, 4, 5, 6] : [4, 5, 6, 7, 8];
  for (const base of baseValues) {
    for (let templateIndex = 0; templateIndex < wordTemplates.length; templateIndex += 1) {
      const [subject, emoji, verb, operator] = wordTemplates[templateIndex];
      const change = grade === 2 ? (templateIndex % 3) + 1 : (templateIndex % 4) + 2;
      const result = operator === "+" ? base + change : base + change - change;
      const finalValue = operator === "+" ? result : base;
      const prompt =
        operator === "+"
          ? `${subject} ${base}ක් ${verb}. තවත් ${change}ක් ලැබුණා. දැන් කීයක්ද?`
          : `${subject} ${base + change}ක් ${verb}. ${change}ක් දුන්නා. දැන් කීයක් ඉතුරුද?`;

      wordIndex += 1;
      wordQuestions.push(
        buildQuestion({
          id: `word-${grade}-${wordIndex}`,
          grade,
          topic: "word",
          difficulty: grade === 2 ? (base <= 4 ? "easy" : "medium") : base <= 5 ? "medium" : "hard",
          prompt,
          correctAnswer: finalValue,
          answers: optionSet(finalValue),
          visual: {
            type: "emoji",
            value: emojiRow(emoji, Math.min(finalValue, 8))
          }
        })
      );
    }
  }
}

export const questions = [
  ...numberQuestions,
  ...countingQuestions,
  ...additionQuestions,
  ...subtractionQuestions,
  ...comparisonQuestions,
  ...wordQuestions
];

export const contentSummary = {
  totalQuestions: questions.length,
  topics: Object.keys(topicMeta)
};

export const topicAvailabilityByGrade = {
  1: ["number", "counting", "addition", "subtraction"],
  2: ["number", "counting", "addition", "subtraction", "comparison", "word"],
  3: ["addition", "subtraction", "comparison", "word"]
};

export const difficultyOrder = ["easy", "medium", "hard"];
