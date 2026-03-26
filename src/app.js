import {
  contentSummary,
  feedbackPhrases,
  gradeLabels,
  normalizeQuestion,
  questions,
  topicAvailabilityByGrade,
  topicMeta,
  validateQuestion
} from "./content.js";

const storageKeys = {
  progress: "sinhala-math-progress",
  pin: "sinhala-math-parent-pin",
  adminPin: "sinhala-math-admin-pin",
  adminQuestions: "sinhala-math-admin-questions"
};

const state = {
  screen: "welcome",
  grade: null,
  topic: null,
  allQuestions: [],
  sessionQuestions: [],
  currentQuestionIndex: 0,
  answers: [],
  feedback: null,
  editingQuestionId: null,
  supabase: null,
  supabaseEnabled: false,
  adminAuthenticated: false
};

const el = {
  screens: [...document.querySelectorAll(".screen")],
  startButton: document.getElementById("startButton"),
  continueButton: document.getElementById("continueButton"),
  homeButton: document.getElementById("homeButton"),
  parentButton: document.getElementById("parentButton"),
  adminButton: document.getElementById("adminButton"),
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
  resetProgressButton: document.getElementById("resetProgressButton"),
  adminEmailInput: document.getElementById("adminEmailInput"),
  adminPasswordInput: document.getElementById("adminPasswordInput"),
  adminLoginHelper: document.getElementById("adminLoginHelper"),
  adminPinError: document.getElementById("adminPinError"),
  adminPinSubmitButton: document.getElementById("adminPinSubmitButton"),
  adminSummaryCards: document.getElementById("adminSummaryCards"),
  adminFilterGrade: document.getElementById("adminFilterGrade"),
  adminFilterTopic: document.getElementById("adminFilterTopic"),
  adminSearchInput: document.getElementById("adminSearchInput"),
  adminQuestionList: document.getElementById("adminQuestionList"),
  adminFormTitle: document.getElementById("adminFormTitle"),
  adminQuestionForm: document.getElementById("adminQuestionForm"),
  questionIdInput: document.getElementById("questionIdInput"),
  questionGradeInput: document.getElementById("questionGradeInput"),
  questionTopicInput: document.getElementById("questionTopicInput"),
  questionDifficultyInput: document.getElementById("questionDifficultyInput"),
  questionPromptInput: document.getElementById("questionPromptInput"),
  questionAudioInput: document.getElementById("questionAudioInput"),
  questionVisualTypeInput: document.getElementById("questionVisualTypeInput"),
  questionVisualValueInput: document.getElementById("questionVisualValueInput"),
  answerOptionInputs: [...document.querySelectorAll(".answer-option-input")],
  questionCorrectAnswerInput: document.getElementById("questionCorrectAnswerInput"),
  adminFormError: document.getElementById("adminFormError"),
  adminFormHint: document.getElementById("adminFormHint"),
  adminDataSourceLabel: document.getElementById("adminDataSourceLabel"),
  adminNewQuestionButton: document.getElementById("adminNewQuestionButton"),
  adminResetFormButton: document.getElementById("adminResetFormButton"),
  adminExportButton: document.getElementById("adminExportButton"),
  adminImportButton: document.getElementById("adminImportButton"),
  adminLogoutButton: document.getElementById("adminLogoutButton"),
  adminJsonTextarea: document.getElementById("adminJsonTextarea")
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

function readAdminQuestions() {
  try {
    const raw = JSON.parse(localStorage.getItem(storageKeys.adminQuestions) || "[]");
    return Array.isArray(raw)
      ? raw
          .map((item) => {
            const result = validateQuestion(item);
            return result.valid ? result.question : null;
          })
          .filter(Boolean)
      : [];
  } catch {
    return [];
  }
}

function saveAdminQuestions(questionList) {
  localStorage.setItem(storageKeys.adminQuestions, JSON.stringify(questionList));
}

function getParentPin() {
  return localStorage.getItem(storageKeys.pin) || "1234";
}

function getAdminPin() {
  return localStorage.getItem(storageKeys.adminPin) || "4321";
}

function setDefaultPin() {
  if (!localStorage.getItem(storageKeys.pin)) localStorage.setItem(storageKeys.pin, "1234");
  if (!localStorage.getItem(storageKeys.adminPin)) localStorage.setItem(storageKeys.adminPin, "4321");
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

function isSupabaseConfigured() {
  const config = window.APP_CONFIG || {};
  return Boolean(window.supabase && config.supabaseUrl && config.supabaseAnonKey);
}

function initializeSupabase() {
  if (!isSupabaseConfigured()) return;
  const config = window.APP_CONFIG;
  state.supabase = window.supabase.createClient(config.supabaseUrl, config.supabaseAnonKey);
  state.supabaseEnabled = true;
}

function mapDbRowToQuestion(row) {
  return normalizeQuestion({
    id: row.id,
    grade: row.grade,
    topic: row.topic,
    difficulty: row.difficulty,
    prompt: row.prompt,
    audioText: row.audio_text || row.prompt,
    correctAnswer: row.correct_answer,
    answers: Array.isArray(row.options) ? row.options : [],
    visual:
      row.visual_type || row.visual_value
        ? {
            type: row.visual_type || "text",
            value: row.visual_value || ""
          }
        : undefined
  });
}

function mapQuestionToDbPayload(question, source = "admin") {
  return {
    id: question.id,
    grade: question.grade,
    topic: question.topic,
    difficulty: question.difficulty,
    prompt: question.prompt,
    audio_text: question.audioText || question.prompt,
    correct_answer: String(question.correctAnswer),
    options: question.answers.map((answer) => ({
      value: String(answer.value),
      label: String(answer.label)
    })),
    visual_type: question.visual?.type || null,
    visual_value: question.visual?.value || null,
    is_published: true,
    source
  };
}

async function fetchRemoteQuestions(includeAll = false) {
  const query = state.supabase.from("questions").select("*").order("created_at", { ascending: false });
  const { data, error } = includeAll ? await query : await query.eq("is_published", true);
  if (error) throw error;
  return (data || []).map(mapDbRowToQuestion);
}

async function refreshAllQuestions() {
  if (state.supabaseEnabled) {
    try {
      state.allQuestions = await fetchRemoteQuestions(false);
      return;
    } catch (error) {
      console.warn("Supabase question fetch failed, using local fallback.", error);
    }
  }
  state.allQuestions = [...questions, ...readAdminQuestions()];
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
    button.addEventListener("click", async () => {
      state.topic = topicKey;
      await buildSessionQuestions();
      renderQuestion();
      setScreen("question");
    });
    el.topicChoices.appendChild(button);
  });
}

function populateAdminSelects() {
  const gradeOptions = ['<option value="all">සියල්ල</option>']
    .concat(Object.entries(gradeLabels).map(([value, label]) => `<option value="${value}">${label}</option>`))
    .join("");
  el.adminFilterGrade.innerHTML = gradeOptions;
  el.questionGradeInput.innerHTML = Object.entries(gradeLabels)
    .map(([value, label]) => `<option value="${value}">${label}</option>`)
    .join("");

  const topicOptions = ['<option value="all">සියලු විෂයයන්</option>']
    .concat(Object.entries(topicMeta).map(([value, meta]) => `<option value="${value}">${meta.label}</option>`))
    .join("");
  el.adminFilterTopic.innerHTML = topicOptions;
  el.questionTopicInput.innerHTML = Object.entries(topicMeta)
    .map(([value, meta]) => `<option value="${value}">${meta.label}</option>`)
    .join("");
}

async function buildSessionQuestions() {
  await refreshAllQuestions();
  const progress = readProgress();
  const pool = state.allQuestions.filter((question) => question.grade === state.grade && question.topic === state.topic);
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

function renderVisual(question) {
  el.questionVisual.textContent = question.visual?.value || "🧮";
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
    button.dataset.value = String(answer.value);
    button.innerHTML = `<strong>${answer.label}</strong><small>තෝරන්න</small>`;
    button.addEventListener("click", () => submitAnswer(answer.value));
    el.answerChoices.appendChild(button);
  });
}

function submitAnswer(selectedValue) {
  if (state.feedback) return;
  const question = state.sessionQuestions[state.currentQuestionIndex];
  const isCorrect = String(selectedValue) === String(question.correctAnswer);
  state.answers.push({
    questionId: question.id,
    selectedValue,
    correct: isCorrect
  });
  state.feedback = { isCorrect, correctAnswer: question.correctAnswer };

  [...el.answerChoices.children].forEach((button) => {
    const answerValue = button.dataset.value;
    if (String(answerValue) === String(question.correctAnswer)) button.classList.add("correct");
    if (String(answerValue) === String(selectedValue) && String(selectedValue) !== String(question.correctAnswer)) {
      button.classList.add("incorrect");
    }
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

  [
    ["ශ්‍රේණිය", gradeLabels[state.grade]],
    ["විෂයය", topicMeta[state.topic].label],
    ["නිවැරදි", `${correct} / ${total}`]
  ].forEach(([label, value]) => {
    const card = document.createElement("div");
    card.className = "stat-card";
    card.innerHTML = `<span>${label}</span><strong>${value}</strong>`;
    el.summaryStats.appendChild(card);
  });

  setScreen("summary");
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
      return { topicKey, average, sessions: sessions.length };
    })
    .filter(Boolean)
    .sort((a, b) => b.average - a.average);

  renderTopicList(el.strongTopics, topicStats.slice(0, 3), "ඉතා හොඳ ප්‍රගතියක්.");
  renderTopicList(el.weakTopics, [...topicStats].sort((a, b) => a.average - b.average).slice(0, 3), "මෙම විෂයයන්ට තව ටිකක් පුහුණුව දෙන්න.");

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

async function getEditableQuestionPool() {
  if (state.supabaseEnabled && state.adminAuthenticated) {
    return fetchRemoteQuestions(true);
  }
  return [...questions, ...readAdminQuestions()];
}

async function getFilteredAdminQuestions() {
  const questionPool = await getEditableQuestionPool();
  const customIds = new Set((state.supabaseEnabled ? questionPool : readAdminQuestions()).map((question) => question.id));
  const gradeFilter = el.adminFilterGrade.value || "all";
  const topicFilter = el.adminFilterTopic.value || "all";
  const search = (el.adminSearchInput.value || "").trim().toLowerCase();

  return questionPool
    .filter((question) => {
      if (gradeFilter !== "all" && String(question.grade) !== gradeFilter) return false;
      if (topicFilter !== "all" && question.topic !== topicFilter) return false;
      if (search && !question.prompt.toLowerCase().includes(search)) return false;
      return true;
    })
    .map((question) => ({
      ...question,
      custom: customIds.has(question.id)
    }));
}

async function renderAdminDashboard() {
  await refreshAllQuestions();
  const editableQuestions = await getEditableQuestionPool();
  const builtInCount = state.supabaseEnabled ? 0 : questions.length;
  const customCount = editableQuestions.length - builtInCount;
  el.adminSummaryCards.innerHTML = "";
  el.adminDataSourceLabel.textContent = state.supabaseEnabled
    ? "Question source: Supabase database"
    : "Question source: local fallback";

  [
    ["Built-in", String(Math.max(0, builtInCount))],
    ["Database/Custom", String(Math.max(0, customCount))],
    ["Total", String(editableQuestions.length)]
  ].forEach(([label, value]) => {
    const card = document.createElement("div");
    card.className = "stat-card";
    card.innerHTML = `<span>${label}</span><strong>${value}</strong>`;
    el.adminSummaryCards.appendChild(card);
  });

  const filtered = await getFilteredAdminQuestions();
  el.adminQuestionList.innerHTML = "";
  if (!filtered.length) {
    el.adminQuestionList.innerHTML = '<div class="empty-state">මෙම filter සඳහා ප්‍රශ්න නැහැ.</div>';
    return;
  }

  filtered.slice(0, 100).forEach((question) => {
    const item = document.createElement("div");
    item.className = "list-card";
    item.innerHTML = `
      <strong>${gradeLabels[question.grade]} • ${topicMeta[question.topic].label} • ${question.difficulty}</strong>
      <div>${question.prompt}</div>
      <small>${state.supabaseEnabled ? "database question" : question.custom ? "custom question" : "built-in question"}</small>
      <div class="card-actions">
        <button class="mini-button" type="button" data-action="edit" data-id="${question.id}">Edit</button>
        <button class="mini-button" type="button" data-action="delete" data-id="${question.id}">Delete</button>
      </div>
    `;
    el.adminQuestionList.appendChild(item);
  });
}

function resetAdminForm() {
  state.editingQuestionId = null;
  el.adminFormTitle.textContent = "නව ප්‍රශ්නයක්";
  el.questionIdInput.value = "";
  el.questionGradeInput.value = "1";
  el.questionTopicInput.value = "number";
  el.questionDifficultyInput.value = "easy";
  el.questionPromptInput.value = "";
  el.questionAudioInput.value = "";
  el.questionVisualTypeInput.value = "text";
  el.questionVisualValueInput.value = "";
  el.answerOptionInputs.forEach((input) => {
    input.value = "";
  });
  el.questionCorrectAnswerInput.value = "";
  el.adminFormError.hidden = true;
  el.adminFormHint.textContent = state.supabaseEnabled
    ? "මෙහි සුරකින ප්‍රශ්න Supabase database තුළ තැන්පත් වේ."
    : "මෙහි සුරකින ප්‍රශ්න browser local storage තුළ තැන්පත් වේ.";
}

function populateAdminForm(question) {
  state.editingQuestionId = question.id;
  el.adminFormTitle.textContent = "ප්‍රශ්නය සංස්කරණය කරන්න";
  el.questionIdInput.value = question.id;
  el.questionGradeInput.value = String(question.grade);
  el.questionTopicInput.value = question.topic;
  el.questionDifficultyInput.value = question.difficulty;
  el.questionPromptInput.value = question.prompt;
  el.questionAudioInput.value = question.audioText || "";
  el.questionVisualTypeInput.value = question.visual?.type || "text";
  el.questionVisualValueInput.value = question.visual?.value || "";
  el.answerOptionInputs.forEach((input, index) => {
    input.value = question.answers[index]?.label || "";
  });
  el.questionCorrectAnswerInput.value = String(question.correctAnswer);
  el.adminFormError.hidden = true;
  el.adminFormHint.textContent = state.supabaseEnabled
    ? "මෙය database row එකක් ලෙස update වේ."
    : "මෙය custom question එකක් ලෙස update වේ.";
}

function buildQuestionFromForm() {
  const answers = el.answerOptionInputs
    .map((input) => input.value.trim())
    .filter(Boolean)
    .map((value) => ({
      value: isNaN(Number(value)) ? value : Number(value),
      label: value
    }));

  return validateQuestion({
    id: el.questionIdInput.value.trim(),
    grade: Number(el.questionGradeInput.value),
    topic: el.questionTopicInput.value,
    difficulty: el.questionDifficultyInput.value,
    prompt: el.questionPromptInput.value.trim(),
    audioText: el.questionAudioInput.value.trim(),
    visual:
      el.questionVisualValueInput.value.trim() !== ""
        ? {
            type: el.questionVisualTypeInput.value,
            value: el.questionVisualValueInput.value.trim()
          }
        : undefined,
    answers,
    correctAnswer: el.questionCorrectAnswerInput.value.trim()
  });
}

async function upsertAdminQuestion(question) {
  if (state.supabaseEnabled && state.adminAuthenticated) {
    const payload = mapQuestionToDbPayload(question);
    const { error } = await state.supabase.from("questions").upsert(payload).select();
    if (error) throw error;
    await refreshAllQuestions();
    return;
  }
  const current = readAdminQuestions();
  const next = current.filter((item) => item.id !== question.id);
  next.unshift(normalizeQuestion(question));
  saveAdminQuestions(next);
  await refreshAllQuestions();
}

async function deleteAdminQuestion(id) {
  if (state.supabaseEnabled && state.adminAuthenticated) {
    const { error } = await state.supabase.from("questions").delete().eq("id", id);
    if (error) throw error;
    await refreshAllQuestions();
    return;
  }
  saveAdminQuestions(readAdminQuestions().filter((question) => question.id !== id));
  await refreshAllQuestions();
}

async function exportAdminQuestions() {
  const questionPool = await getEditableQuestionPool();
  el.adminJsonTextarea.value = JSON.stringify(questionPool, null, 2);
}

async function importAdminQuestions() {
  try {
    const parsed = JSON.parse(el.adminJsonTextarea.value || "[]");
    if (!Array.isArray(parsed)) throw new Error("JSON must be an array.");
    const normalized = [];
    for (const item of parsed) {
      const result = validateQuestion(item);
      if (!result.valid) throw new Error(result.error);
      normalized.push(result.question);
    }

    if (state.supabaseEnabled && state.adminAuthenticated) {
      const payload = normalized.map((question) => mapQuestionToDbPayload(question, "admin"));
      const { error } = await state.supabase.from("questions").upsert(payload).select();
      if (error) throw error;
    } else {
      saveAdminQuestions(normalized);
    }

    await refreshAllQuestions();
    await renderAdminDashboard();
    resetAdminForm();
    el.adminFormError.hidden = true;
    el.adminFormHint.textContent = "JSON import සාර්ථකයි.";
  } catch (error) {
    el.adminFormError.hidden = false;
    el.adminFormError.textContent = `Import අසාර්ථකයි: ${error.message}`;
  }
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

async function handleAdminLogin() {
  el.adminPinError.hidden = true;
  if (state.supabaseEnabled) {
    const email = el.adminEmailInput.value.trim();
    const password = el.adminPasswordInput.value;
    if (!email || !password) {
      el.adminPinError.hidden = false;
      el.adminPinError.textContent = "Email සහ password දෙකම අවශ්‍යයි.";
      return;
    }
    const { error } = await state.supabase.auth.signInWithPassword({ email, password });
    if (error) {
      el.adminPinError.hidden = false;
      el.adminPinError.textContent = error.message;
      return;
    }
    state.adminAuthenticated = true;
    await renderAdminDashboard();
    setScreen("admin-dashboard");
    return;
  }

  if (el.adminPasswordInput.value === getAdminPin()) {
    state.adminAuthenticated = true;
    await renderAdminDashboard();
    setScreen("admin-dashboard");
    return;
  }
  el.adminPinError.hidden = false;
  el.adminPinError.textContent = "Admin login අසාර්ථකයි.";
}

async function handleAdminLogout() {
  if (state.supabaseEnabled) {
    await state.supabase.auth.signOut();
  }
  state.adminAuthenticated = false;
  el.adminEmailInput.value = "";
  el.adminPasswordInput.value = "";
  setScreen("welcome");
}

function attachEvents() {
  el.startButton.addEventListener("click", () => setScreen("grade"));
  el.continueButton.addEventListener("click", async () => {
    const progress = readProgress();
    if (progress[0]) {
      state.grade = progress[0].grade;
      state.topic = progress[0].topic;
      await buildSessionQuestions();
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
  el.adminButton.addEventListener("click", () => {
    el.adminEmailInput.value = "";
    el.adminPasswordInput.value = "";
    el.adminPinError.hidden = true;
    setScreen("admin-login");
  });
  el.audioButton.addEventListener("click", speakCurrentQuestion);
  el.feedbackNextButton.addEventListener("click", nextQuestion);
  el.replayButton.addEventListener("click", async () => {
    await buildSessionQuestions();
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
  el.adminPinSubmitButton.addEventListener("click", handleAdminLogin);
  el.resetProgressButton.addEventListener("click", () => {
    localStorage.removeItem(storageKeys.progress);
    renderParentDashboard();
  });
  el.adminFilterGrade.addEventListener("change", () => {
    renderAdminDashboard();
  });
  el.adminFilterTopic.addEventListener("change", () => {
    renderAdminDashboard();
  });
  el.adminSearchInput.addEventListener("input", () => {
    renderAdminDashboard();
  });
  el.adminNewQuestionButton.addEventListener("click", resetAdminForm);
  el.adminResetFormButton.addEventListener("click", resetAdminForm);
  el.adminExportButton.addEventListener("click", exportAdminQuestions);
  el.adminImportButton.addEventListener("click", importAdminQuestions);
  el.adminLogoutButton.addEventListener("click", handleAdminLogout);
  el.adminQuestionForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const result = buildQuestionFromForm();
    if (!result.valid) {
      el.adminFormError.hidden = false;
      el.adminFormError.textContent = result.error;
      return;
    }
    try {
      await upsertAdminQuestion(result.question);
      await renderAdminDashboard();
      resetAdminForm();
      el.adminFormHint.textContent = "ප්‍රශ්නය සාර්ථකව සුරකින්න ලැබුණා.";
    } catch (error) {
      el.adminFormError.hidden = false;
      el.adminFormError.textContent = error.message;
    }
  });
  el.adminQuestionList.addEventListener("click", async (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    const action = target.dataset.action;
    const id = target.dataset.id;
    if (!action || !id) return;

    if (action === "edit") {
      const pool = await getEditableQuestionPool();
      const source = pool.find((question) => question.id === id);
      if (source) populateAdminForm(source);
    }

    if (action === "delete") {
      try {
        await deleteAdminQuestion(id);
        await renderAdminDashboard();
        if (state.editingQuestionId === id) resetAdminForm();
      } catch (error) {
        el.adminFormError.hidden = false;
        el.adminFormError.textContent = error.message;
      }
    }
  });
}

function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./sw.js").catch(() => {});
  }
}

async function syncSupabaseSession() {
  if (!state.supabaseEnabled) return;
  const { data } = await state.supabase.auth.getSession();
  state.adminAuthenticated = Boolean(data.session);
}

async function boot() {
  setDefaultPin();
  initializeSupabase();
  await syncSupabaseSession();
  await refreshAllQuestions();
  renderGradeChoices();
  populateAdminSelects();
  resetAdminForm();
  attachEvents();
  registerServiceWorker();
  setScreen("welcome");

  el.adminLoginHelper.textContent = state.supabaseEnabled
    ? "Supabase auth සක්‍රීයයි. Admin email සහ password භාවිතා කරන්න."
    : "Supabase config එක නැහැ. Local fallback mode සක්‍රීයයි. Password field එකට admin PIN 4321 යොදන්න.";

  console.info(
    state.supabaseEnabled
      ? "Supabase question loading is enabled."
      : `Loaded ${contentSummary.totalQuestions} built-in Sinhala math questions in local fallback mode.`
  );
}

boot();
