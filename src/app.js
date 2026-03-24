import {
  contentSummary,
  difficultyOrder,
  feedbackPhrases,
  gradeLabels,
  questions,
  topicAvailabilityByGrade,
  topicMeta
} from "./content.js";

const storageKeys = {
  progress: "sinhala-math-progress",
  pin: "sinhala-math-parent-pin"
};

const state = {
  screen: "welcome",
  grade: null,
  topic: null,
  sessionQuestions: [],
  currentQuestionIndex: 0,
  answers: [],
  feedback: null
};

const el = {
  screens: [...document.querySelectorAll(".screen")],
  startButton: document.getElementById("startButton"),
  continueButton: document.getElementById("continueButton"),
  homeButton: document.getElementById("homeButton"),
  parentButton: document.getElementById("parentButton"),
  gradeChoices: document.getElementById("gradeChoices"),
  topicChoices: document.getElementById("topicChoices"),
  selectedGradeLabel: document.getElementById("selectedGradeLabel"),
  sessionTopicLabel: document.getElementById("sessionTopicLabel"),
  questionCounter: document.getElementById("questionCounter"),
  progressFill: document.getElementById("progressFill"),
  audioButton: document.getElementById("audioButton"),
  difficultyLabel: document.getElementById("difficultyLabel"),
  questionVisual: document.getElementById("questionVisual"),
  questionPrompt: document.getElementById("questionPrompt"),
  answerChoices: document.getElementById("answerChoices"),
  feedbackCard: document.getElementById("feedbackCard"),
  feedbackTitle: document.getElementById("feedbackTitle"),
  feedbackBody: document.getElementById("feedbackBody"),
  feedbackNextButton: document.getElementById("feedbackNextButton"),
  summaryTitle: document.getElementById("summaryTitle"),
  summaryScore: document.getElementById("summaryScore"),
  summaryStars: document.getElementById("summaryStars"),
  summaryStats: document.getElementById("summaryStats"),
  replayButton: document.getElementById("replayButton"),
  changeTopicButton: document.getElementById("changeTopicButton"),
  pinInput: document.getElementById("pinInput"),
  pinError: document.getElementById("pinError"),
  pinSubmitButton: document.getElementById("pinSubmitButton"),
  parentSummaryCards: document.getElementById("parentSummaryCards"),
  strongTopics: document.getElementById("strongTopics"),
  weakTopics: document.getElementById("weakTopics"),
  recentSessions: document.getElementById("recentSessions"),
  resetProgressButton: document.getElementById("resetProgressButton")
};

function setScreen(screen) {
  state.screen = screen;
  for (const screenEl of el.screens) {
    screenEl.classList.toggle("active", screenEl.dataset.screen === screen);
  }
}

function readProgress() {
  try {
    return JSON.parse(localStorage.getItem(storageKeys.progress) || "[]");
  } catch {
    return [];
  }
}

function saveProgress(progress) {
  localStorage.setItem(storageKeys.progress, JSON.stringify(progress));
}

function getParentPin() {
  return localStorage.getItem(storageKeys.pin) || "1234";
}

function setDefaultPin() {
  if (!localStorage.getItem(storageKeys.pin)) {
    localStorage.setItem(storageKeys.pin, "1234");
  }
}

function getRandomItem(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function shuffle(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function getDifficultyPlan(progress, grade, topic) {
  const relevant = progress.filter((session) => session.grade === grade && session.topic === topic);
  if (!relevant.length) return ["easy", "easy", "medium", "medium", "hard"];
  const accuracy =
    relevant.reduce((sum, session) => sum + session.correct / session.total, 0) / relevant.length;
  if (accuracy >= 0.85) return ["medium", "medium", "hard", "hard", "hard"];
  if (accuracy >= 0.6) return ["easy", "medium", "medium", "hard", "hard"];
  return ["easy", "easy", "easy", "medium", "medium"];
}

function buildSessionQuestions() {
  const progress = readProgress();
  const pool = questions.filter((question) => question.grade === state.grade && question.topic === state.topic);
  const difficultyPlan = getDifficultyPlan(progress, state.grade, state.topic);
  const selected = [];

  for (const difficulty of difficultyPlan) {
    const candidates = shuffle(
      pool.filter(
        (question) => question.difficulty === difficulty && !selected.some((item) => item.id === question.id)
      )
    );
    if (candidates[0]) selected.push(candidates[0]);
  }

  for (const question of shuffle(pool)) {
    if (selected.length >= 5) break;
    if (!selected.some((item) => item.id === question.id)) selected.push(question);
  }

  state.sessionQuestions = selected;
  state.currentQuestionIndex = 0;
  state.answers = [];
  state.feedback = null;
}

function renderGradeChoices() {
  el.gradeChoices.innerHTML = "";
  Object.entries(gradeLabels).forEach(([value, label]) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "choice-button";
    button.innerHTML = `<strong>${label}</strong><small>${topicAvailabilityByGrade[value]
      .map((topic) => topicMeta[topic].label)
      .join(" • ")}</small>`;
    button.addEventListener("click", () => {
      state.grade = Number(value);
      el.selectedGradeLabel.textContent = label;
      renderTopicChoices();
      setScreen("topic");
    });
    el.gradeChoices.appendChild(button);
  });
}

function renderTopicChoices() {
  el.topicChoices.innerHTML = "";
  const topics = topicAvailabilityByGrade[state.grade] || [];
  topics.forEach((topicKey) => {
    const topic = topicMeta[topicKey];
    const button = document.createElement("button");
    button.type = "button";
    button.className = "choice-button";
    button.innerHTML = `<strong>${topic.icon} ${topic.label}</strong><small>${topic.description}</small>`;
    button.addEventListener("click", () => {
      state.topic = topicKey;
      buildSessionQuestions();
      renderQuestion();
      setScreen("question");
    });
    el.topicChoices.appendChild(button);
  });
}

function renderVisual(question) {
  if (!question.visual) {
    el.questionVisual.textContent = "🧮";
    return;
  }
  el.questionVisual.textContent = question.visual.value;
}

function renderQuestion() {
  const question = state.sessionQuestions[state.currentQuestionIndex];
  if (!question) {
    saveSessionAndShowSummary();
    return;
  }

  state.feedback = null;
  el.feedbackCard.hidden = true;
  el.feedbackCard.className = "feedback-card";
  el.answerChoices.innerHTML = "";
  el.sessionTopicLabel.textContent = `${gradeLabels[state.grade]} • ${topicMeta[state.topic].label}`;
  el.questionCounter.textContent = `ප්‍රශ්නය ${state.currentQuestionIndex + 1} / ${state.sessionQuestions.length}`;
  el.progressFill.style.width = `${((state.currentQuestionIndex + 1) / state.sessionQuestions.length) * 100}%`;
  el.difficultyLabel.textContent =
    question.difficulty === "easy" ? "පහසු" : question.difficulty === "medium" ? "මැද" : "අභියෝගාත්මක";
  el.questionPrompt.textContent = question.prompt;
  renderVisual(question);

  question.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "answer-button";
    button.innerHTML = `<strong>${answer.label}</strong><small>තෝරන්න</small>`;
    button.addEventListener("click", () => submitAnswer(answer.value));
    el.answerChoices.appendChild(button);
  });
}

function submitAnswer(selectedValue) {
  if (state.feedback) return;
  const question = state.sessionQuestions[state.currentQuestionIndex];
  const isCorrect = selectedValue === question.correctAnswer;
  state.answers.push({
    questionId: question.id,
    selectedValue,
    correct: isCorrect
  });
  state.feedback = { isCorrect, correctAnswer: question.correctAnswer };

  [...el.answerChoices.children].forEach((button) => {
    const answerValue = Number(button.querySelector("strong").textContent);
    if (answerValue === question.correctAnswer) button.classList.add("correct");
    if (answerValue === selectedValue && selectedValue !== question.correctAnswer) button.classList.add("incorrect");
    button.disabled = true;
  });

  el.feedbackCard.hidden = false;
  el.feedbackCard.classList.add(isCorrect ? "success" : "error");
  el.feedbackTitle.textContent = getRandomItem(
    isCorrect ? feedbackPhrases.correctTitle : feedbackPhrases.incorrectTitle
  );
  el.feedbackBody.textContent = isCorrect
    ? getRandomItem(feedbackPhrases.correctBody)
    : `${getRandomItem(feedbackPhrases.incorrectBody)} නිවැරදි පිළිතුර ${question.correctAnswer} යි.`;
  el.feedbackNextButton.textContent =
    state.currentQuestionIndex === state.sessionQuestions.length - 1 ? "ප්‍රතිඵල බලන්න" : "ඊළඟ ප්‍රශ්නය";
}

function nextQuestion() {
  state.currentQuestionIndex += 1;
  renderQuestion();
}

function saveSessionAndShowSummary() {
  const total = state.sessionQuestions.length;
  const correct = state.answers.filter((item) => item.correct).length;
  const stars = correct >= 5 ? 3 : correct >= 3 ? 2 : 1;
  const entry = {
    id: `session-${Date.now()}`,
    grade: state.grade,
    topic: state.topic,
    total,
    correct,
    stars,
    completedAt: new Date().toISOString()
  };
  const progress = readProgress();
  progress.unshift(entry);
  saveProgress(progress.slice(0, 30));

  el.summaryTitle.textContent = getRandomItem(feedbackPhrases.summaryTitle);
  el.summaryScore.textContent = `ඔයා ${total} ප්‍රශ්නවලින් ${correct}ක් හරියට කළා.`;
  el.summaryStars.innerHTML = `${"⭐".repeat(stars)}${"☆".repeat(3 - stars)}`;
  el.summaryStats.innerHTML = "";

  const stats = [
    ["ශ්‍රේණිය", gradeLabels[state.grade]],
    ["විෂයය", topicMeta[state.topic].label],
    ["නිවැරදි", `${correct} / ${total}`]
  ];
  stats.forEach(([label, value]) => {
    const card = document.createElement("div");
    card.className = "stat-card";
    card.innerHTML = `<span>${label}</span><strong>${value}</strong>`;
    el.summaryStats.appendChild(card);
  });

  setScreen("summary");
}

function renderParentDashboard() {
  const progress = readProgress();
  el.parentSummaryCards.innerHTML = "";
  el.strongTopics.innerHTML = "";
  el.weakTopics.innerHTML = "";
  el.recentSessions.innerHTML = "";

  if (!progress.length) {
    el.parentSummaryCards.innerHTML = '<div class="empty-state">තවම අභ්‍යාස දත්ත නැහැ.</div>';
    el.strongTopics.innerHTML = '<div class="empty-state">සැසි ආරම්භ වූ පසු මෙහි දත්ත දිස්වේ.</div>';
    el.weakTopics.innerHTML = '<div class="empty-state">අමතර පුහුණුව අවශ්‍ය විෂයයන් මෙහි දිස්වේ.</div>';
    el.recentSessions.innerHTML = '<div class="empty-state">අවසන් සැසි මෙහි දිස්වේ.</div>';
    return;
  }

  const totalSessions = progress.length;
  const overallAccuracy = Math.round(
    (progress.reduce((sum, item) => sum + item.correct / item.total, 0) / totalSessions) * 100
  );
  const totalStars = progress.reduce((sum, item) => sum + item.stars, 0);
  [
    ["සැසි", String(totalSessions)],
    ["සාමාන්‍ය සාර්ථකත්වය", `${overallAccuracy}%`],
    ["තරු", String(totalStars)]
  ].forEach(([label, value]) => {
    const card = document.createElement("div");
    card.className = "stat-card";
    card.innerHTML = `<span>${label}</span><strong>${value}</strong>`;
    el.parentSummaryCards.appendChild(card);
  });

  const topicStats = Object.keys(topicMeta)
    .map((topicKey) => {
      const sessions = progress.filter((item) => item.topic === topicKey);
      if (!sessions.length) return null;
      const average = Math.round(
        (sessions.reduce((sum, session) => sum + session.correct / session.total, 0) / sessions.length) * 100
      );
      return {
        topicKey,
        average,
        sessions: sessions.length
      };
    })
    .filter(Boolean)
    .sort((a, b) => b.average - a.average);

  const strong = topicStats.slice(0, 3);
  const weak = [...topicStats].sort((a, b) => a.average - b.average).slice(0, 3);
  renderTopicList(el.strongTopics, strong, "ඉතා හොඳ ප්‍රගතියක්.");
  renderTopicList(el.weakTopics, weak, "මෙම විෂයයන්ට තව ටිකක් පුහුණුව දෙන්න.");

  progress.slice(0, 8).forEach((session) => {
    const item = document.createElement("div");
    item.className = "list-card";
    item.innerHTML = `
      <strong>${gradeLabels[session.grade]} • ${topicMeta[session.topic].label}</strong>
      <div>${session.correct} / ${session.total} • ${session.stars}⭐</div>
      <small>${new Date(session.completedAt).toLocaleDateString("en-GB")}</small>
    `;
    el.recentSessions.appendChild(item);
  });
}

function renderTopicList(container, items, message) {
  if (!items.length) {
    container.innerHTML = '<div class="empty-state">තවම දත්ත නැහැ.</div>';
    return;
  }
  items.forEach((item) => {
    const node = document.createElement("div");
    node.className = "list-card";
    node.innerHTML = `<strong>${topicMeta[item.topicKey].label}</strong><div>${item.average}% • සැසි ${item.sessions}</div><small>${message}</small>`;
    container.appendChild(node);
  });
}

function speakCurrentQuestion() {
  const question = state.sessionQuestions[state.currentQuestionIndex];
  if (!question || !("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(question.audioText);
  utterance.lang = "si-LK";
  utterance.rate = 0.82;
  window.speechSynthesis.speak(utterance);
}

function attachEvents() {
  el.startButton.addEventListener("click", () => setScreen("grade"));
  el.continueButton.addEventListener("click", () => {
    const progress = readProgress();
    if (progress[0]) {
      state.grade = progress[0].grade;
      state.topic = progress[0].topic;
      buildSessionQuestions();
      renderQuestion();
      setScreen("question");
      return;
    }
    setScreen("grade");
  });
  el.homeButton.addEventListener("click", () => setScreen("welcome"));
  el.parentButton.addEventListener("click", () => {
    el.pinInput.value = "";
    el.pinError.hidden = true;
    setScreen("parent-login");
  });
  el.audioButton.addEventListener("click", speakCurrentQuestion);
  el.feedbackNextButton.addEventListener("click", nextQuestion);
  el.replayButton.addEventListener("click", () => {
    buildSessionQuestions();
    renderQuestion();
    setScreen("question");
  });
  el.changeTopicButton.addEventListener("click", () => setScreen("topic"));
  el.pinSubmitButton.addEventListener("click", () => {
    if (el.pinInput.value === getParentPin()) {
      renderParentDashboard();
      setScreen("parent-dashboard");
      return;
    }
    el.pinError.hidden = false;
  });
  el.resetProgressButton.addEventListener("click", () => {
    localStorage.removeItem(storageKeys.progress);
    renderParentDashboard();
  });
}

function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./sw.js").catch(() => {
      // Offline shell is optional. Ignore registration failures.
    });
  }
}

function boot() {
  setDefaultPin();
  renderGradeChoices();
  attachEvents();
  registerServiceWorker();
  setScreen("welcome");
  console.info(`Loaded ${contentSummary.totalQuestions} Sinhala math questions.`);
}

boot();
